import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/Auth/authSlice";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .then((response) => {
        if (response && response.payload) {
          const { success, authtoken } = response.payload;

          if (success) {
            // Store the token in localStorage
            localStorage.setItem("token", authtoken);
            console.log("Login successful");

            // Navigate to the home page
            navigate("/");
          } else {
            console.log(response.payload.message);
          }
        }
      })
      .catch((error) => {
        console.error("Error during Login:", error);
        console.log("An error occurred during Login.");
      });
  };

  return (
    <Box
      w="100%"
      maxW="400px"
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      mx="auto"
      mt="10%"
    >
      <VStack spacing={6}>
        <Heading size="lg">Login</Heading>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={loading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </VStack>
        </form>

        {/* Only show the error message if there's an error */}
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Text>
          Don't have an account? <Link to="/signup"> Sign up!</Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
