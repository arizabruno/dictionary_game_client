import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DicionarioContext from './DicionarioContext';

function CreateRoom(props) {

    const socket = props.socket;

    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("");

    const [store, setStore] = useContext(DicionarioContext);
    

    useEffect(() => {
        socket.on("room_created", () => {
            navigate(`/chooseWord`);
        });
    }, [socket, navigate]);

    const create = () => {
        setStore({room:roomName});
        console.log("Creating new room");
        socket.emit("new_room", roomName);
    }

    return (
        <div className='create-room default-page'>
            <TextField
                id="outlined-helperText"
                label="Nome da sala"
                helperText="Este será o nome visto pelos outros usarios para entrar na sala."
                onChange={(e) => {setRoomName(e.target.value)}}
                />
            <Button variant="outlined" onClick={create}>Criar</Button>
        </div>
    );
}

export default CreateRoom;