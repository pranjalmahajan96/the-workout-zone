import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getVideosService = createAsyncThunk("video/getVideos", async () => {
    try{
        const response = await axios.get("https://theworkoutzoneapi.pranjalmahajan.repl.co/videos");
        return response.data;
    }catch (error){
        console.log(error);
        return Promise.reject(error.message);
    }
});

export const getOneVideoService = createAsyncThunk("video/getOneVideo", async (videoId) => {
    try{
        console.log("sending req for 1 video")
        const response = await axios.get(`https://theworkoutzoneapi.pranjalmahajan.repl.co/videos/${videoId}`);
        console.log("got video")
        return response.data;
    }catch (error){
        console.log(error);
        return Promise.reject(error.message);
    }
})

const initialState = {
    video:{},
    videoList: [],
    loading: false,
    isError: false,
    errorMsg: ""
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers:{
        resetState(state) {
            state.video = {};
            state.videoList = [];
            state.loading = false;
            state.isError = false;
            state.errorMsg = "";
          
        },
    },
    extraReducers:{
        [getVideosService.pending]: (state) => {
            state.loading = true;
        },
        [getVideosService.fulfilled]: (state, action) => {
            state.loading = false;
            state.videoList = action.payload.videos;
            state.isError = false;
            state.errorMsg = "";
        },
        [getVideosService.rejected]: (state, action) => {
            state.loading = false;
            state.isError = true;
            state.errorMsg = action.error.message;
        },

        [getOneVideoService.pending]: (state) => {
            state.loading = true;
        },
        [getOneVideoService.fulfilled]: (state, action) => {
            state.loading = false;
            state.video = action.payload.video;
            state.isError = false;
            state.errorMsg = "";
        },
        [getOneVideoService.rejected]: (state, action) => {
            state.loading = false;
            state.isError = true;
            state.errorMsg = action.error.message;
        },
    }
});

export const { resetState } = videoSlice.actions;

export default videoSlice.reducer;