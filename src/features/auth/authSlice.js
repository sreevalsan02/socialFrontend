import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import authService from "./authService"


//register
export const register = createAsyncThunk('/register',
async(user,thunkAPI)=> {
    try{
        return await authService.register(user)
    }catch(error)
    {
        const message = (error.response && error.response.data
            &&error.response.data.message) || error.message
            ||error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


// login async thunk

export const login = createAsyncThunk('/login',
   async (user,thunkAPI) => {
        try{
            return await authService.login(user)
        }catch(error)
        {
            const message = (error.response && error.response.data
                &&error.response.data.message) || error.message
                ||error.toString()
    
            return thunkAPI.rejectWithValue(message)
        }
   }
)
// logout

export const logout = createAsyncThunk('/logout',
   () => {
    authService.logout()
   }
)

//follow user
export const follow = createAsyncThunk('/follow',
   async(userId,thunkAPI)=> {
    try{
        return await authService.follow(userId)
    }catch(error)
    {
        const message = (error.response && error.response.data
            &&error.response.data.message) || error.message
            ||error.toString()

        return thunkAPI.rejectWithValue(message)
    }
   }
)

//unfollow user
export const unfollow = createAsyncThunk('/unfollow',
   async(userId,thunkAPI)=> {
    try{
        return await authService.unfollow(userId)
    }catch(error)
    {
        const message = (error.response && error.response.data
            &&error.response.data.message) || error.message
            ||error.toString()

        return thunkAPI.rejectWithValue(message)

    }
}
)

//profile upload

export const profileUpload = createAsyncThunk('/profileUpload',
    async(data,thunkAPI)=>{
        try{
            return await authService.profileUpload(data)
        }catch(error)
        {
            const message = (error.response && error.response.data
                &&error.response.data.message) || error.message
                ||error.toString()
    
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//creating authSlice 
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user : user? user : null,
    isError : false,
    isLoading : false,
    isSuccess : false,
    followLoading : false,
    followSuccess : false,
    profileLoading : false,
    profileSuccess : false,
    message : ''
}

export const authSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        reset : (state) => {
            state.isError = false
            state.isLoading  = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action) =>
        {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected,(state,action)=>
        {
           state.isLoading = false
           state.isError = true 
           state.message = action.payload 
           state.user = null
        })
        .addCase(logout.fulfilled,(state)=> {
            state.user = null

        })
        .addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action) =>
        {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected,(state,action)=>
        {
           state.isLoading = false
           state.isError = true 
           state.message = action.payload 
           state.user = null
        })
        .addCase(follow.pending,(state)=>{
            state.followLoading = true
            state.followSuccess = false
        })
        .addCase(follow.fulfilled,(state,action) =>
        {
            
            state.followLoading = false
            state.user = {...state.user,
                following : [
                    ...state.user.following,
                    action.payload
                ]
            }
           state.followSuccess = true
        })
        .addCase(follow.rejected,(state,action)=>
        {
           state.followLoading = false

        })
        .addCase(unfollow.pending,(state)=>{
            state.followLoading = true
            state.followSuccess = false
        })
        .addCase(unfollow.fulfilled,(state,action) =>
        {
            state.followLoading = false
            state.user = {...state.user,
                following : state.user.following.filter(follow => follow!==action.payload)
            }
            state.followSuccess = true
        })
        .addCase(unfollow.rejected,(state,action)=>
        {
           state.followLoading = false
  
        })
        .addCase(profileUpload.pending,(state)=>{
            state.profileLoading = true
            state.profileSuccess = false
        })
        .addCase(profileUpload.fulfilled,(state,action) =>
        {
            state.profileLoading = false
            state.user = action.payload
            state.profileSuccess = true
          
        })
        .addCase(profileUpload.rejected,(state,action)=>
        {
           state.profileLoading = false
  
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer