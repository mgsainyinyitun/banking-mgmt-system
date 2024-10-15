import Link from "next/link"
import FaqComponent from "./FaqComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Divider } from "@nextui-org/react"

const Help = () => {
    return (
        <div className='flex juctify-center w-full h-full flex-col p-3'>
            <div className='w-full md:w-[80%] lg:w-[50%] mx-auto'>

                <div className="bg-sky-400 hover:bg-sky-600 my-5 p-3 rounded-2xl">
                    <Link href="/cu/support/new-ticket" className="text-white bg-sky-300 my-5">
                        <span className="flex gap-2 justify-center items-center">
                            <FontAwesomeIcon icon={faPlus} />
                            <p>New Help Ticket </p>
                        </span>
                    </Link>
                </div>

                <Divider className="my-5" />

                <h1 className='text-center text-3xl text-primary-400 font-semibold'>Frequently Ask Questions</h1>

                <FaqComponent />

            </div>
        </div>
    )
}

export default Help