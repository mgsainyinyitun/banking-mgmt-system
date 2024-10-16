
import { getUserDetail } from "@/app/lib/actions/admin-actions";
import UserDetail from "../UserDetail";

export default async function Page({ params }: { params: { id: string } }) {
    const { success, user } = await getUserDetail(params.id);

    if (!success || !user) {
        return <div>User not found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <UserDetail user={user} />
        </div>
    );
}

