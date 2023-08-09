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
  
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactToPrint from "react-to-print";
import backgroundImage from "../bg.png";
import { motion } from "framer-motion";

const ResumeTemplate = (props) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [setpage, setPage] = useState(0);
  const { resumeInfo, page } = props;

  const ref = React.useRef(null);

  const handleNextPage = () => {
    if (setpage < 3) {
      setPage((prevPage) => prevPage + 1);
    } else if (setpage === 2 || setpage > 2) {
      setIsButtonVisible(true);
    }
  };

  return (
    <Box style={{ width: "800px" }}>
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
          {resumeInfo.professional.work &&
          resumeInfo.professional.work.length ? (
            <VStack spacing={4} align="stretch">
              <Heading as="h3" fontSize="xl" borderBottomWidth="1px">
                WORK EXPERIENCE
              </Heading>
              {resumeInfo.professional.work.map((w, i) => {
                return (
                  <VStack align="stretch" key={i}>
                    <HStack justify="space-between" align="baseline">
                      <VStack align="stretch">
                        <Heading as="h5" fontSize="lg">
                          {w.jobTitle}
                        </Heading>
                        <Heading as="h5" fontSize="md">
                          {w.company}
                        </Heading>
                      </VStack>
                      <Heading as="h6" fontSize="md">
                        {w.startDate} &#8212; {w.endDate}
                      </Heading>
                    </HStack>
                    <UnorderedList px="20px">
                      {w.jobDetails.split("\n").map((d, i) => {
                        return d.length ? (
                          <ListItem key={i}>{d}</ListItem>
                        ) : null;
                      })}
                    </UnorderedList>
                  </VStack>
                );
              })}
            </VStack>
          ) : null}

          {resumeInfo.professional.project &&
          resumeInfo.professional.project.length ? (
            <VStack spacing={4} align="stretch">
              <Heading as="h3" fontSize="xl" borderBottomWidth="1px">
                PROJECTS
              </Heading>
              {resumeInfo.professional.project.map((p, i) => {
                return (
                  <VStack align="stretch" key={i}>
                    <HStack justify="space-between" align="baseline">
                      <VStack align="stretch">
                        <Heading as="h5" fontSize="lg">
                          {p.ProjectName}
                        </Heading>
                      </VStack>
                    </HStack>
                    <UnorderedList px="20px">
                      {p.Description.split("\n").map((di, i) => {
                        return di.length ? (
                          <ListItem key={i}>{di}</ListItem>
                        ) : null;
                      })}
                    </UnorderedList>
                  </VStack>
                );
              })}
            </VStack>
          ) : null}

          <VStack spacing={4} align="stretch">
            <Heading as="h3" fontSize="xl" borderBottomWidth="1px">
              EDUCATION
            </Heading>
            {resumeInfo.education.map((e, i) => {
              return (
                <HStack justify="space-between" align="baseline" key={i}>
                  <VStack align="stretch">
                    <Heading as="h5" fontSize="lg">
                      {e.course}
                    </Heading>
                    <Heading as="h5" fontSize="md">
                      {e.college}
                    </Heading>
                  </VStack>
                  <Heading as="h6" fontSize="md">
                    {e.startDate} &#8212; {e.endDate}
                  </Heading>
                </HStack>
              );
            })}
          </VStack>
          {resumeInfo.certification.length ? (
            <VStack spacing={4} align="stretch">
              <Heading as="h3" fontSize="xl" borderBottomWidth="1px">
                CERTIFICATIONS
              </Heading>
              {resumeInfo.certification.map((c, i) => {
                return (
                  <VStack align="stretch" key={i}>
                    <Heading as="h5" fontSize="lg">
                      {c.link}
                    </Heading>
                    <Text>{c.details}</Text>
                  </VStack>
                );
              })}
            </VStack>
          ) : null}
        </Stack>
        <Center>
          <HStack divider={<StackDivider />} pt="24px">
            <Center>
              <Button
                w="max-content"
                colorScheme="blue"
                // isDisabled={page !== 3}
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
                      // isDisabled={page !== 3}
                      onClick={handleNextPage}
                    >
                      Print Resume
                    </Button>
                  )}
                  content={() => ref.current}
                />
              </Center>
            </div>
          </HStack>
        </Center>
      </Box>
      </motion.div>
    </Box>
  );
};

export default ResumeTemplate;
