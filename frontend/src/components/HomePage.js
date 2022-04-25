import React,{Component} from "react"
import { render } from "react-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {BrowserRouter, Routes, Route, Link, Redirect,} from "react-router-dom";



export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    render(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<p1>This is the homepage</p1>}/>
                <Route path="/join" element={<RoomJoinPage />}/>
                <Route path="/create" element={<CreateRoomPage />}/>
            </Routes>
        </BrowserRouter>
       
    );
}
}

