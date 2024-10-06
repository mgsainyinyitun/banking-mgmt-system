'use server'
import { User } from "@/app/types/types";
import prisma from "../prisma";
import { ProfileSchema } from "@/app/types/form-shema";
import { revalidatePath } from "next/cache";
import path, { join } from 'path';
import { mkdir, stat, writeFile } from "fs/promises";
import { getFileExtension } from "../utils";
import fs from 'fs';


export async function uploadProfile(data: FormData, id: string | undefined, route: string, imageUrl: string | undefined) {
    if (!id) return;
    const image = data.get("file") as File || null;
    if (!image) {
        throw new Error('No file uploaded');
    }
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/profiles/`
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
        await stat(uploadDir);
    } catch (error) {
        const e = error as NodeJS.ErrnoException;
        if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error(
                "Error while trying to create directory when uploading a file\n",
                e
            );
        }
    }

    try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${id}_${uniqueSuffix}.${getFileExtension(image.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer as NodeJS.ArrayBufferView);
        const fileUrl = `${relativeUploadDir}${filename}`;

        // Save to database
        await prisma.user.update({
            where: { id },
            data: {
                profileImage: fileUrl,
            },
        });
        if (imageUrl) {
            const uploadDir = join(process.cwd(), "public");
            const imagePath = path.join(uploadDir, imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete the file

            } else {
                console.warn('File does not exist, skipping delete.');
            }
        }

        revalidatePath(route);
        return { success: true, message: 'Successfully uploaded profile picture!' };

    } catch (error) {
        console.log(error);
        return { success: false, message: 'Something went wrong! Please try again.' };
    }
}


export async function getUser(id: string | undefined): Promise<User | undefined> {
    try {
        const user = await prisma.user.findUnique({ where: { id } }) as User | null;
        if (!user) return undefined;
        return user;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserProfileLink(id: string): Promise<string | undefined> {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { profileImage: true }
        });

        if (!user) {
            return undefined;
        }
        return user.profileImage ? user.profileImage : undefined;

    } catch (error) {
        console.log(error);
        return undefined
    }
}


export async function updateUser(formData: ProfileSchema, route: string): Promise<{ success: boolean, user?: User, message?: string }> {
    const id = formData.id;
    try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                username: formData.username,
                nrc: formData.nrc,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                state: formData.state,
                address: formData.address,
                dob: formData.dob
            }
        }) as User;
        revalidatePath(route);
        return { success: true, user: user }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'something wrent wrong! Please try again.'
        };
    }
}