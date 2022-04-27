import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";  
import { Grid, Button, Typography } from "@material-ui/core";
import { withRouter } from './withRouter'
 function Room(props){
    const[votesToSkip, setVotesToSkip] = useState(2);
    const[guestCanPause,setGuestCanPause] = useState(false);
    const[isHost,setIsHost] = useState(false);
    const{roomCode} = useParams();

    
    // useEffect(() => {
    //     fetch("/api/get-room" + "?code=" + roomCode)
    //     .then((response)=> response.json()).
    //     then((data) => {
    //         //  console.log(data.votes_to_skip)
    //         //  console.log(data.guest_can_pause.toString())
    //         setGuestCanPause(data.guest_can_pause),
    //         setVotesToSkip(data.votes_to_skip),
    //         setIsHost(data.is_host)
    //         })
    //     },[])
    
   useEffect(() => {
       
           fetch('/api/get-room' + '?code=' + roomCode)
           .then((res) => {
               if(!res.ok){
                   props.leaveRoomCallBack();
                   props.navigate("/");
               }
               return response.json()
           })
           .then((data) => {
            setGuestCanPause(data.guest_can_pause),
            setVotesToSkip(data.votes_to_skip),
            setIsHost(data.is_host)
           }) },[])

   const  leaveButtonPressed = () =>{
    const requestOptions = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
      
    };
    fetch('/api/leave-room', requestOptions)
    .then((res) => {
        props.navigate("/")

    })
   }
        return (
            <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes: {votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest Can Pause: {guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
        );
    
};
export default withRouter(Room);