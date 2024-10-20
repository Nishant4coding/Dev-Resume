import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Stack,
  Grid,
  GridItem,
  Button,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, logoutUser } from "../store/Users/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, error, loading } = useSelector((state) => state.user);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile(token)); 
    }
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text fontSize="lg" color="red.500">
          {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Box p={5}>
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        {/* Sidebar */}
        <GridItem colSpan={[6, 2, 2]} bg="gray.100" p={5} borderRadius="lg">
          <Flex direction="column" align="center">
            <Avatar size="2xl" name={profileData?.name} mb={4} />
            <Heading size="lg">{profileData?.name}</Heading>
            <Text fontSize="md" color="gray.500">
              {profileData?.email}
            </Text>
            <Button mt={5} colorScheme="teal" width="100%">
              Edit Profile
            </Button>
            <Button
              mt={2}
              colorScheme="red"
              width="100%"
              onClick={() => {
                dispatch(logoutUser());
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Flex>
        </GridItem>

        {/* Main Dashboard */}
        <GridItem
          colSpan={[6, 4, 4]}
          p={5}
          bg="white"
          shadow="md"
          borderRadius="lg"
        >
          <Heading size="md" mb={5}>
            Dashboard
          </Heading>
          <Divider mb={4} />

          <Flex mb={5} justify="space-between" flexWrap="wrap">
            <Box p={5} bg="teal.100" borderRadius="lg" width="48%" mb={4}>
              <Text fontSize="lg" fontWeight="bold">
                Joined On
              </Text>
              <Text>{new Date(profileData?.date).toLocaleDateString()}</Text>
            </Box>

            <Box p={5} bg="blue.100" borderRadius="lg" width="48%" mb={4}>
              <Text fontSize="lg" fontWeight="bold">
                Last Login
              </Text>
              <Text>{new Date().toLocaleDateString()}</Text>
            </Box>
          </Flex>

          <Heading size="md" mb={4}>
            Recent Activities
          </Heading>
          <Stack spacing={3}>
            <Box p={4} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold">Uploaded Resume</Text>
              <Text fontSize="sm" color="gray.600">
                2 days ago
              </Text>
            </Box>
            <Box p={4} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold">Profile Updated</Text>
              <Text fontSize="sm" color="gray.600">
                5 days ago
              </Text>
            </Box>
            <Box p={4} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold">Changed Password</Text>
              <Text fontSize="sm" color="gray.600">
                1 week ago
              </Text>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Profile;
