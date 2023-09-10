import './App.css';
import React, {useState } from 'react'
import {
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './componenets/Navbar';
import Home from './componenets/Home';
import About from './componenets/About';
import NoteState from './context/notes/NotesState';
import Alert from './componenets/Alert';
import Login from './componenets/Login';
import Signup from './componenets/Signup';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
