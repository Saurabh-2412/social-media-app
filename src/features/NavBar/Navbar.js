import React from "react";
import { Link } from "react-router-dom";

export function Navbar(){
    return (
        <nav>
            <Link to="" style={{padding:"15px", border:"5px"}}>PostFeed</Link>
            <Link to="/viewpost/:postid" style={{padding:"15px", border:"5px"}}>ViewPost</Link>
        </nav>
    )
}