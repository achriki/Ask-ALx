import React from 'react'
import { Box, Text, Button, HStack, VStack } from '@chakra-ui/react'
import TagsType from '../utils/Ttags'
import { useNavigate } from 'react-router-dom'

interface tagsProps {
    tag: TagsType
}

function TagCard(props:tagsProps) {
  const navigate = useNavigate()
  const handleNavigation= ()=>{
    navigate(`/tags/${props.tag.name}`)
  }
  return (
    <Box
        className="bg-white shadow-lg rounded-lg p-4 "
        border="1px"
        borderColor="gray.200"
        maxW="sm"
    >
    <VStack align="start" spacing={2}>
        <HStack justify="space-between" width="100%">
          <Text fontWeight="bold " fontSize="md" className="text-gray-900 press-start-2p-regular">
            {props.tag.name}
          </Text>
        </HStack>
        {/* Description */}
        <Text fontSize="sm" className="text-gray-700 m-5">
          {props.tag.description}
        </Text>
        {/* Buttons */}
        <HStack spacing={4}>
          <Button colorScheme="blue" onClick={handleNavigation} size="sm" className="font-bold">
            questions
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default TagCard