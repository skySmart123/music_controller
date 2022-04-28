import React, { useState } from 'react'
import { TextField, Button, Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import { withRouter } from './withRouter'


 function RoomJoinPage(props){
//    const[roomCode, setRoomCode] = useState("");
//    const[error, setError] = useState("")
   
//    const handleTextFieldChange = (e) =>{
//        setRoomCode(e.target.value)
//    }
//    const handleRoomButtonPressed = () =>{
//        console.log(roomCode)
//    }
const [roomState, setRoomState] = useState({roomCode:"", error:""})
const handleTextFieldChange = (e) =>{
  setRoomState({
    ...roomState,
    roomCode: e.target.value
  })
  console.log(roomState)
}

const handleRoomButtonPressed =() =>{
    const requestOptions = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            code: roomState.roomCode
        })
    };
    fetch('/api/join-room',requestOptions)
    .then(res => {
        //successfully enter the room
        if(res.ok){
            props.navigate(`/room/${roomState.roomCode}`)
            console.log(roomState.roomCode)
            console.log("m,")
            // props.history.push(`/room/${roomState.roomCode}`)

        }else{
            setRoomState({
                ...roomState,
                error:"Room not Found"
            })
        }
    }) .catch(err => console.log(err))
      
}
const handleKeyDown = (e ) =>{
    if(e.key === 'Enter'){
        handleRoomButtonPressed()
    }

}

return (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join A Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField 
          error={ roomState.error } 
          label="code"
          placeholder="Enter A RoomCode"
          value={ roomState.roomCode }
          helperText={ roomState.error }
          variant="outlined"  
          onChange={handleTextFieldChange}
          onKeyDown={(e) => {
            handleKeyDown(e)
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleRoomButtonPressed}>Join Room</Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
      </Grid>
    </Grid>
  )


   }
   
   export default withRouter(RoomJoinPage);
