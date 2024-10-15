import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const handleSignInRedirect = () => {
    navigate('/signin');
  };

  return (
    <Box
      className="flex flex-col justify-center items-center h-screen bg-gray-50"
      p={5}
    >
      <Heading
        as="h1"
        size="2xl"
        className="text-gray-800 font-bold mb-4"
        textAlign="center"
      >
        Oops! You're not logged in.
      </Heading>
      <Text className="text-gray-600 text-lg mb-6 text-center">
        Please log in to access this page.
      </Text>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignInRedirect}
      >
        Go to Sign In
      </Button>
    </Box>
  );
};

export default Error;
