import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import postService from "./postService"
//async functions

const createPost = createAsyncThunk('posts/create',
    async(postData,thunkAPI) => {
        try{
            return await postService.createPost(postData)
        }catch(error)
        {
            const message = (error.response && error.response.data
                &&error.response.data.message) || error.message
                ||error.toString()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

const initialState = {
    posts : [],
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ''
}

const postSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {
        reset : state => {
            state.isError = false
            state.isLoading  = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(createPost.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createPost.fulfilled,(state,action) =>
        {
            state.isLoading = false
            state.isSuccess = true
            state.posts.push(action.payload)
        })
        .addCase(createPost.rejected,(state,action)=>
        {
           state.isLoading = false
           state.isError = true 
           state.message = action.payload 
           
        })
    }
})


export const {reset} = postSlice.actions
export default postSlice.reducer