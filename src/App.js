import { Switch } from "@chakra-ui/react";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ResumeForm from "./components/ResumeForm";
import React from "react";
import { BrowserRouter , Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
  {/* <BrowserRouter  basename={window.location.pathname || ''}> */}
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/show" element={<ResumeForm />} />
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
      
    </div>
  );
}

export default App;
