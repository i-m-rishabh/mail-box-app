
const MailItem = ({id, from, subject, text, isRead, onClick, to}) => {
    function handleClick(){
        onClick({id, from, subject, text, isRead, to});
    }
    return(
        <div className=" flex gap-5 border rounded-full py-1 px-2 m-3 hover:border-secondary hover:scale-y-110 hover:scale-x-105 relative" onClick={handleClick}>
            {!isRead && <div className=" w-2 h-2 bg-blue-800 rounded-full absolute top-3.5 left-1"></div>}
            <div className=" text-white ml-3">{from}</div>
            <div className=" text-secondary">{subject}</div>
        </div>
    )
}

export default MailItem;