import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { NewPost } from "./features/posts/NewPost";
import { PostList } from './features/posts/PostList';
import { PostBody } from "./features/posts/PostBody";
import { ViewPost } from './features/posts/ViewPost';
import { Navbar } from "./features/NavBar/Navbar";

function App() {
  return (
    <div className="App">
      {/** <Navbar/> */}
      <Routes>
        <Route path="/" element={ <PostList/> }></Route>
        <Route path="/viewpost/:postid" element={<ViewPost/>}></Route>
      </Routes>
    </div>
  );
}

export default App;