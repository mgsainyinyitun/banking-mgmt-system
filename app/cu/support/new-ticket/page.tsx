import { auth } from '@/auth';
import NewTicketForm from './NewTicketForm';

const NewTicket = async () => {

    const session = await auth();

    return (
        <div>
            <NewTicketForm userId={session?.user?.id} />
        </div>
    )
}

export default NewTicket