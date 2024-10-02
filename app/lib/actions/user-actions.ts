import { User } from "@/app/types/types";
import prisma from "../prisma";

export async function getUser(id: string): Promise<User | undefined> {
    try {
        const user = await prisma.user.findUnique({ where: { id } }) as User | null;
        if (!user) return undefined;
        return user;
    } catch (error) {
        console.log(error);
    }
}
