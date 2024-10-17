import React, { useState } from 'react'
import CommentType from '../utils/Tcomment'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'
import axios from 'axios'
import {
    Box,
    Text,
    VStack,
    HStack,
    Avatar,
    Input,
    Button,
    IconButton,
    Divider,
    useToast
} from '@chakra-ui/react'
import { useAuth, useSignIn } from '@clerk/clerk-react'
import { FiHeart, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi'
import { FaHeartBroken, FaHeart } from 'react-icons/fa'
  
interface commentProps {
    comment: CommentType
}
function Comment(props:commentProps) {
    const [like, setLike] = useState<boolean>(false)
    const [dislike, setDislike] = useState<boolean>(false)
    const [likeCount, setLikeCount] = useState<number>(props.comment.likeCount)
    const [dislikeCount, setDislikeCount] = useState<number>(props.comment.dislikeCount)
    const { isSignedIn } = useAuth()
    const toast = useToast()
    const endpoint_url = process.env.REACT_APP_ENDPOINT_URL
    const convertDate = ()=>{
        const date = new Date(parseFloat(props.comment._creationTime));
        return date.toDateString()
    }

    const handleLike = async ()=>{
        if(!isSignedIn){
          return  toast({
            title: 'Alert ',
            description: "Sign In to like the question",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
        try{
          const request = await axios.post(`${endpoint_url}/cLike`, { _id: props.comment._id })
          if(request.status === 200){
            toast({
              title: 'Success ',
              description: "You liked the question",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            setLikeCount(likeCount + 1)
            setLike(!like)
          }
        }catch(err){
          console.log(err)
          toast({
            title: 'Alert ',
            description: "Server error",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      }
  
      const handleDislike = async ()=>{
        if(!isSignedIn){
          return toast({
            title: 'Alert ',
            description: "Sign In to dislike the question",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
        try{
          const request = await axios.post(`${endpoint_url}/cDislike`, { _id: props.comment._id })
          if(request.status === 200){
            toast({
              title: 'Success ',
              description: "You liked the question",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            setDislikeCount(dislikeCount + 1)
            setDislike(!dislike)
          }
        }catch(err){
          toast({
            title: 'Alert ',
            description: "Server error",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      }
  return (
    <Box key={props.comment._id} p={4} borderWidth="1px" borderRadius="md" bg="gray.50" width="70%" className=' mt-5 ml-5 hover:shadow-xl transition-shadow duration-300'>
        <HStack justify="space-between" align="center">
            <HStack>
            <Avatar name={props.comment.username} size="sm" src={props.comment.userImage} />
            <VStack spacing={0} align="start">
                <Text fontWeight="bold" fontSize="sm">
                    {props.comment.username}
                </Text>
                <Text fontSize="xs" color="gray.500">
                    {convertDate()}
                </Text>
            </VStack>
            </HStack>
            <IconButton
            aria-label="More options"
            icon={<FiMoreHorizontal />}
            size="sm"
            variant="ghost"
            />
        </HStack>
        <Text mt={2} fontSize="sm" textAlign="left">
        {
            props.comment.comment &&(
                <FroalaEditorView model={props.comment.comment} />
            )
        }
        </Text>
        <HStack mt={2} spacing={4}>
            <HStack spacing={1}>
                <IconButton
                    aria-label="Like"
                    icon={like ? <FaHeart color='red' /> : <FiHeart />}
                    size="sm"
                    variant="ghost"
                    onClick={handleLike}
                />
                <Text fontSize="xs">{likeCount} likes</Text>
            </HStack>
            <HStack spacing={1}>
                <IconButton
                    aria-label="Like"
                    icon={<FaHeartBroken color={dislike ? 'red' : ''}  /> }
                    size="sm"
                    variant="ghost"
                    onClick={handleDislike}

                />
                <Text fontSize="xs">{dislikeCount} dislike</Text>
            </HStack>
        </HStack>
    </Box>
  )
}

export default Comment