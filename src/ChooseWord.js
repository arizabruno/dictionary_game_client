import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DicionarioContext from './DicionarioContext';

function ChooseWord(props) {

    const socket = props.socket;

    const [word, setWord] = useState("");

    const [store] = useContext(DicionarioContext);

    useEffect(() => {
        socket.emit("update_word", {word:word, room:store.room});
    }, [socket, word, store]);

    return (
        <div className='choose-word default-page'>
            <TextField
                id="palavra-text-field"
                label="Palavra"
                className='text-field'
                onChange={(e) => {setWord(e.target.value)}}
                />
            <br></br>

            <TextField
                id="outlined-multiline-static"
                label="Definição"
                className='text-field'
                multiline
                rows={10}
                />

            <br></br>
            <div>
                <div id="respostas-enviadas">X</div>
                respostas enviadas
            </div>
            <br></br>

            <Link to="/"><Button variant="outlined" color="primary">Pronto</Button></Link>
        </div>
    );
}

export default ChooseWord;