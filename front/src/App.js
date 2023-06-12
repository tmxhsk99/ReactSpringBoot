import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home"
import Post from "./pages/post/Post"
import PostAdd from "./pages/post/PostAdd"
import PostEdit from "./pages/post/PostEdit"
import PostDetail from "./pages/post/PostDetail"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/post/list" element={<Post/>}></Route>
        <Route path="/post/edit/:id" element={<PostEdit/>}></Route>
        <Route path="/post/add" element={<PostAdd/>}></Route>
        <Route path="/post/detail/:id" element={<PostDetail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
