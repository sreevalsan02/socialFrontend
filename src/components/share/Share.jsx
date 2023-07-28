import "./share.css"
import {useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BiPhotoAlbum } from "react-icons/bi";
import { useSelector,useDispatch } from "react-redux";
import { ImCancelCircle } from "react-icons/im";
import postService from "../../features/post/postService";
import {PulseLoader} from "react-spinners"

export default function Share() {

    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const desc = useRef();
    const [file, setFile] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const submitHandler = async (e) => {
        e.preventDefault();
        const postData = {
            userId : user._id,
            file : file,
            desc : desc.current.value
        }
        
        if(file)
        {
            try{
                setLoading(true)
                await postService.createPost(postData)
                setLoading(false)
                window.location.reload()
            }catch(err)
            {
                console.log('error occured during sharing',err)
            }
        
        }   
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg"
                        src={user.profilePicture ? user.profilePicture : "/default/profile_default.jpg"}
                        alt="profile" />
                    <input
                        ref={desc}
                        placeholder={"Whats in your mind " + user.username + "?"}

                        className="shareInput" />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                         <ImCancelCircle className="shareCancelImg" onClick={()=>setFile(null)}/>
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />      
                       
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            {/* <PermMedia htmlColor="tomato" className="shareIcon"/> */}
                            <BiPhotoAlbum />
                            <span className="shareOptionText">Photo/Video</span>
                            <input style={{ display: "none" }}
                                type="file" id="file" accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>

                    </div>

                    <button className="shareButton" type="submit">{loading?<PulseLoader size={10} color="white"/>:"share"}</button>

                </form>
            </div>
        </div>
    )
}