import { ExternalLinkIcon } from "@chakra-ui/icons";
import { HStack, Link, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <HStack p={3} bg="rgb(96, 255, 167)" justify="center" position='fixed' w='100%' bottom={0}>
      <Text color="white">
        Designed and developed by{" "}
        <Link href="https://github.com/Nishant4coding" isExternal color="cyan.200">
          Nishant <ExternalLinkIcon />
        </Link>{" "}
      </Text>
    </HStack>
  );
};

export default Footer;
