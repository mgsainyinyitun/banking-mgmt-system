'use client'
const Loading = () => {
    return (
        <div className="flex items-center justify-center z-50 absolute top-0 right-0 w-full h-full">
            <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin">
            </div>
        </div>
    )
}
export default Loading