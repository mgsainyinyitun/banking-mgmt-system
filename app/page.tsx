import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ACCOUNT_TYPE } from "./constants/CONSTANTS";

const _ = async () => {
    const session = await auth();
    switch (session?.user.type) {
        case ACCOUNT_TYPE.CUSTOMER: redirect('/cu');
        case ACCOUNT_TYPE.ADMIN: redirect('/admin/dashboard');
        default: redirect('admin');
    }
}

export default _