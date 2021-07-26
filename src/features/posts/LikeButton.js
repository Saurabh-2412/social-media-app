import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "./postSlice";

export function LikeButton({ post }){
    const dispatch = useDispatch();

    const likeButtonHandler = (postid, postType) => {
        if(postType === "single"){
            dispatch(likePost(postid));
        }
        else {
            dispatch(unlikePost(postid));
        }
    }

    return (
        <div>
            <div className="caption"> {post.desc} </div>
            <span className="likes" role="img">
                <button
                    style={{
                    fontWeight: "bolder",
                    backgroundColor: "gray",
                    color: "white",
                    padding:"5px"
                    }}
                    onClick={() => likeButtonHandler(post._id,"mingle")}
                >
                    Like {post.likes.length}
                </button>
            </span>
        </div>
    )
}