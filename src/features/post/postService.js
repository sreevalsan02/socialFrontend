import axios from "axios"
import {getDownloadURL,uploadBytes,ref} from "firebase/storage"
import storage from "../../config"

const API_URL = process.env.REACT_APP_SERVER_URL + '/api/posts'
const createPost = async(postData) => {
    
    const imageRef = ref(storage, `images/${postData.file.name + Date.now()}`);
  
      const snapshot = await uploadBytes(imageRef, postData.file);
      const url = await getDownloadURL(snapshot.ref);

      const postFinal = {
        userId : postData.userId,
        desc : postData.desc,
        img : url
      }
    
      const res = await axios.post(API_URL,postFinal)
      return res.data
    
}

const postService = {
    createPost
}
export default postService