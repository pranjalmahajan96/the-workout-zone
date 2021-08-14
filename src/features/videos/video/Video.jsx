import { useEffect } from "react"
import YouTubePlayer from "react-player/youtube";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getVideosService } from "../videoSlice"

export const VideoLib = () => {
    const dispatch = useDispatch();
    const { videoList, loading, isError, errorMsg } = useSelector((state)=>state.video)
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            if(!loading){
                dispatch(getVideosService());
            }
        })()
        //eslint-disable-next-line
    },[])

    const showVideo = (videoId) => {
        console.log("on-click",videoId)
        navigate(`/video/${videoId}`)
    }


    return(
        <>
        <div className="container">
        {
         isError ? <div>Error occured....{errorMsg}</div> : null
        }

        {
         loading ? <div>Loading Videos....</div> : videoList.map(video => 
         <div key={video._id} className="thumbnail flex-dis" onClick={()=>showVideo(video._id)}>
             <YouTubePlayer url={video.videoURL} light={true} width={"540px"} height={"360px"} />
        </div>)
        }
        </div>
        </>
    )
}