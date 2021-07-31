import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "./postSlice";

export function LikeButton({ post, type }) {
  const dispatch = useDispatch();
  const [ likeStatus,setLikeStatus ] = useState("Like");

  /* const likeColorToggle = (post) => {
    if (post?.likes.includes("123456")) {
      return "text-blue-500";
    } else {
      return "";
    }
  }; */

  const likeButtonHandler = (post) => {
    if (type === "single") {
      console.log("like post");
      dispatch(likePost(post._id));
    } else {
      console.log("unlike post");
      dispatch(unlikePost(post._id));
    }
  };

  return (
    <div>
      <button
        //className={`post-buttons ${likeColorToggle( post )}`}
        onClick={() => likeButtonHandler(post)} >
        <span className="pl-1 text-base">{likeStatus}</span>
      </button>
    </div>
  )
}