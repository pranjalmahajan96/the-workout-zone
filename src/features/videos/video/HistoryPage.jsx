import { useEffect } from "react";
import YouTubePlayer from "react-player/youtube";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../../user/userSlice";



export const History = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { history, loading, isError, errorMsg } = useSelector(state => state.user.user)

    const showVideo = (videoId) => {
        console.log("on-click",videoId)
        navigate(`/video/${videoId}`)
    }

    useEffect(()=>{
        (async () => {
            if(!loading){
            dispatch(getHistory());
            }
        })()
    },[dispatch,loading])


    return (
        <div className="container flex-dis">
        {
             isError ? <div>Error occured....{errorMsg}</div> : null
        }

        {
             loading ? <div>Loading History Videos....</div> : history.map(video => 
                <div key={video._id} className="thumbnail flex-dis" onClick={()=>showVideo(video._id)}>
                    <YouTubePlayer url={video.videoURL} light={true} width={"540px"} height={"360px"} />

               </div>)
        }

        </div>
    )
}