import React,{useEffect,useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";
import { viewPost } from "./postSlice";
import { Link, useParams, useLocation } from "react-router-dom";

export function ViewPost() {
    const dispatch = useDispatch();
    const [pending, setPending] = useState("idle");
    const { postid } = useParams();
    const post = useSelector((state) => state.posts.singlePost);
    
    useEffect(() => {
        (async () => {
            try {
              setPending("pending");
              const resultAction = await dispatch(viewPost(postid));
              unwrapResult(resultAction);
              setPending("success");
            } catch (error) {
              console.log(error);
            }
        })();
    }, [dispatch, postid ]);
   
    return (
        <div>
            <p>hello this is view post page</p>
        </div>
    )
}
