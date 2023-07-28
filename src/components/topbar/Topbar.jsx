import "./topbar.css"
import { useNavigate,Link } from "react-router-dom"
import { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BsSearch, BsChatFill, BsFillPersonFill, BsBellFill } from "react-icons/bs"
import { logout, reset } from "../../features/auth/authSlice"

export default function Topbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset())
        navigate('/login')
    }
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to= "/" style={{textDecoration : "none"}}>
                <span className="logo">Social Media</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <BsSearch className="searchIcon" />
                    <input placeholder="search for friends, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <BsFillPersonFill />
                    </div>
                    <div className="topbarIconItem">
                        <BsChatFill />
                    </div>
                    <div className="topbarIconItem">
                        <BsBellFill />
                    </div>
                </div>

                {user && (

                    <button className="logoutButton" onClick={onLogout}>
                        logout
                    </button>
                )}
                 <Link to  = {`/profile/${user.username}`}>
                <img src={user.profilePicture?user.profilePicture: "/default/profile_default.jpg"} alt="" className="topbarImg" />
                 </Link>

            </div>
        </div>
    )
}