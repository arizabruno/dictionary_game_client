import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home(props) {
    return (
        <div className='home'>
            <Link to="/createRoom"><Button variant="outlined" color="primary">Escolher Palavra</Button></Link>
            <Link to="/chooseRoom"><Button variant="outlined" color="primary">Advinhar definição</Button></Link>
        </div>
    );
}

export default Home;