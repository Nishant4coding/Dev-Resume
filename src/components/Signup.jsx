import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Signup = (props) => {

  const navigate = useNavigate();
    const [credentials, setCredentials]= useState({name :"" ,email:"", password:"", cpassword:""})

    const handleSubmit = async (e) => {
      e.preventDefault();
      const {name,email,password}= credentials;
      if(password != credentials.cpassword){
        props.showAlert("error","Password and Confirm password mismatch");
        return;
      }
      const response = await fetch("http://localhost:5000/api/auth/createuser",{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({name,email,password})
      });
      const json= await response.json()
      
      console.log(json)
      if(json.success){
        localStorage.setItem('token',json.authtoken);
        //redirect
        navigate("/");
        props.showAlert("success","Account Created Successfully");
      }
      else{
        let e= json.error;
        if(json.error== undefined){
          e="Invalid Information"
        }
        props.showAlert("error",e);
      }
    };
    const onChange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value });
    };

  return (
    <div className="content" >
       <Link className="back" to="/about">
      <i  style={{
          fontSize: "25px",
         
          fontFamily: " FontAwesome",
        }} className="fa fa-arrow-left"></i>
      </Link>
        <span className="invoiceF">Sign Up</span>
        <form id="loginFrame" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            // onBlur={onBlur}
            id="name"
            name="name"
            // value={invoice.title}
            onChange={onChange}
            placeholder="Enter your Name.."
          /><br/>

          <label style={{lineHeight:"80px"}} htmlFor="email">E-mail:</label>
          <input
            type="email"
            // onBlur={onBlur}
            id="email"
            name="email"
            // value={invoice.title}
            onChange={onChange}
            placeholder="Enter your email.."
          />
          <br/>
          {/* <br/> */}
          
          <label htmlFor="password" style={{lineHeight:"50px"}}>Password:</label>
          <input style={{marginBottom:"30px"}}
            type="password"
            name="password"
            id="password"
            // value={invoice.tag}
            onChange={onChange}
            placeholder="type password"
            required
            minLength={5}
          />
          <br />
          <label htmlFor="cpassword" style={{lineHeight:"50px"}}> Re-enter:</label>
          <input style={{marginBottom:"30px"}}
            type="password"
            name="cpassword"
            id="cpassword"
            // value={invoice.tag}
            onChange={onChange}
            placeholder="confirm password"
            required
            minLength={5}
          />
          <br />
        
          {/* <br /> */}
          {/* <div className="atleast"><small style={{marginTop:"0px",}}>*Enter atleast 5 characters</small></div> */}

          <button  type="submit">
          Signup
          </button>
          
        </form>
        <Footer/>
      </div>
  )
}

export default Signup
