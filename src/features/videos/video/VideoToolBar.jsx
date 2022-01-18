import { useDispatch } from "react-redux"
import { addToLikedVideosBtnPressed, addToWatchLaterBtnPressed } from "../../user/userSlice";

export const VideoToolBar = ({videoId}) => {
    const dispatch = useDispatch();

    return (
        <div className="toolbar">
            <button className="btn btn-filled btn-no-hover" onClick={()=>dispatch(addToLikedVideosBtnPressed(videoId))} >
                Like
            </button>
            <button className="btn btn-filled btn-no-hover" onClick={() => dispatch(addToWatchLaterBtnPressed(videoId))}>
                Watch Later
            </button>
        </div>
    )
}