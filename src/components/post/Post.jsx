import "./post.css"
import {useState,useEffect,useContext} from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import { BiSolidLike,BiSolidDislike } from "react-icons/bi";

export default function Post({post}){

    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] = useState({});
    const {user:currentUser} = useSelector(state => state.auth)

    const API_URL = process.env.REACT_APP_SERVER_URL
  
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])
    
    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(API_URL+`/api/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])
   


    const likeHandler = (e) =>{
        e.preventDefault()
        try{
            axios.put(API_URL+"/api/posts/" + post._id + "/like",{userId : currentUser._id })
        }catch(err){

        }
        setLike(isLiked ?like-1:like+1)
        setIsLiked(!isLiked)
    }

    return (
       <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to  = {`/profile/${user.username}`}>
                        <img src={user.profilePicture || "/default/profile_default.jpg"} className="postProfileImg" alt="" />
                        </Link> 
                        <span className="postUsername">{user.username}</span>
                         {/*<span className="postDate"></span>
                    </div>
                    <div className="postTopRight">
                        {/* <MoreVert/> */}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img className="postImg" src={post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <BiSolidLike className="likeIcon" onClick={likeHandler}/>
                        
                        <span className="postLikeCounter">{like + ' people liked this'}</span>
                    </div>
                   
                </div>
            </div>
       </div>
    )
}