import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DicionarioContext from './DicionarioContext';

function GuessDefinition(props) {

    const socket = props.socket;

    const [word, setWord] = useState("");
    const [userName, setUserName] = useState("");
    const [definition, setDefinition] = useState("");
    const room = useContext(DicionarioContext);


    useEffect(() => {
        socket.on("word_updated", (newWord) => {
            setWord(newWord);
        });
    }, [socket, word]);

    const submitGuess = () => {

        const guess ={
            sid: socket.id,
            definition: definition,
            user:userName
        }

        // const guess = new Guess(socket.id, definition, userName);
        console.log({guess, room: room.name});
        socket.emit("new_guess", {guess, room: room.name});
    }

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
                onChange={(e) => {setDefinition(e.target.value)}}
                />
            <br></br>
            <br></br>
            <TextField
                id="palavra-text-field"
                label="Nome"
                className='text-field'
                onChange={(e) => {setUserName(e.target.value)}}
                />
            <br></br>
            <Button variant="outlined" color="primary" onClick={submitGuess}>Pronto</Button>
            
        </div>
    );
}

export default GuessDefinition;