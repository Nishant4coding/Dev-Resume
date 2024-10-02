import { PhoneIcon } from "@chakra-ui/icons";
import {
  Text,
  Center,
  Heading,
  HStack,
  Stack,
  Link,
  VStack,
  UnorderedList,
  ListItem,
  StackDivider,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactToPrint from "react-to-print";
import { motion } from "framer-motion";

const ResumeTemplate = (props) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [setpage, setPage] = useState(0);
  const [email, setEmail] = useState(""); // State to store the email address
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { resumeInfo } = props;
  const ref = React.useRef(null);

  const handleNextPage = () => {
    if (setpage < 3) {
      setPage((prevPage) => prevPage + 1);
    } else if (setpage === 2 || setpage > 2) {
      setIsButtonVisible(true);
    }
  };

  const handleSendEmail = async () => {
    // Convert the resume to PDF using ReactToPrint's reference
    const resumeHtml = ref.current.innerHTML;
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyPDyc8-_201bkVajs-QisFfa6cAI91J4fA_MvEbwYTALNlgRL_JTplMhhoDHZgssaH4Q/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'no-cors',
        body: JSON.stringify({
          email,
          resumeContent: resumeHtml,
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        toast({
          title: "Email Sent",
          description: "The resume has been sent to your email address.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Box style={{ width: "100%" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          border={"2px solid black"}
          padding={"20px"}
          borderRadius={"20px"}
          width={"100%"}
        >
          <Stack spacing={4} ref={ref} m={6} fontFamily="sans-serif">
            {/* Resume Content */}
            <Stack spacing={1}>
              <Center>
                <Heading as="h1">
                  {resumeInfo.profile.firstname} {resumeInfo.profile.lastname}
                </Heading>
              </Center>
              <Center>
                <HStack
                  justify="center"
                  wrap="wrap"
                  divider={<StackDivider borderColor="gray.500" />}
                >
                  {resumeInfo.profile.email.length ? (
                    <Link
                      href={resumeInfo.profile.email}
                      isExternal
                      color="blue.500"
                    >
                      {" "}
                      {resumeInfo.profile.email}{" "}
                    </Link>
                  ) : null}
                  {resumeInfo.profile.linkedin.length ? (
                    <Link
                      href={resumeInfo.profile.linkedin}
                      isExternal
                      color="blue.500"
                    >
                      {" "}
                      Linkedin{" "}
                    </Link>
                  ) : null}
                  {resumeInfo.profile.github.length ? (
                    <Link
                      href={resumeInfo.profile.github}
                      isExternal
                      color="blue.500"
                    >
                      {" "}
                      Github{" "}
                    </Link>
                  ) : null}
                  {resumeInfo.profile.website.length ? (
                    <Link
                      href={resumeInfo.profile.website}
                      isExternal
                      color="blue.500"
                    >
                      {" "}
                      Portfolio{" "}
                    </Link>
                  ) : null}
                </HStack>
              </Center>
              <HStack justify="center">
                <address>
                  <PhoneIcon /> {resumeInfo.profile.phone} &nbsp;
                  {resumeInfo.profile.address}
                </address>
              </HStack>
            </Stack>
            <VStack spacing={2} align="stretch">
              <Heading as="h3" fontSize="xl" borderBottomWidth="1px">
                SUMMARY
              </Heading>
              <Text>{resumeInfo.professional.summary}</Text>
            </VStack>
            <VStack spacing={4} align="stretch">
              <Heading as="h3" fontSize="xl" borderBottomWidth="1px">
                SKILLS
              </Heading>
              <UnorderedList px="20px">
                {resumeInfo.professional.skills.split("\n").map((s, i) => (
                  <ListItem key={i}>{s.trim()}</ListItem>
                ))}
              </UnorderedList>
            </VStack>
            {/* Other resume sections go here */}
          </Stack>
          <Center>
            <HStack divider={<StackDivider />} pt="24px">
              <Center>
                <Button
                  w="max-content"
                  colorScheme="blue"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Create New
                </Button>
              </Center>

              <div>
                <Center>
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        colorScheme="whatsapp"
                        w="max-content"
                        onClick={handleNextPage}
                      >
                        Print Resume
                      </Button>
                    )}
                    content={() => ref.current}
                  />
                </Center>
              </div>

              <Center>
                <Button
                  colorScheme="teal"
                  w="max-content"
                  onClick={onOpen}
                >
                  Send to Email
                </Button>
              </Center>
            </HStack>
          </Center>
        </Box>
      </motion.div>

      {/* Modal for Email Input */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Email Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSendEmail}>
              Send
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ResumeTemplate;
