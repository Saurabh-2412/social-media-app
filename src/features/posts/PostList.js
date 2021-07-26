import React, { useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadPosts } from "./postSlice";
import { LikeButton } from "./LikeButton";
import { CommentOnPost } from "./CommentButton";
import { ViewPost } from "./ViewPost";

export function PostList() {
    const { status, posts, error } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    //const posts = useSelector((state) => { return state.posts});

    useEffect(() => {
        (async () => {
        if (status === "idle") {
            dispatch(loadPosts());
        }
        })();
    }, [status, dispatch]);
    
    return (
        <div>
            <div>
                {posts.map((post) => (
                    <article
                        key={post._id}
                        style={{
                        border: "2px solid black",
                        padding: "15px",
                        margin: "5px"
                        }}
                        className="post"
                    >
                        <NavLink className="NavLink" to={`./viewpost/${post._id}`}>
                            {post.image && <img src={post.image} alt=""/>}
                        </NavLink>
                        <LikeButton post={post}/>
                        <CommentOnPost post={post}/>
                        <NavLink className="NavLink" to={`./viewpost/${post._id}`}>
                            ViewPost
                        </NavLink>
                        {/** <button onClick={() => ViewPostClickHandler(post._id)}>ViewPost</button> */}
                    </article>
                ))}
            </div>
        </div>
    );
}
