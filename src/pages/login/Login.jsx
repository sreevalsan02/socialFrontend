import "./login.css"
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {login,reset} from "../../features/auth/authSlice"
import { useEffect,useRef} from "react";
import {PulseLoader} from "react-spinners"

export default function Login(){
    const override = {
        color : "white"
    }
    const email = useRef();
    const password = useRef();
    const {user,isLoading,isError,isSuccess,message} = useSelector( state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (e)=> {
        e.preventDefault()
        const userData = {
            email : email.current.value,
            password : password.current.value
        }  
       
        dispatch(login(userData))
    }

    useEffect( ()=>{
        if(isSuccess||user)
            navigate('/')
        
    },[isSuccess,user])
    
    console.log(user)
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
                        <input ref = {email}  required type="email" placeholder="email" className="loginInput" />
                        <input ref = {password} required   type="password" placeholder="password" className="loginInput" minLength="6" />
                       
                        <button className="loginButton" type="submit">{isLoading?<PulseLoader size={10} color="white"/>: "log in"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                     
                        <button className="loginRegisterButton" onClick={()=>{navigate('/register')}}>create a new account</button>
                        
                    </form>
            
                </div>
            </div>
        </div>
    )
}