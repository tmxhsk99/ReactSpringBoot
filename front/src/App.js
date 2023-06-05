import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home"
import Article from "./pages/article/Article"
import ArticleAdd from "./pages/article/ArticleAdd"
import ArticleEdit from "./pages/article/ArticleEdit"
import ArticleDetail from "./pages/article/ArticleDetail"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/article/list" element={<Article/>}></Route>
        <Route path="/article/edit/:id" element={<ArticleEdit/>}></Route>
        <Route path="/article/add" element={<ArticleAdd/>}></Route>
        <Route path="/article/detail/:id" element={<ArticleDetail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
