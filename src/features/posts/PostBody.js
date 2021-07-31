import React from "react";
import { Link } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import { CommentOnPost } from "./CommentButton";

export function PostBody ({ post }) {
  const { desc, createdDate, likes, image, comments,_id, } = post;

  return (
    <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg rounded shadow">
      <div>
        {image && <img src={image} alt={image} className="mt-2" />}
        <p className="py-3 px-2">{desc}</p>
      </div>
      <div className="flex justify-end text-gray-700">
        <p className="mr-2">{likes.length} likes</p>
        <p className="mr-2">{comments.length} comments</p>
      </div>
      <div className="flex justify-around my-1 border-t-2">
        <LikeButton post={post} />
        <CommentOnPost post={post} />
        <Link className="post-buttons" to={`/viewpost/${_id}`}>
          <span className="pl-1 text-base">View Post</span>
        </Link>
      </div>
    </div>
  )
};
