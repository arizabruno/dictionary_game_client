import './App.css';
import React, { useEffect, useState } from "react";
import Home from './Home';
import {BrowserRouter, Routes,Route,} from "react-router-dom";
import CreateRoom from './CreateRoom';
import ChooseWord from './ChooseWord';
import ChooseRoom from './ChooseRoom';
import GuessDefinition from './GuessDefinition';
import { Alert, Snackbar } from '@mui/material';
import io from 'socket.io-client';
import { DicionarioProvider } from './DicionarioContext';
import Room from './models/Room';
import DisplayGuesses from './DisplayGuesses';

const socket = io.connect("https://dictionarium-app.herokuapp.com");

function App() {

  const room = new Room();
  const [openToast, setOpenToast] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  useEffect(() => {
    socket.on("status", (status) => {
      setOpenToast(true);
      setStatusMessage(status.msg);
    });
  }, []);

  return (

  <DicionarioProvider value={room}>
    <BrowserRouter>
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createRoom" element={<CreateRoom socket={socket}/>}/>
          <Route path="/chooseWord" element={<ChooseWord socket={socket}/>}/>
          <Route path="/chooseRoom" element={<ChooseRoom socket={socket}/>}/>
          <Route path="/guessDefinition" element={<GuessDefinition socket={socket}/>}/>
          <Route path="/displayGuesses" element={<DisplayGuesses socket={socket}/>}/>
        </Routes>
        <Snackbar open={openToast} autoHideDuration={2000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          {statusMessage}
        </Alert>
    </Snackbar>
      </div>
    </BrowserRouter>
  </DicionarioProvider>
  
  );
}

export default App;
