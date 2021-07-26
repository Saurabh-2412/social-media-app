import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { NewPost } from "./features/posts/NewPost";
import { ViewPost } from './features/posts/ViewPost';
import { Navbar } from "./features/NavBar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>  
      <Routes>
        <Route path="" element={<NewPost />}></Route>
        <Route path="/viewpost/:postid" element={<ViewPost/>}></Route>
      </Routes>
    </div>
  );
}

export default App;