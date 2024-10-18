import { getUserDetail } from "@/app/lib/actions/admin-actions";
import EditForm from "@/app/admin/users/edit/EditForm";
import { UserDetail } from "@/app/types/types";

const UserEditPage = async ({ params }: { params: { id: string } }) => {
    const { user, success } = await getUserDetail(params.id);

    if (!success || !user) {
        return <div>User not found or failed to fetch user details.</div>;
    }

    return (
        <EditForm user={user as UserDetail} />
    );
};

export default UserEditPage;
