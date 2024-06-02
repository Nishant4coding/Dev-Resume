import {
  Box,
  VStack,
  Center,
  Heading,
  Progress,
  Stack,
  HStack,
  Button,
  Text,
  Input,
  FormLabel,
  FormControl,
  SimpleGrid,
  FormHelperText,
} from "@chakra-ui/react";
import { Icon, createIcon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import BasicDetails from "./BasicDetailsForm";
import EduacationDetails from "./EducationDetails";
import ProfessionalDetails from "./ProfessionalDetailsForm";
import ResumeTemplate from "./ResumeTemplate";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";


const ResumeForm = () => {
  const [page, setPage] = useState(0);
  const [isMobile] = useMediaQuery("(max-width: 798px)");

  const initialState = {
    profile: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
      website: "",
      address: "",
    },
    professional: {
      summary: "",
      skills: "",
      work: [],
      project: [],
    },
    education: [],
    certification: [],
  };

  const [resumeInfo, setResumeInfo] = useState(initialState);
  const [isSaved, setIsSaved] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition((page + 0.5) * (100 / 3)); // Adjust the multiplier (50) to control the distance between numbers
  }, [page]);

  const formPage = [
    "Profile Details",
    "Professional Experience",
    "Educational Details",
  ];

  const handleSave = () => {
    setIsSaved(true);
    if (page < 2) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderForm = () => {
    switch (page) {
      case 0:
        return (
          <BasicDetails
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );
      case 1:
        return (
          <ProfessionalDetails
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );
      case 2:
        return (
          <EduacationDetails
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            setPage={setPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Stack mb="50px">
      <Center
        style={{ display: page === 3 ? "none" : "flex" }}
        w="100%"
        px="12px"
        flexDir="column"
        position="relative"
      >
        <Box w="60%" borderRadius="lg">
          <Box
            w="100%"
            bg="white"
            position="fixed"
            top="0"
            left="0"
            p="4"
            boxShadow="md"
            zIndex="10000"
          >
            <Box
              zIndex="10000"
              position="fixed"
              alignItems="center"
              justifyContent="center"
              left="18%"
              top="30px"
              height="10px"
              width="65%"
              borderRadius="full"
              marginBottom="200px"
              backgroundColor="teal.500"
            />
            <Box
              zIndex="10000"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              width="40px"
              height="40px"
              bg="teal.500"
              color="white"
              fontWeight="bold"
              fontSize="lg"
              left={`${position}%`}
              transition="left 0.3s ease-in-out"
              position="relative"
            >
              <Text>{page + 1}</Text>
            </Box>
            <Box>
              <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              >
              <Center>
                <Link to="/">
                  <FaHome style={{ fontSize: "25px" }} />
                </Link>{" "}
                <span style={{ fontWeight: "800", cursor: "pointe" }}>
                  {" "}
                  &nbsp; Home
                </span>
              </Center>
                </motion.div>
            </Box>
          </Box>
        </Box>
      </Center>
      {isMobile ? (
        <HStack p={0} spacing={0} justify="center">
          <VStack
            justify="center"
            spacing={4}
            width="90%"
            style={{ display: page === 3 ? "none" : "block" }}
          >
            <Box
              marginTop="100px"
              p={4}
              borderRadius="lg"
              bg="rgb(0, 255, 128)"
              color="black"
              boxShadow="xl"
              rounded="md"
            >
              <Center>
                <Heading mb={4}>{formPage[page]}</Heading>
              </Center>
              {renderForm()}
              {page === 2 && (
                <Center mt={6}>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      handleSave();
                      setPage((p) => p + 1);
                    }}
                  >
                    View
                  </Button>
                </Center>
              )}
            </Box>
          </VStack>
          {page === 3 && (
            <VStack style={{ display: page === 3 ? "block" : "none" }}>
              <ResumeTemplate resumeInfo={resumeInfo} page={page} />
            </VStack>
          )}
        </HStack>
      ) : (
        <HStack p={4} spacing={3} align="stretch" justify="center">
          <VStack
            justify="center"
            spacing={4}
            width="100%"
            style={{ display: page === 3 ? "none" : "block" }}
          >
            <Box
              marginTop="80px"
              p={8}
              borderRadius="lg"
              bg="rgb(0, 255, 128)"
              color="black"
              boxShadow="xl"
              rounded="md"
            >
              <Center>
                <Heading mb={4}>{formPage[page]}</Heading>
              </Center>
              {renderForm()}
              {page === 2 && (
                <Center mt={6}>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      handleSave();
                      setPage((p) => p + 1);
                    }}
                  >
                    View
                  </Button>
                </Center>
              )}
            </Box>
          </VStack>
          {isSaved && (
            <VStack style={{ width: page === 2 ? "80%" : "50%" }}>
              <ResumeTemplate resumeInfo={resumeInfo} page={page} />
            </VStack>
          )}
        </HStack>
      )}
    </Stack>
  );
};

export default ResumeForm;
