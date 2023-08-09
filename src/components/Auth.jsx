import React from 'react';
import { Box, Text, Center ,Heading} from '@chakra-ui/react';
import { motion } from "framer-motion";

const Auth = () => {
  return (
    
    <Center h="80vh">
         <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
      <Box margin={"25px"} textAlign={"center"}>
        <Heading fontSize="4xl" textAlign={'center'} fontWeight="bold" mb={4}>
          Coming Soon...
        </Heading>
        <Text fontSize="xl" color="gray.500">
          The login and signup features are currently under development.
          We'll be launching them soon!
        </Text>
      </Box>
      </motion.div>
    </Center>
  );
};

export default Auth;
