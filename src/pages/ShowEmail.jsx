import { useEffect } from "react";
import { useSelector } from "react-redux";


const ShowEmail = () => {
    const activeMailInfo = useSelector(state => state.activeEmailInfo);
    const {id, from, subject, text, isRead, to} = activeMailInfo;

    useEffect(()=>{
        if(isRead){
            return;
        }
        handleMessageRead();
    },[]);
    async function handleMessageRead(){
        // console.log('message is read');
        const updatedEmail = {
            to,
            from,
            subject,
            text,
            isRead: true,
            isDeleted:false,
        }
        fetch(`https://mail-box-react-app-default-rtdb.firebaseio.com/emails/${id}.json`,{
            method:'PUT',
            body: JSON.stringify(updatedEmail),
        })
    }
    return(
        <div className=" relative w-full h-full p-10">
            <div className=" text-2xl text-white mb-10">Email Message</div>
            <div className=" m-2 mt-10 text-white"><span className=''>From:</span> {from}</div>
            <div className=" m-2 mt-10 text-white"><span className=''>To:</span> {to}</div>
            <div className="m-2 text-white">Subject: {subject}</div>
            <div className="m-2 text-white">Message: <div dangerouslySetInnerHTML={{ __html: text }} /></div>
        </div>
    )
}

export default ShowEmail;