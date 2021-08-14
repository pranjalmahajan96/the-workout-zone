import { useEffect } from "react";
import YouTubePlayer from "react-player/youtube"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneVideoService } from "../videoSlice";
import { VideoToolBar } from "./VideoToolBar";

export const VideoPage = () => {
    const dispatch = useDispatch();
    const { video } = useSelector(state => state.video)
    const { loginStatus } = useSelector(state => state.user)
    const { videoId, loading, isError, errorMsg } = useParams();

    useEffect(()=>{
        (async ()=>{
            if(videoId){
                dispatch(getOneVideoService(videoId));
            }
        })()
    },[dispatch,videoId])

    return (

        <div className="container">
         {
             isError ? <div>Error occured....{errorMsg}</div> : null
         }

        {
             loading ? <div>Loading Video....</div> :  <div className="container">
                                                            <YouTubePlayer url={video.videoURL} />
                                                            {loginStatus ? <VideoToolBar videoId={video._id} /> : null}
                                                        </div>
        }

        </div>
    )

    
}