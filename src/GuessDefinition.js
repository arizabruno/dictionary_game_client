import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function GuessDefinition(props) {

    const socket = props.socket;

    const [word, setWord] = useState("");

    useEffect(() => {
        socket.on("word_updated", (newWord) => {
            setWord(newWord);
        });
    }, [socket, word]);

    return (
        <div className='guess-definition'>
            <div>
                Palavra: <div>{word}</div>
            </div>
            <br></br>
            <TextField
                label="Definição"
                className='text-field'
                multiline
                rows={10}
                />
            <br></br>
            <Link to="/"><Button variant="outlined" color="primary">Pronto</Button></Link>
        </div>
    );
}

export default GuessDefinition;