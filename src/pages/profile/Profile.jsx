import "./profile.css"
import Topbar from "../../components/topbar/Topbar"

import Feed from "../../components/feed/Feed"
import axios from "axios"
import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import Rightbar from "../../components/rightbar/Rightbar"
import { useSelector,useDispatch } from "react-redux"
import { profileUpload } from "../../features/auth/authSlice"
import { PulseLoader } from "react-spinners"

export default function Profile() {

    const dispatch = useDispatch()
    const [file,setFile] = useState(null)
    const [user, setUser] = useState({});
    const {user : currentUser,profileSuccess,profileLoading} = useSelector(state => state.auth)
    const {username} = useParams();
    const API_URL = process.env.REACT_APP_SERVER_URL
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${API_URL}/api/users?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    }, [username])

    useEffect(()=>{
        if(file!== null)
        dispatch(profileUpload({file:file,
            userId : currentUser._id
        }))
       
        setFile(null)
    },[file])
    
    useEffect(()=>{
        if(profileSuccess)
        {
            localStorage.removeItem('user')
            localStorage.setItem('user',JSON.stringify(currentUser))
            window.location.reload()
        }

        
    },[currentUser,profileSuccess])

    return (
        <div>
            <Topbar />
            <div className="profile">
               
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            {/* <img className="profileCoverImg" src={user.coverPicture ||  "/assets/cover_default.jpg"} alt="" />
                            <img className="profileUserImg" src={user.profilePicture || "/assets/profile_default.jpg"} alt="" /> */}
                            <img src={user.coverPicture?user.coverPicture : "/default/cover_default.jpg"} alt="" className="profileCoverImg" />
                            {
                                user.username === currentUser.username ? (
                                    profileLoading ? <PulseLoader /> :
                                    <div> 
                                        <label htmlFor="profileImg" style={{cursor :"pointer"}}>
                                            <img src= {currentUser.profilePicture?currentUser.profilePicture : "/default/profile_default.jpg"} className="profileUserImg" alt="" />
                                            <input type="file" id="profileImg" accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}/>
                                        </label>
                                        
                                    </div>
                                ) : (
                                    <div>
                            <img src={user.profilePicture?user.profilePicture : "/default/profile_default.jpg"} alt="" className="profileUserImg" />
                                        
                                         </div>

                                )
                            }
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username= {username} className = "feedWrap"/>
                        <Rightbar user = {user} className = "rightbarWrap"/>
                    </div>

                </div>


            </div>

        </div>
    )
}