import { useEffect, useState } from "react";
import MailItem from "./MailItem";
import { useDispatch, useSelector } from "react-redux";
import { activeActions } from "../store/activeSlice";
import { activeEmailInfoActions } from "../store/activeEmailInfoSlice";
import { mailsSliceActions } from "../store/mailsSlice";

const SentBox  = () =>{
    
    const userEmail = useSelector(state => state.auth.email);
    const sentBoxEmails = useSelector(state => state.mails.sentBoxMails);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        handleFetchEmail();
    },[]);

    async function handleFetchEmail(){
        const response = await fetch(`https://mail-box-react-app-default-rtdb.firebaseio.com/emails.json`,{
                method: 'GET',
            });
            const data = await response.json();
            if(response.ok){
                // alert('email fetched successfully');
                if(data===null){
                    return;
                }
                const allMails = Object.keys(data).map((key)=>{
                    return {
                        id: key,
                        ...data[key],
                    }
                });
                const sentBox = allMails.filter((email)=>{
                    return (email.from === userEmail);
                })
                dispatch(mailsSliceActions.setSentBoxMails([...sentBox]));
            }else{
                alert('Error: email fetching failed');
            }
    }
    function handleOpenEmail({id, from, subject, text, to}){
        dispatch(activeActions.setActive('showEmail'));
        dispatch(activeEmailInfoActions.setEmail({id,from,subject,text,to, isRead:true}));
    }
    return (
        <div className="p-5 h-full w-full relative">
            <div className=" text-2xl text-secondary">sentBox</div>
            <div className=" absolute w-full p-10 h-4/5 overflow-auto">
                {
                    sentBoxEmails.map((email)=>{
                        const {id, from, subject, text, isRead, to} = email;
                        return (
                            <MailItem id={id} from={to} subject={subject} text={text} isRead={isRead} key={id} to={from} onClick={handleOpenEmail} mode={'sentBox'}/>
                        )
                    })
                }
            </div>
        </div>        
    )
}

export default SentBox;