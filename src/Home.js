import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Vocabulary from './vocabulary.json';
import DicionarioContext from './DicionarioContext';


function Home(props) {

    const room = useContext(DicionarioContext);
    const [language, setLanguage] = useState(room.language);

    useEffect(() => {
        console.log("change");
        room.language =  language;
    }, [language, room]);

    return (
        <div className='home'>
            <Link to="/createRoom"><Button variant="outlined" color="primary">{Vocabulary[language].chooseWordBtnLabel}</Button></Link>
            <Link to="/chooseRoom"><Button variant="outlined" color="primary">{Vocabulary[language].guessDefinitionBtnLabel}</Button></Link>
            <p className='language-btns'><Button variant="text" onClick={() => {setLanguage("pt")}}>Portuguese</Button> <Button variant="text" onClick={() => {setLanguage("en")}}>English</Button></p>
        </div>
    );
}

export default Home;