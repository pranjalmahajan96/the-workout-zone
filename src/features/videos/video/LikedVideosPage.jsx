import { useEffect } from "react";
import YouTubePlayer from "react-player/youtube";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLikedVideos } from "../../user/userSlice";



export const LikedVideos = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { likedVideos, loading, isError, errorMsg } = useSelector(state => state.user.user)

    const showVideo = (videoId) => {
        console.log("on-click",videoId)
        navigate(`/video/${videoId}`)
    }

    useEffect(()=>{
        (async () => {
            if(!loading){
                dispatch(getLikedVideos());
            }
        })()
    },[dispatch,loading])

    console.log(likedVideos)
    return (
        <div className="container">
        {
             isError ? <div>Error occured....{errorMsg}</div> : null
        }

        {
             loading ? <div>Loading Liked Videos....</div> : likedVideos.map(video => 
                <div key={video._id} className="thumbnail flex-dis" onClick={()=>showVideo(video._id)}>
                    <YouTubePlayer url={video.videoURL} light={true} width={"540px"} height={"360px"} />
               </div>)
        }

        </div>
    )
}