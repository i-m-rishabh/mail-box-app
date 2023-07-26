import { useEffect, useState } from "react";
import MailItem from "./MailItem";
import { useDispatch, useSelector } from "react-redux";
import { activeActions } from "../store/activeSlice";
import { activeEmailInfoActions } from "../store/activeEmailInfoSlice";
import { mailsSliceActions } from "../store/mailsSlice";

const Inbox  = () =>{
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    
    const userEmail = useSelector(state => state.auth.email);
    // const [inboxEmails, setInboxEmails] = useState([]);
    const inboxEmails = useSelector(state => state.mails.inboxMails);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const totalUnread = inboxEmails.reduce((acc,current)=>{
            if(current.isRead === false){
                return acc + 1;
            }else{
                return acc;
            }
        },0);
        // console.log(totalUnread);
        dispatch(activeActions.setTotalUnread(totalUnread));
    },[inboxEmails]);
    
    useEffect(()=>{
        // console.log('fetching email');
        // handleFetchEmail();
            const intervalId = setInterval(()=>{
                console.log('fetching new mails');
                handleFetchEmail();
            },3000);
        return ()=>{
            clearInterval(intervalId);
        }
    },[handleFetchEmail]);

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
                const inbox = allMails.filter((email)=>{
                    return (email.to === userEmail && email.isDeleted=== false);
                })
                // console.log(inbox);
                // setInboxEmails([...inbox]);
                dispatch(mailsSliceActions.setInboxMails([...inbox]));
            }else{
                alert('Error: email fetching failed');
            }
    }
    function handleOpenEmail({id, from, subject, text, isRead, to}){
        // console.log([id, from, subject, text]);
        dispatch(activeActions.setActive('showEmail'));
        dispatch(activeEmailInfoActions.setEmail({id,from,subject,text, isRead, to}));
    }
    return (
        <div className="p-5">
            <div className=" text-2xl text-secondary">Inbox</div>
            <div>
                {
                    inboxEmails.map((email)=>{
                        const {id, from, subject, text, isRead, to} = email;
                        return (
                            <MailItem id={id} from={from} subject={subject} text={text} isRead={isRead} key={id} to={to} onClick={handleOpenEmail}/>
                        )
                    })
                }
            </div>
        </div>        
    )
}

export default Inbox;