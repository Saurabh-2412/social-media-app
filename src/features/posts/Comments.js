import React, { useState } from "react";
import { dropComment } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";

export function Comments({ post }){
    const [ deleteComment,setDeleteComment ] = useState(false);
    const dispatch = useDispatch();

    function deleteCommentAction(itemId,postId){
        console.log(itemId,postId);
        dispatch(dropComment({ postid: postId }));
    }

    const renderComments = React.Children.toArray(
        post.comments.map((item) => (
            <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg rounded shadow">
                <div className="flex pl-2 pt-3">
                    {/**
                        <ProfilePhoto
                        photo={item.userid.profilePicture}
                        name={item.userid.name}
                        />
                    */}
                    <div className="pl-3">
                        {/** 
                            <PostProfileHeader
                            username={item.userid.username}
                            name={item.userid.name}
                            />
                            <TimeAgo timestamp={item.createdAt} />
                        */}
                    </div>
                </div>
                <div>
                    <p className="py-3 px-2">{item.comment}</p>
                </div>
                {item.userId === "123456" && <button onClick={() => deleteCommentAction(item.userId,post._id)}>Delete</button>}
            </div>
            
        ))
    );

    return(
        <div>
            {renderComments}
        </div>
    )
}