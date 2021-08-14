import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signupBtnClicked = createAsyncThunk(
    "user/signup",
    async ({ name, username, email, cpassword }) => {
      console.log("btn clicked");
      try {
        console.log("sending sign up req....")
        console.log(name,username,email,cpassword)
        const response = await axios.post(
          "https://theworkoutzoneapi.pranjalmahajan.repl.co/user/signup",
          {
            name: name,
            username: username,
            email: email,
            password: cpassword
          }
        );
        if (response.data.success) {
          localStorage.setItem(
            "login",
            JSON.stringify({
              token: response.data.user.token,
              isUserLoggedIn: true
            })
          );
          console.log("user signed up");
        }
        return response.data;
      } catch (error) {
        console.log("Error occured: ", error.message);
        return Promise.reject(error.message);
      }
    }
  );

  export const loginBtnClicked = createAsyncThunk(
    "user/login",
    async ({ email, password }) => {
      console.log("btn clicked");
      try {
        localStorage?.clear();
        console.log("making the login network call");
        const response = await axios.post(
          "https://theworkoutzoneapi.pranjalmahajan.repl.co/user/login",
          {
            email: email,
            password: password
          }
        );
        if (response.data.success) {
          localStorage.setItem(
            "login",
            JSON.stringify({
              token: response.data.user.token,
              isUserLoggedIn: true
            })
          );
          axios.defaults.headers.common["Authorization"] =
            response.data.user.token;
          console.log("user logged in");
        }
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.log("Error occured: ", error.message);
        return Promise.reject(error.message);
      }
    }
  );

  export const addToLikedVideosBtnPressed = createAsyncThunk("user/addToLikedVideo", async (videoId) => {
    try{
      console.log("sending liked video req")
      const response = await axios.post("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/addtolikedvideos", {
        videoId
      });
      console.log("successful")
      return response.data;
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  export const addToWatchLaterBtnPressed = createAsyncThunk("user/addToWatchLater", async (videoId) => {
    try{
      console.log("sending watch later video req")
      const response = await axios.post("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/addtowatchLater", {
        videoId
      });
      console.log("successful")
      return response.data;
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  export const removeFromlikedVideosBtnPressed = createAsyncThunk("user/removefromlikedVideo", async (videoId) => {
    try{
      console.log("sending liked video req")
      const response = await axios.post("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/removefromlikedvideos", {
        videoId
      });
      return response.data;
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  export const removeFromwatchLaterBtnPressed = createAsyncThunk("user/removefromwatchLater", async (videoId) => {
    try{
      console.log("sending liked video req")
      const response = await axios.post("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/removefromwatchLater", {
        videoId
      });
      return response.data;
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  export const getLikedVideos = createAsyncThunk("user/getLikedVideos", async () => {
    try{
      console.log("getting liked videos...")
      const response = await axios.get("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/likedvideos");
      return response.data
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  export const getWatchLater = createAsyncThunk("user/getWatchLater", async () => {
    try{
      console.log("getting watch later videos...")
      const response = await axios.get("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/watchlater");
      return response.data
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  export const getHistory = createAsyncThunk("user/getHistory", async () => {
    try{
      console.log("getting watch later videos...")
      const response = await axios.get("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/history");
      return response.data
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  export const addToHistory = createAsyncThunk("user/addToHistory", async (videoId) => {
    try{
      console.log("sending liked video req")
      const response = await axios.post("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/addtohistory", {
        videoId
      });
      return response.data;
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  export const clearHistoryBtnPressed = createAsyncThunk("user/clearHistory", async (videoId) => {
    try{
      console.log("sending liked video req")
      const response = await axios.put("https://theworkoutzoneapi.pranjalmahajan.repl.co/user/clearhistory");
      return response.data;
    }catch(error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  })

  const initialState = {
    user: {
      _id:null,
      name: null,
      username: null,
      email: null,
      likedVideos: [],
      watchLater: [],
      history: [],
      playlists: []
    },
    loginStatus: false,
    loading: true,
    isError: false,
    errorMsg: "",
    actionInProgress: false,
  };

  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        logoutBtnPressed: (state, action) => {
           localStorage.removeItem("login");
           state.user = {
            _id:null,
            name: null,
            username: null,
            email: null,
            likedVideos: [],
            watchLater: [],
            history: [],
            playlists: []
           };
            state.loginStatus = false;
            state.isError = false;
            state.errorMessage = "";
            state.loading = false;
            state.actionInProgress = false;
          }
    },
    extraReducers:{
        [signupBtnClicked.pending]: (state) => {
            state.loading = true;
          },
          [signupBtnClicked.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.success) {
              state.loginStatus = true;
              state.user = action.payload.user;
              state.isError = false;
              state.errorMessage = "";
            }
          },
          [signupBtnClicked.rejected]: (state, action) => {
            state.loading = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },
          

          [loginBtnClicked.pending]: (state) => {
            state.loading = true;
          },
          [loginBtnClicked.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.success) {
              state.loginStatus = true;
              state.user = action.payload.user;
              state.isError = false;
              state.errorMessage = "";
             
            }
          },
          [loginBtnClicked.rejected]: (state, action) => {
            state.loading = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [addToLikedVideosBtnPressed.pending]: (state) => {
            state.actionInProgress = true;
          },
          [addToLikedVideosBtnPressed.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            state.user =  action.payload.user;
            state.isError = false;
            state.errorMessage = "";
          },
          [addToLikedVideosBtnPressed.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [addToWatchLaterBtnPressed.pending]: (state) => {
            state.actionInProgress = true;
          },
          [addToWatchLaterBtnPressed.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            state.user =  action.payload.user;
            state.isError = false;
            state.errorMessage = "";
          },
          [addToWatchLaterBtnPressed.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [removeFromlikedVideosBtnPressed.pending]: (state) => {
            state.actionInProgress = true;
          },
          [removeFromlikedVideosBtnPressed.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            state.user =  action.payload.user;
            state.isError = false;
            state.errorMessage = "";
          },
          [removeFromlikedVideosBtnPressed.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [removeFromwatchLaterBtnPressed.pending]: (state) => {
            state.actionInProgress = true;
          },
          [removeFromwatchLaterBtnPressed.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            state.user =  action.payload.user;
            state.isError = false;
            state.errorMessage = "";
          },
          [removeFromwatchLaterBtnPressed.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [getLikedVideos.pending]: (state) => {
            state.loading = true;
          },
          [getLikedVideos.fulfilled]: (state, action) => {
            state.loading = false;
            state.user.likedVideos =  action.payload.likedVideos.likedVideos;
            state.isError = false;
            state.errorMessage = "";
          },
          [getLikedVideos.rejected]: (state, action) => {
            state.loading = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [getWatchLater.pending]: (state) => {
            state.loading = true;
          },
          [getWatchLater.fulfilled]: (state, action) => {
            state.loading = false;
            state.user.watchLater =  action.payload.watchLater.watchLater;
            state.isError = false;
            state.errorMessage = "";
          },
          [getWatchLater.rejected]: (state, action) => {
            state.loading = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [getHistory.pending]: (state) => {
            state.loading = true;
          },
          [getHistory.fulfilled]: (state, action) => {
            state.loading = false;
            state.user.history =  action.payload.history.history;
            state.isError = false;
            state.errorMessage = "";
          },
          [getHistory.rejected]: (state, action) => {
            state.loading = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [addToHistory.pending]: (state) => {
            state.actionInProgress = true;
          },
          [addToHistory.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            state.user =  action.payload.user;
            state.isError = false;
            state.errorMessage = "";
          },
          [addToHistory.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


          [clearHistoryBtnPressed.pending]: (state) => {
            state.actionInProgress = true;
          },
          [clearHistoryBtnPressed.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            state.user =  action.payload.user;
            state.isError = false;
            state.errorMessage = "";
          },
          [clearHistoryBtnPressed.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          },


      }
  });
  
  export const { logoutBtnPressed } = userSlice.actions;
  
  export default userSlice.reducer;
  