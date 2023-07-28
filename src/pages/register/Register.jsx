import "./register.css";
import {useEffect, useRef} from "react"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import {PulseLoader} from "react-spinners"

export default function Register(){
   
    const dispatch = useDispatch()
    const navigate =useNavigate()

    const email = useRef();
    const password = useRef()
    const passwordAgain = useRef()
    const username = useRef()

    const {user,isLoading,isSuccess} = useSelector( state => state.auth)

    const handleClick =  (e) => {
        e.preventDefault();
        if(password.current.value!== passwordAgain.current.value)
        password.current.setCustomValidity("passwords don't match")
        else {
            const userData = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value
            }

            dispatch(register(userData))
            
        }
    }

    useEffect(()=>{
        if(user || isSuccess)
            navigate('/')
    },[user,isSuccess])
   

    return(
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social Media</h3>
                    <span className="loginDesc">Connect With Friends and the world 
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input ref = {username} required type="text" placeholder="Username" className="loginInput" />
                        <input  ref = {email} required type="email" placeholder="email" className="loginInput" />
                        <input ref = {password} required type="password" placeholder="password" className="loginInput" />
                        <input ref = {passwordAgain} required type="password" placeholder="Confirm password" className="loginInput" />
                        <button type="submit" className="loginButton">{isLoading?<PulseLoader size={10} color="white"/> : "sign up"}</button>
                        <button onClick={() => {navigate('/login')}} className="loginRegisterButton">Login to existing account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}