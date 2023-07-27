import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo-mailbox.png'


const Signup = () => {

    // AIzaSyB9m55G39buJUFJOZ8yb8lJGhbC_7hTtyg
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading , setLoading] = useState(false);

    function handleEmailChange(event) {
        setErrorMessage('');
        setSuccessMessage('');
        const newEmail = event.target.value;
        setEmail(newEmail);
    }
    function handlePasswordChange(event) {
        setErrorMessage('');
        setSuccessMessage('');
        const newPassword = event.target.value;
        setPassword(newPassword);
    }
    function handleConfirmPasswordChange(event) {
        setErrorMessage('');
        setSuccessMessage('');
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
    }
    // functin to handle user signup
    async function handleUserSignup() {
        setLoading(true);
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9m55G39buJUFJOZ8yb8lJGhbC_7hTtyg', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            setSuccessMessage('congratulations! you have successfully signed up. Now login to continue');
            // resetting input fields
            setEmail('');
            setPassword('')
            setConfirmPassword('');
        } else {
            const data = await response.json();
            setErrorMessage(data.error.message || 'error is not showing properly');
        }
        setLoading(false);
    }
    // function to handle form submit
    function handleSignup(event) {
        event.preventDefault();
        if (!email || !password || !confirmPassword) {
            setErrorMessage('ERROR! all fields are mendatory');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('ERROR! password and confirm-password must be same');
            return;
        }
        handleUserSignup();
    }

    return (
        <div className=" bg-primary flex flex-col justify-center items-center w-screen h-screen">
            <div className=' w-40 md:h-40 absolute top-0 left-0'>
                <img src={logo} alt='logo' className=' ' />
            </div>
            <div className=" max-w-md relative bg-primary py-10 px-10 rounded-xl flex flex-col justify-center items-center gap-5 text-white border">
                <h2 className=" text-xl mb-5 font-bold">SignUp</h2>
                {/* signup form */}
                <form className="flex flex-col gap-3" onSubmit={handleSignup}>
                    <div className="flex justify-between gap-1">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={handleEmailChange} value={email} className=" rounded text-black p-1" />
                    </div>
                    <div className="flex justify-between gap-1">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={handlePasswordChange} value={password} className=" rounded text-black p-1" />
                    </div>
                    <div className="flex justify-between gap-1">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" name="confirm-password" id="confirm-password" onChange={handleConfirmPasswordChange} value={confirmPassword} className=" rounded text-black p-1" />
                    </div>
                    <div className="flex justify-center mt-10">
                        <button type="submit" className=" bg-secondary py-1 px-2 rounded text-black hover:scale-105 font-semibold ">{loading?'loading...':'sign up'}</button>
                    </div>
                    <p className=" text-center">Already have an account <Link to={'/login'}><span className=" text-secondary">login</span></Link></p>
                </form>
                {errorMessage && <p className=" text-red-300">{errorMessage}</p>}
                {successMessage && <p className=" text-green-300">{successMessage}</p>}
            </div>
        </div>
    )
}

export default Signup;