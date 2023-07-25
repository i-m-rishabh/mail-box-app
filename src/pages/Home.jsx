import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-mailbox.png'
import { authActions } from '../store/authSlice';
import CreateMail from './CreateMail';
import Inbox from './Inbox';
import { useDispatch, useSelector } from 'react-redux';
import { activeActions } from '../store/activeSlice';
import ShowEmail from './ShowEmail';
import SentBox from './SentBox';
const Home = () => {
    const active = useSelector(state => state.active.active);
    const totalUnread = useSelector(state => state.active.totalUnread);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useSelector(state => state.auth.email);

    function handleLogout(){
        dispatch(authActions.logout());
        localStorage.removeItem('data');
        navigate('/login');
    }
    return (
        <div className='w-screen h-screen bg-primary relative overflow-hidden'>
            <div className='px-5 h-20 flex justify-between '>
                <img src={logo} alt='logo' className=' ' />
                <div className=' flex flex-col justify-center items-center gap-2'>
                <button className='border rounded-lg text-secondary border-secondary hover:scale-105 py-1 px-2 w-20 h-10 mt-5' onClick={handleLogout}>logout</button>
                <p className='text-yellow-500'>{userEmail}</p>
                </div>
            </div>
            <div className=' mt-5 flex relative'>
                <div className=' text-white flex h-screen bg-gray-800 flex-col w-1/5 rounded-tr-lg'>
                    <ul className='px-3 py-2'>
                        <li className={` border hover:scale-110 hover:border-secondary text-xl ${active==='compose' && "border-secondary"} mb-10 rounded-lg text-center py-1 px-2 m-2`}
                        onClick={()=>dispatch(activeActions.setActive('compose'))}>Compose</li>
                        <li className={`hover:scale-110 hover:border-secondary border rounded-lg text-center py-1 m-5 ${active==='inbox' && "border-secondary"}`} onClick={()=>dispatch(activeActions.setActive('inbox'))}>Inbox <span className=' text-sm bg-blue-600 rounded-lg ml-1 p-0.5'>{totalUnread}</span></li>
                        <li className={`hover:scale-110 hover:border-secondary border rounded-lg text-center py-1 m-5 ${active==='sent' && "border-secondary"}`} onClick={()=>dispatch(activeActions.setActive('sent'))}>Sent</li>
                        <li className='hover:scale-110 hover:border-secondary border rounded-lg text-center py-1 m-5'>Drafts</li>
                        <li className='hover:scale-110 hover:border-secondary border rounded-lg text-center py-1 m-5'>Unread</li>
                        <li className='hover:scale-110 hover:border-secondary border rounded-lg text-center py-1 m-5'>Starred</li>
                        <li className='hover:scale-110 hover:border-secondary border rounded-lg text-center py-1 m-5'>Spam</li>
                    </ul>
                </div>
                <div className='relative border rounded-lg w-full'>
                    { active==='compose' && <CreateMail />}
                    { active==='inbox' && <Inbox />}
                    { active==='sent' && <SentBox />}
                    { active==='showEmail' && <ShowEmail />}
                </div>
            </div>
        </div>
    )
}

export default Home;