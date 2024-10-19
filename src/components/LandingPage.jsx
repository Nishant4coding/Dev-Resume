import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Link as ChakraLink,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { BsArrowRightSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import backgroundImage from "../bg.png";
import chakraimg from "../chakraui.png";
import cssimg from "../css.png";
import htmlimg from "../html.png";
import jsimg from "../js.png";
import logo from "../logo.png";
import reactimg from "../react.png";


const LandingPage = () => {
  const token = localStorage.getItem("token");

  const linkColor = useColorModeValue("blue.500", "blue.200");

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
          {
            token ? (
              <Link to="/show">Get Started</Link>
            ) : (
              <Link to="/login">Login to start {">"}</Link>
            )
          }
          </Button>

          <Button
            colorScheme="teal"
            size="md"
            pl={"40px"}
            pr={"40px"}
            marginLeft={"20px"}
            mr={"10px"}
          >{
            token ? (
              <Link to="/user">Profile</Link>
            ) : (
              <Link to="/login">Login {">"}</Link>
            )
          }
            {/* <Link to="/auth">Login/SignUp</Link> */}
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
        <Center h="45vh">
          <Box textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Heading size="2xl" fontWeight={700}>
                Welcome to Dev Resume
              </Heading>
              <Text fontSize="xl" fontWeight={900} mt={4}>
                Create a professional resume in minutes!
              </Text>
              <Button
                mt={"40px"}
                color={"black"}
                backgroundColor={"whatsapp.300"}
                size={"lg"}
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
        <Center>
          <Card
            align={"center"}
            width={"350px"}
            height={"170px"}
            backdropFilter="blur(30px)"
            boxShadow={"0 2px 5px rgba(0, 0, 0, 0.3)"}
          >
            <CardHeader>
              <Heading size="lg">Technology Used</Heading>
            </CardHeader>
            <CardBody>
              <Flex align={"center"}>
                <Image
                  src={reactimg}
                  width={"50px"}
                  ml={"5px"}
                  mr={"5px"}
                ></Image>
                <Image
                  src={chakraimg}
                  width={"50px"}
                  ml={"5px"}
                  mr={"5px"}
                ></Image>
                <Image
                  src={htmlimg}
                  width={"50px"}
                  ml={"5px"}
                  mr={"5px"}
                ></Image>
                <Image
                  src={cssimg}
                  width={"50px"}
                  ml={"5px"}
                  mr={"5px"}
                ></Image>
                <Image src={jsimg} width={"50px"} ml={"5px"} mr={"5px"}></Image>
              </Flex>
            </CardBody>
          </Card>
        </Center>
      </Box>
    </Box>
  );
};

export default LandingPage;
