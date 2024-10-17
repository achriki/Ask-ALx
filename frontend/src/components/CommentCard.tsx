import React, { useEffect, useState } from 'react'
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
  useToast,
} from '@chakra-ui/react';
import { FiHeart, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi'
import TextEditor from './TextEditor'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'

interface CommentCardProps {
  userImage: string;  // Ensure this is typed as a string
  qId: string;
}

function CommentCard(props:CommentCardProps) {
  const [modal, setModel] = useState<string>("")
  const {user} = useUser()
  const toast = useToast()
  const endpoint_url = process.env.REACT_APP_ENDPOINT_URL

  const handleComment = async ()=>{
    const commentObj = {
      comment: modal,
      publisherId: user?.id,
      username: user?.username,
      userImage: user?.imageUrl,
      likeCount:0,
      dislikeCount: 0,
      questionId: props.qId
    }

    const request = await axios.post(`${endpoint_url}/pushComment`,{
      commentPayload: commentObj
    })

    if(request.status === 201){
      toast({
        title: 'Success ',
        description: "Your comment has been published",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      window.location.reload();
    }
  }
  return (
    <Box>
      <HStack mb={4} alignItems="flex-start" className='mt-5 ml-5' maxW='70%'>
          <Avatar name={"User"} size="sm" src ={props.userImage} />
          <TextEditor setModelContent={setModel} />
      </HStack>
      <Box className='flex flex-col justify-start' style={{display: modal ? 'block': 'none'}}>
        <Button colorScheme={modal ? "blue":"gray"} style={{pointerEvents: modal ?'auto':'none', width:"70px" }} className='ml-5' onClick={handleComment}>
          Post
        </Button>
      </Box>
      
    </Box>
    
  )
}

export default CommentCard