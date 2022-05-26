import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DicionarioContext from './DicionarioContext';
import Vocabulary from './vocabulary.json';

function ChooseWord(props) {

    const socket = props.socket;
    const room = useContext(DicionarioContext);
    const [word, setWord] = useState(room.guesses[socket.id]?.word);
    const [definition, setDefinition] = useState(room.guesses[socket.id]?.definition);
    const [numberOfGuesses, setNumberOfGuesses] = useState(room.guesses[socket.id] ? Object.keys(room.guesses).length - 1 : Object.keys(room.guesses).length);
    const navigate = useNavigate();

    const done = () => {

        const guess = {
            word: word,
            sid: socket.id,
            definition: definition,
            user:Vocabulary[room.language].correctAnswer
        }
        
        room.guesses[guess.sid] = guess;
        socket.emit("no_more_guesses", {room:room.name});
        navigate("/displayGuesses");
    }

    useEffect(() => {
        console.log(room);
        socket.emit("update_word", {word:word, room:room.name});

        socket.on("new_guess_to_host", (newGuess) => {
            console.log("New Guess");
            room.guesses[newGuess.sid] = newGuess;
            const numberG = Object.keys(room.guesses).length;
            if(room.guesses[socket.id]) {
                setNumberOfGuesses(numberG - 1);
            } else {
                setNumberOfGuesses(numberG);
            }
          });
    }, [socket, word, room]);

    return (
        <div className='choose-word default-page'>
            <TextField
                id="palavra-text-field"
                label={Vocabulary[room.language].word}
                className='text-field'
                defaultValue={word}
                onChange={(e) => {setWord(e.target.value)}}
                />
            <br></br>

            <TextField
                id="outlined-multiline-static"
                label={Vocabulary[room.language].definition}
                className='text-field'
                multiline
                rows={10}
                defaultValue={definition}
                onChange={(e) => {setDefinition(e.target.value)}}
                />

            <br></br>
            <div>
                <div id="respostas-enviadas">{numberOfGuesses}</div>
                {Vocabulary[room.language].guessesSent}
            </div>
            <br></br>

           <Button variant="outlined" color="primary" onClick={done}>{Vocabulary[room.language].done}</Button>
        </div>
    );
}

export default ChooseWord;