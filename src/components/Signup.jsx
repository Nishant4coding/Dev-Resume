import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import Footer from "./Footer";
import { signupUser } from "../store/Auth/authSlice";

const Signup = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState(null);
  const [ setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = credentials;
    if (password !== credentials.cpassword) {
      setError("Password and Confirm password mismatch");
      return;
    }
  
    // Dispatch the signupUser thunk
    dispatch(signupUser({ name, email, password })).then((response) => {
      if (response && response.payload && response.payload.success) {
        const { authtoken } = response.payload;
        localStorage.setItem('token', authtoken);
        console.log("Signup successful");
        navigate("/");
        props.showAlert("success", "Account Created Successfully");
      } else {
        setError(response?.payload?.message || "Invalid Information");
      }
    }).catch((error) => {
      console.error("Error during signup:", error);
      setError("An error occurred during signup.");
    });
    setLoading(false); 
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Box maxW="lg" mx="auto" mt={8} p={6} boxShadow="lg" rounded="md" bg="white">
      <Link to="/about">
        <Button variant="link" colorScheme="blue" mb={4}>
          <i className="fa fa-arrow-left" style={{ marginRight: "8px" }}></i>
          Back
        </Button>
      </Link>

      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Sign Up
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={onChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={onChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={onChange}
              minLength={5}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="cpassword">Confirm Password</FormLabel>
            <Input
              id="cpassword"
              name="cpassword"
              type="password"
              placeholder="Re-enter your password"
              value={credentials.cpassword}
              onChange={onChange}
              minLength={5}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            mt={4}
            w="full"
          >
            Sign Up
          </Button>
        </VStack>
      </form>

      <Footer />
    </Box>
  );
};

export default Signup;
