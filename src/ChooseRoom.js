import { Button, TextField } from '@mui/material';
import React, {useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DicionarioContext from './DicionarioContext';
import Vocabulary from './vocabulary.json';

function ChooseRoom(props) {

    const socket = props.socket;
    const navigate = useNavigate();
    const [roomToBeEntered, setRoomToBeEntered] = useState("");
    const room = useContext(DicionarioContext);

    const joinRoom = () => {
        room.name = roomToBeEntered;
        setTimeout(() => {}, 30000);
        socket.emit("join_room", roomToBeEntered);
    }

    useEffect(() => {
        socket.on("room_joined", () => {
          navigate("/guessDefinition");
        });
      }, [socket, navigate]);

    return (
        <div className='choose-room default-page'>
            <TextField
                id="outlined-helperText"
                label={Vocabulary[room.language].roomName}
                onChange={(e) => {setRoomToBeEntered(e.target.value)}}
                />
            <br></br>
            <Button variant="outlined" onClick={joinRoom}>{Vocabulary[room.language].enterRoomBtnLabel}</Button>
        </div>
    );
}

export default ChooseRoom;