import "./rightbar.css"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {follow,unfollow} from "../../features/auth/authSlice"
import { PulseLoader } from "react-spinners"
import { useSelector,useDispatch } from "react-redux"
export default function Rightbar({ user }) {

    const dispatch = useDispatch()
    const { user: currentUser,followLoading,followSuccess} = useSelector(state =>state.auth)
    const [friends, setFriends] = useState([])
    const [followed, setFollowed] = useState(false )
    useEffect(()=>{
        setFollowed(currentUser.following.includes(user?._id))
    },[user])

    useEffect(()=> {
        if(followSuccess)
        {
        localStorage.removeItem('user')
        localStorage.setItem('user',JSON.stringify(currentUser))
        }
    },[followSuccess])


    const API_URL = process.env.REACT_APP_SERVER_URL;
    useEffect(() => {
        const getFriends = async () => {
            try {

                const friendList = await axios.get(API_URL+"/api/users/friends/" + user._id)
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        }
        getFriends();
    }, [user])

    const handleClick = async () => {
        try {
            console.log("follow status : ",followed)
         
            if (followed) {
                const dat = {
                    currUserId : currentUser._id,
                    userId : user._id
                }
                 dispatch(unfollow(dat))
            }
            else {
                const dat = {
                    currUserId : currentUser._id,
                    userId : user._id
                }
                dispatch(follow(dat))
            }
   
        setFollowed(state => !state)
        } catch (err) {
            console.log(err)
        }
    }

   
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
            {user.username !== currentUser.username
                    && (
                        <button className="rightbarFollowButton"
                            onClick={handleClick}
                        >
                            {followLoading?<PulseLoader size={8} color="white"/> : followed ? "unfollow" : "follow"}
                        </button>
                    )}
                <h4 className="rightbarTitle">Friends</h4>
                <hr />
                <div className="rightbarFollowings">
                    {friends.map(friend => (
                        <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture ? friend.profilePicture : "/default/profile_default.jpg"} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>


                    ))}

                </div>

            </div>
        </div>
    )
}