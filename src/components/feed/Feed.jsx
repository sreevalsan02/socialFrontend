import "./feed.css"
import "../post/Post"
import Share from "../share/Share"
import Post from "../post/Post"
import {useState,useEffect, useContext} from "react"
import {useSelector} from "react-redux"
import axios from "axios"

export default function Feed({username}){

    const [posts,setPosts] = useState([])
    const API_URL = process.env.REACT_APP_SERVER_URL
    const {user} = useSelector( state => state.auth)

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res = username 
            ? await axios.get(API_URL+"/api/posts/profile/" + username)
            : await axios.get(API_URL+"/api/posts/timeline/" + user._id)
            setPosts(res.data)
        }
        fetchPosts()
    },[username,user._id])
   
    return (
        <div className="feed">
            <div className="feedWrapper">
                { (!username || username === user.username) && <Share/>}
                {
                    posts.map((p)=>(
                        <Post key = {p._id} post = {p}/>
                    ))
                }         

            </div>
        </div>
    )
}