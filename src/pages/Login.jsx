import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo-mailbox.png'
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Login = () => {
    
// AIzaSyB9m55G39buJUFJOZ8yb8lJGhbC_7hTtyg
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleEmailChange(event){
        setErrorMessage('');
        setSuccessMessage('');
        const newEmail = event.target.value;
        setEmail(newEmail);
    }
    function handlePasswordChange(event){
        setErrorMessage('');
        setSuccessMessage('');
        const newPassword = event.target.value;
        setPassword(newPassword);
    }

    // functin to handle user login
    async function handleUserLogin(){
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9m55G39buJUFJOZ8yb8lJGhbC_7hTtyg',{
            method:'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if(response.ok){
            alert('logged in successfully');
            dispatch(authActions.login({idToken:data.idToken,email: data.email, localId: data.localId}));
            localStorage.setItem('data',JSON.stringify({
                idToken:data.idToken,
                email: data.email,
                localId: data.localId,
                isLoggedIn: true, 
            }))
            // console.log(data);
                navigate('/home');
            // resetting input fields
            setEmail('');
            setPassword('')
        }else{
            alert('login failed');
            console.log(data);
            setErrorMessage(data.error.message || 'error is not showing properly');
        }

    }
    // function to handle form submit
    function handleLogin(event){
        event.preventDefault();
        if(!email || !password){
            setErrorMessage('ERROR! all fields are mendatory');
            return;
        }
        handleUserLogin();
    }
    
    return(
        <div className=" bg-primary flex flex-col justify-center items-center w-screen h-screen relative">
        <div className=' w-40 md:h-40 absolute top-0 left-0'>
          <img src={logo} alt='logo' className=' ' />
        </div>
            <div className=" max-w-lg relative bg-primary py-10 px-10 rounded-xl flex flex-col justify-center items-center gap-5 text-white shadow-lg border">
                <h2 className=" text-xl mb-5 font-bold">Login</h2>
                {/* Login form */}
                <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                    <div className="flex justify-between gap-1">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={handleEmailChange} value={email} className=" rounded text-black p-1" />
                    </div>
                    <div className="flex justify-between gap-1">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={handlePasswordChange} value={password} className=" rounded text-black p-1" />
                    </div>
                    
                    <div className="flex justify-center mt-10">
                        <button type="submit" className=" bg-secondary py-1 px-2 rounded text-black hover:scale-105 font-semibold ">login</button>
                    </div>
                    <p className=" text-center">Don't have an account <Link to={'/signup'}><span className=" text-secondary">signup</span></Link></p>
                </form>
                {errorMessage && <p className=" text-red-300">{errorMessage}</p>}
                {successMessage && <p className=" text-green-300">{successMessage}</p>}
            </div>
        </div>
    )
}

export default Login;