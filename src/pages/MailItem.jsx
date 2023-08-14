import { useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import mailsSlice, { mailsSliceActions } from "../store/mailsSlice";

const MailItem = ({id, from, subject, text, isRead, to, onClick, mode}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleClick(){
        onClick({id, from, subject, text, isRead, to});
    }
    async function handleDeleteMail(event){
        event.stopPropagation();
        // console.log([id,'mail deleted']);
        const response = await fetch(`https://mail-box-react-app-default-rtdb.firebaseio.com/emails/${id}.json`,{
            method:'PUT',
            body:JSON.stringify({
                from,
                subject,
                text,
                isRead,
                to,
                isDeleted:true,
            })
        });
        if(!response.ok){
            alert('Error! mail not deleted');
        }else{
            alert('mail deleted');
            dispatch(mailsSliceActions.deleteInboxMail(id));
        }
    }
    return(
        <div className=" sm:flex  sm:justify-between gap-5 border rounded-full py-1 px-2 sm:m-3 hover:border-secondary hover:scale-y-110 hover:scale-x-105 relative" onClick={handleClick}>
            {!isRead && mode!=='sentBox' && <div className=" w-2 h-2 bg-blue-800 rounded-full absolute top-3.5 left-1"></div>}
            <div className=" text-white sm:ml-3">{from}</div>
            <div className=" text-secondary">{subject}</div>
            {mode!=='sentBox' && <button className="ml-auto text-sm  rounded-full bg-red-600 text-white px-2 hover:bg-white hover:text-red-600" onClick={handleDeleteMail}>delete</button>}
        </div>
    )
}

export default MailItem;