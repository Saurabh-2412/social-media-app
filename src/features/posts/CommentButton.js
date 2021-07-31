import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postComment } from "./postSlice";

//fetching single comment
export function CommentListner({ post }){
    //console.log("post",post);
    //const postedComments = post.comments;
    //console.log("postedComments",postedComments);
    let postComments = post.comments.map((postedElement) => postedElement.userId === "123456");
    //console.log("filtered comments",postComments.comment);
    return (
        <div>
            {postComments && <p style={{color:"gray"}}>{postComments.comment}</p> }
        </div>
    )
}

export function CommentOnPost({ post }){
    const [ textBox, textBoxSetter ] = useState("none");
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const [pending, setPending] = useState("idle");
    
    function textBoxToggle(){
        if(textBox === "none"){
            textBoxSetter("block");
        } else {
            textBoxSetter("none");
        }
    }

    function handleOnclickHandler (post) {
        dispatch(postComment({ postid: post._id, comment }));
        textBoxSetter("none");
        setComment("");
    };

    return (
        <div>
            <div>
                <button onClick={() => textBoxToggle(post)}>Comment</button>
                <div className="flex items-center flex-col my-3" style={{ display:`${textBox}` }}>
                    <textarea
                    autoFocus={true}
                    className="w-11/12 md:w-11/12 bg-gray-200 rounded-lg p-2"
                    coloums="40"
                    placeholder="Would you like to make a comment?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    >
                    </textarea><br/>
                    <div className="inline self-end mr-3 mt-2">
                        <button
                            className="comment-buttons"
                            onClick={() => textBoxToggle()}
                        >Cancel</button>
                        <button
                            className="comment-buttons"
                            onClick={() => handleOnclickHandler(post)}
                        >Save</button>
                    </div>
                </div>
            </div>
            <CommentListner post={post}/>
        </div>
    )
}