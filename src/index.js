import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans';
import '@fontsource/poppins';
import LandingPage from './components/LandingPage';
import {BrowserRouter, Routes,Route}  from "react-router-dom";
import ResumeForm from './components/ResumeForm';
import Footer from './components/Footer';


const theme = extendTheme({
  fonts: {
    body: `Poppins, sans-serif`,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      
    
    
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
