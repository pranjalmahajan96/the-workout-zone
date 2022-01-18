import { useEffect } from "react";
import YouTubePlayer from "react-player/youtube";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWatchLater } from "../../user/userSlice";
// import { VideoToolBar } from "./VideoToolBar";


export const WatchLater = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { watchLater, loading, isError, errorMsg } = useSelector(state => state.user.user)

    const showVideo = (videoId) => {
        console.log("on-click",videoId)
        navigate(`/video/${videoId}`)
    }

    useEffect(()=>{
        (async () => {
            if(!loading){
            dispatch(getWatchLater());
            }
        })()
    },[dispatch,loading])


    return (
        <div className="container">
        {
             isError ? <div>Error occured....{errorMsg}</div> : null
        }

        {
             loading ? <div>Loading Watch Later Videos....</div> : watchLater.map(video => 
                <div key={video._id} className="thumbnail flex-dis" onClick={()=>showVideo(video._id)}>
                    <YouTubePlayer url={video.videoURL} light={true} width={"540px"} height={"360px"} />
                    {/* <VideoToolBar /> */}
               </div>)
        }

        </div>
    )
}