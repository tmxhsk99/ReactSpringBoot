import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home"
import Post from "./pages/article/Post"
import PostAdd from "./pages/article/PostAdd"
import PostEdit from "./pages/article/PostEdit"
import PostDetail from "./pages/article/PostDetail"
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
