import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postSlice';
import { PostList } from "./PostList";
import { createPost } from "./postSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export function NewPost(){
  const dispatch = useDispatch();
  const [ content, setContent ] = useState('');
  const [ status, setState ] = useState("idle");
  const [ image, setImage ] = useState("");
  const onContentChanged = e => setContent(e.target.value);

  const onSavePostClicked = async () => {
    try {
      setState("pending");
      const result = await dispatch(createPost({ content,image }));
      unwrapResult(result);
      setContent("");
      setImage("");
      setState("success");
    } catch (error) {
      console.log(error);
      setState("idle");
    }
  };

  const addImage = (event) => {
    setImage(event.target.files[0]);
    event.target.value = "";
  };

  return (
    <div>
      <form>
      <h1>New Post</h1>
        <div className="flex items-center">
          <textarea
              id="postContent"
              name="postContent"
              value={content}
              onChange={onContentChanged}
          />
          <button type="button" onClick={onSavePostClicked}>Save Post</button>

          <label
            htmlFor="file"
            className="flex cursor-pointer items-center rounded p-2 ml-14 font-medium hover:bg-gray-100">
            <span className="text-gray-700">Add Photo</span>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={addImage}
            />
          </label>
        </div>
      </form>
      <PostList/>
    </div>
  )
}