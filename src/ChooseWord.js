import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DicionarioContext from './DicionarioContext';

function ChooseWord(props) {

    const socket = props.socket;

    const [word, setWord] = useState("");
    const [numberOfGuesses, setNumberOfGuesses] = useState("");

    const room = useContext(DicionarioContext);

    useEffect(() => {
        console.log(room);
        socket.emit("update_word", {word:word, room:room.name});

        socket.on("new_guess_to_host", (newGuess) => {
            console.log("New Guess");
            room.guesses[newGuess.sid] = newGuess;
            setNumberOfGuesses(Object.keys(room.guesses).length);
          });
    }, [socket, word, room]);

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
                <div id="respostas-enviadas">{numberOfGuesses}</div>
                respostas enviadas
            </div>
            <br></br>

            <Link to="/"><Button variant="outlined" color="primary">Pronto</Button></Link>
        </div>
    );
}

export default ChooseWord;