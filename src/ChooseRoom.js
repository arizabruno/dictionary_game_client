import { Button, TextField } from '@mui/material';
import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChooseRoom(props) {

    const socket = props.socket;

    const navigate = useNavigate();

    const [room, setRoom] = useState("");

    const joinRoom = () => {
        socket.emit("join_room", room);
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
                label="Nome da sala"
                onChange={(e) => {setRoom(e.target.value)}}
                />
            <br></br>
            <Button variant="outlined" onClick={joinRoom}>Entrar</Button>
        </div>
    );
}

export default ChooseRoom;