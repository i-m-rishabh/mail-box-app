import './App.css';
import image from './assets/mailbox-welcome.png';
import logo from './assets/logo-mailbox.png';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  return (
    <div className='  p-1 w-screen h-screen bg-primary relative overflow-hidden'>
      <div className=' flex justify-between p-5 relative'>
        <div className=' w-40 md:h-40'>
          <img src={logo} alt='logo' className=' ' />
        </div>
        <div>
          <button className='border border-yellow-500 rounded-sm text-yellow-400 py-1 px-3 hover:bg-yellow-300 hover:text-white' onClick={()=>{navigate('/login')}}>LOGIN</button>
        </div>
      </div>
      <div className='  p-1 md:flex relative'>
        <div className='  md:w-2/3 md:flex md:flex-col relative'>
          <h1 className='text-white px-10 md:text-5xl text-2xl font-semibold md:leading-loose'>Welcome to MailBoxX, your virtual abode,
            Where emotions, thoughts, and love will explode!</h1>
          <div className=' md:text-end text-center mt-5'>
            <button className='border border-yellow-500 rounded-sm text-yellow-400 py-1 px-3 hover:bg-yellow-300 hover:text-white mr-20' onClick={()=>{navigate('/signup')}}>REGISTER</button>
          </div>
        </div>
        <div className=' w-max m-auto relative'>
          <img src={image} alt='welcome-image' />
        </div>
      </div>
    </div>
  )
}

export default App;
