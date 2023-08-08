import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Spacer,
  Text,
  Heading,
  Center,
  Link as ChakraLink,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "../logo.png";
import { motion } from "framer-motion";
import backgroundImage from "../bg.png";
import { BsArrowRightSquare } from "react-icons/bs";

const LandingPage = () => {
  const linkColor = useColorModeValue("blue.500", "blue.200");
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box>
      <Box py={4} bg={"green.300"} shadow="md">
        <Flex align="center" maxW="container.xl" m="auto">
          <ChakraLink
            as={Link}
            to="/"
            color={linkColor}
            mr={6}
            fontWeight="bold"
            fontSize="xl"
          >
            <Image width={"300px"} src={logo} />
          </ChakraLink>
          <Spacer />
          <Button colorScheme="teal" size="md" pl={"30px"} pr={"30px"}>
            <Link to="./show">Get Started</Link>
          </Button>

          <Button colorScheme="teal" size="md" pl={"40px"} pr={"40px"} marginLeft={"20px"} mr={"10px"}>
            <Link to="#">Login/SignUp</Link>
          </Button>
        </Flex>
      </Box>
      <Box
        h="80vh"
        bgRepeat={"no-repeat"}
        bgImage={`url(${backgroundImage})`}
        bgColor={"blackAlpha.100"}
        w="100%"
      >
        <Center h="70vh">
          <Box textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Heading size="2xl">Welcome to Dev Resume</Heading>
              <Text fontSize="xl" mt={4}>
                Create a professional resume in minutes!
              </Text>
              <Button
                mt={"80px"}
                colorScheme="whatsapp"
                size={"lg"}
                variant={"outline"}
              >
                <Link
                  to="/show"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "30px",
                  }}
                >
                  <span>Get Started</span>
                  <BsArrowRightSquare
                    size={30}
                    style={{ marginLeft: "10px" }}
                  />
                </Link>{" "}
              </Button>
            </motion.div>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default LandingPage;
