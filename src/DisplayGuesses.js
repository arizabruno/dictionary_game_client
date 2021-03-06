import React, { useContext, useEffect, useState } from 'react';
import DicionarioContext from './DicionarioContext';
import { For } from 'react-loops'
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Vocabulary from './vocabulary.json';

function DisplayGuesses(props) {

    const room = useContext(DicionarioContext);
    const [guesses, setGuesses] = useState(room.guesses);
    const [numberOfGuesses, setNumberOfGuesses] = useState("");
    const navigate = useNavigate();


    const back = () => {
        navigate("/chooseWord");
    }

    const finish = () => {
        room.guesses = {};
        room.name = "";
        navigate("/");
    }

    useEffect(() => {
        setGuesses(room.guesses);
        setNumberOfGuesses(Object.keys(room.guesses).length);
    }, [room.guesses]);

    return (
        <div className='display-guesses'>
            <p><strong>{Vocabulary[room.language].room}:</strong> "{room.name}"| <strong>{Vocabulary[room.language].players}: </strong> {numberOfGuesses}</p>
            <For in={guesses} as={(guess, {sid}) =>
                <Card variant="outlined" className='guess-card'>
                    <CardContent>
                        <Typography variant="body2">
                        <strong>{guess.word}: </strong><i>"{guess.definition}"</i>
                        </Typography>
                        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                - {guess.user}
                        </Typography>
                        </CardContent>
                </Card>
            }/>
            <div className='buttons-container'>
                <Button variant="outlined" color="primary" onClick={back}><ArrowBackIcon/>{Vocabulary[room.language].back}</Button>
                <Button variant="outlined" color="primary" onClick={finish}><ExitToAppIcon/>{Vocabulary[room.language].finish}</Button>
            </div>
        </div>
    );
}

export default DisplayGuesses;