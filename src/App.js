import { Switch } from "@chakra-ui/react";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ResumeForm from "./components/ResumeForm";
import React from "react";
import { BrowserRouter , Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";

function App() {
  return (
    <div>
  {/* <BrowserRouter  basename={window.location.pathname || ''}> */}
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/show" element={<ResumeForm />} />
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
    <Footer/>
      
    </div>
  );
}

export default App;
