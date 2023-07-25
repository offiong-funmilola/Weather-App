import React from "react";
import Menu from './Components/Menu'
import Main from './Components/Main';
import {WeatherProvider} from './Context/WeatherContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <WeatherProvider>
      <div className="w-full h-screen bg-hero-pattern bg-cover bg-no-repeat content-container">
        <ToastContainer />
        <Menu/>
        <Main/>
      </div>
    </WeatherProvider>
  );
}

export default App;
