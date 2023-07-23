import { useEffect, useState } from "react";


const Inbox  = () =>{
    //change it when using redux
    const userEmail = 'rishabh@gmail.com';
    const [inboxEmails, setInboxEmails] = useState([]);

    useEffect(()=>{
        handleFetchEmail();
    },[]);

    async function handleFetchEmail(){
        const response = await fetch(`https://mail-box-react-app-default-rtdb.firebaseio.com/emails.json`,{
                method: 'GET',
            });
            const data = await response.json();
            if(response.ok){
                alert('email fetched successfully');
                const inbox = Object.values(data).filter((email)=>{
                    return email.to === userEmail;
                })
                // console.log(inbox);
                setInboxEmails([...inbox]);
            }else{
                alert('Error: email fetching failed');
            }
    }

    return (
        <div>
            <div>Inbox</div>
            <div>
                {
                    inboxEmails.map((email)=>{
                        const {from, text} = email;
                        return (
                            <div>
                                <li>sender:{from}{"  "}message:{text}</li>
                            </div>
                        )
                    })
                }
            </div>
        </div>        
    )
}

export default Inbox;