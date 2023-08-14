import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useSelector } from 'react-redux';

const CreateMail = () => {
    const senderEmail = useSelector((state)=>state.auth.email);
    const emailRef = useRef(null);
    const subjectRef = useRef(null);
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = {
        placeholder: 'start typing...',
    }
    async function handleStoreEmail(receiverEmail, subject, text){
        const email = {
            from: senderEmail,
            to: receiverEmail,
            subject: subject,
            text: text,
            isRead: false,
            isDeleted: false,
        }
        const response = await fetch(`https://mail-box-react-app-default-rtdb.firebaseio.com/emails.json`,{
            method: 'POST',
            body: JSON.stringify(email),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if(response.ok){
            alert('email send successfully');
            //reset input values here

        }else{
            alert('Error: email send failed');
        }
    }
    
    function handleEmailSend(){
        const email = emailRef.current.value;
        const subject = subjectRef.current.value;
        const text = editor.current.value;
        // console.log([email,text]);
        handleStoreEmail(email, subject, text);
    }

    return (
        <div className='relative w-full h-5/6 overflow-auto'>
            <div className=' absolute p-10 overflow-auto'>
                <div>
                    <h1 className=' text-2xl'>Compose new email</h1>
                </div>
                <div className='mt-10 flex flex-col gap-3 justify-center '>
                    <div>
                        <label htmlFor="to" className='font-bold block'>To</label>
                        <input type="email" name="email" id="email" ref={emailRef} className='text-black rounded border mx-9 px-2 py-1 '/>
                    </div>
                    <div>
                        <label htmlFor="to" className='font-bold block'>Subject</label>
                        <input type="text" name="subject" id="subject" ref={subjectRef} className='text-black rounded border mx-9 px-2 py-1 '/>
                    </div>
                    <div className=''>
                        <label htmlFor="compose" className='font-bold'>Text</label>
                        <div className='mx-5'>
                        <JoditEditor
                            id='compose'
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => { }}
                        />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <button className='font-bold border rounted px-2 py-1 mx-6' onClick={handleEmailSend}>Send</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default CreateMail;