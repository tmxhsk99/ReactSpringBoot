import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Post from "./pages/post/Post";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/post/*" element={<Post/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
