import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DicionarioContext from './DicionarioContext';
import Vocabulary from './vocabulary.json';

function GuessDefinition(props) {

    const socket = props.socket;
    const [word, setWord] = useState("");
    const [userName, setUserName] = useState("");
    const [definition, setDefinition] = useState("");
    const room = useContext(DicionarioContext);
    const navigate = useNavigate();

    const submitGuess = () => {

        const guess ={
            word: word,
            sid: socket.id,
            definition: definition,
            user:userName
        }

        console.log({guess, room: room.name});
        socket.emit("new_guess", {guess, room: room.name});
    }

    useEffect(() => {
        socket.on("word_updated", (newWord) => {
            setWord(newWord);
        });

        socket.on("guess_time_out", () => {
            navigate("/");
        })
    }, [socket, word, navigate]);

    return (
        <div className='guess-definition'>
            <div>
            {Vocabulary[room.language].word}: <div>{word}</div>
            </div>
            <br></br>
            <TextField
                label={Vocabulary[room.language].definition}
                className='text-field'
                multiline
                rows={10}
                onChange={(e) => {setDefinition(e.target.value)}}
                />
            <br></br>
            <br></br>
            <TextField
                id="palavra-text-field"
                label={Vocabulary[room.language].name}
                className='text-field'
                onChange={(e) => {setUserName(e.target.value)}}
                />
            <br></br>
            <Button variant="outlined" color="primary" onClick={submitGuess}>{Vocabulary[room.language].done}</Button>
            
        </div>
    );
}

export default GuessDefinition;