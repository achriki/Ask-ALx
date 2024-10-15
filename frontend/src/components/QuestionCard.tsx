import React from 'react'
import { Box, Text, Avatar, HStack, Tag, TagLabel, Icon, Button } from '@chakra-ui/react';
import { FaHeart, FaRegCommentDots, FaHeartBroken } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import { useUser } from "@clerk/clerk-react";
import QuestionType from '../utils/Tquestion';

type cardProps= {
    question:QuestionType
}
function QuestionCard(props:cardProps) {
    const { user } = useUser()
    const convertDate = ()=>{
        const date = new Date(parseFloat(props.question._creationTime));
        return date.toDateString()
    }
  return (
    <Box
        p={5}
        width="80%"
        mt={2}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        className="bg-white hover:shadow-xl transition-shadow duration-300"
    >
        <HStack spacing={4} alignItems="center" mb={4}>
            <Avatar name={props.question.username} src={props.question.userImage} />
            <Box textAlign="left">
                <Text fontWeight="bold">{props.question.username}</Text>
                <Text fontSize="sm" className="text-gray-500">
                    {convertDate()}
                </Text>
            </Box>
        </HStack>

        {/* Post Title */}
        <Text fontWeight="bold" style={{cursor: 'pointer'}} onClick={()=>{console.log(props.question)}} textAlign='left' className='press-start-2p-regular' fontSize="xl" mb={4}>
            {props.question.title}
        </Text>
        {/* Hashtags */}
        <HStack spacing={2} mb={4}>
            {props.question.tags && props.question.tags.map((tag) => (
                <Tag size="md" key={tag} variant="solid" colorScheme="gray">
                    <TagLabel>{tag}</TagLabel>
                </Tag>
            ))}
        </HStack>

        {/* Reactions and Comments */}
        <HStack justifyContent="space-around" mb={4}>
            <HStack spacing={2}>
                <Icon as={FaHeart} color="red.400" />
                <Text className="text-gray-700">{props.question.likeCount}</Text>
            </HStack>
            <HStack>
                <Icon as={FaHeartBroken} color="gray.500" />
                <Text className="text-gray-500">{props.question.dislikeCount}</Text>
            </HStack>
            <HStack spacing={2}>
                <Icon as={FaRegCommentDots} color="gray.500" />
                <Text className="text-gray-700">Comments</Text>
            </HStack>
        </HStack>
        <Box className="border-t border-gray-200 pt-4">
            <Button variant="link" colorScheme="blue" mt={4}>
                See all comments
            </Button>
        </Box>
    </Box>
  )
}

export default QuestionCard