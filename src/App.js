import React from 'react';
import "./index.css";
import { Header, LikedVideos, Login, Signup, VideoLib, VideoPage, WatchLater, History, PrivateRoute } from "./features"
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<VideoLib />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <PrivateRoute path="/likedvideos" element={<LikedVideos />} />
        <PrivateRoute path="/watchlater" element={<WatchLater />} />
        <PrivateRoute path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
