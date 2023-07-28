import axios from "axios"
import {getDownloadURL,uploadBytes,ref} from "firebase/storage"
import storage from "../../config"

const API_URL = process.env.REACT_APP_SERVER_URL 


//Register user
const register = async (userData) =>{
    const res = await axios.post(API_URL + '/api/auth/register',userData )

    if(res.data){
        localStorage.setItem('user',JSON.stringify(res.data))
    }
  
    return res.data
}

//login
const login = async(userData) => {
    try{
        console.log('hello')
        console.log(API_URL)
        const res = await axios.post(API_URL +'/api/auth/login',userData)
        if(res.data)
        localStorage.setItem('user',JSON.stringify(res.data))
        return res.data
    }catch(err)
    {
        console.log(err)
    }
}

//logout user
const logout = () => {
    localStorage.removeItem('user')
}

//follow user
const follow = async(dat) => {
   
    const res = await axios.put(API_URL + "/api/users/" + dat.userId + "/follow", {
        userId: dat.currUserId
    })
    return res.data
}

//unfollow user

const unfollow = async(dat) => {
    const res = await axios.put(API_URL + "/api/users/" + dat.userId + "/unfollow",{
        userId : dat.currUserId
    })
    return res.data
}

// upload profile

const profileUpload = async(profileData) => {
    
    const imageRef = ref(storage, `images/${profileData.file.name + Date.now()}`);
  
      const snapshot = await uploadBytes(imageRef, profileData.file);
      const url = await getDownloadURL(snapshot.ref);


      const finalData = {
        profilePicture : url
      }
      const res = await axios.put(API_URL + "/api/users/" + profileData.userId,finalData)
      return res.data
    
}



const authService = {
    login,
    logout,
    register,
    unfollow,
    follow,
    profileUpload
}

export default authService