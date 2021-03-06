import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DicionarioContext from './DicionarioContext';
import Vocabulary from './vocabulary.json';

function CreateRoom(props) {

    const socket = props.socket;
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState("");
    const room = useContext(DicionarioContext);

    const create = () => {
        room.name = roomName;
        console.log("Creating new room");
        socket.emit("new_room", roomName);
    }
    
    useEffect(() => {
        socket.on("room_created", () => {
            
            navigate(`/chooseWord`);
        });
    }, [socket, navigate]);

    return (
        <div className='create-room default-page'>
            <TextField
                id="outlined-helperText"
                label={Vocabulary[room.language].roomName}
                helperText={Vocabulary[room.language].createroomTextHint}
                onChange={(e) => {setRoomName(e.target.value)}}
                />
            <Button variant="outlined" onClick={create}>{Vocabulary[room.language].create}</Button>
        </div>
    );
}

export default CreateRoom;