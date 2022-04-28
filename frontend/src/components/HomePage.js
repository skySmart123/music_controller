import React,{Component} from "react"
import { render } from "react-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {BrowserRouter, Routes, Route, Link, Redirect, Navigate} from "react-router-dom";
import { ButtonGroup, Typography } from "@material-ui/core";
import { Grid, Button, } from "@material-ui/core";
import { withRouter } from './withRouter'

  export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: null,

        };
        this.clearRoomCode = this.clearRoomCode.bind(this)
    }
    // fetch to return whether or not we are in the room,
    // if we are, we are going to get that room code coming through the field 'code'
    //then we will return our response to a JSon file, then we can parse the data and get the room code
    async componentDidMount(){
        // 前端联系后端的url 加上api
        fetch('/api/use-in-room')
        .then((response) => response.json())
        // force state to force it re-render
        .then((data) => {this.setState(
            {roomCode: data.code,}
            
            )
            console.log(data.code)
            console.log(",,,")
        });
    }
    clearRoomCode(){
        this.setState({
            roomCode:null,
        })
    }
    renderHomePage(){
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }
   
    render(){
    return (
        <BrowserRouter>
            <Routes>
            <Route exact path="/" element={this.state.roomCode ? 
            (<Navigate replace to={`/room/${this.state.roomCode}`} />) : 
            (this.renderHomePage())}/>
        
         
                <Route path="/join" element={<RoomJoinPage />}/>
                <Route path="/create" element={<CreateRoomPage />}/>
                <Route path="/room/:roomCode" element={<Room leaveRoomCallBack={this.clearRoomCode}/>}/>
            </Routes>
        </BrowserRouter>
       
    );
}
}

// export default withRouter(HomePage);