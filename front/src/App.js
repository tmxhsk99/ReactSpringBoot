import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Post from "./pages/post/Post";
import {getQueryClient} from "./query/queryClient";
import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {RecoilRoot} from "recoil";

function App() {
    const queryClient = getQueryClient();

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/post/*" element={<Post/>}></Route>
                    </Routes>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </div>
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default App;
