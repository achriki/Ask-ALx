import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Box, Avatar, Text, VStack, HStack, Badge, Heading, IconButton, useToast, Toast, Divider } from '@chakra-ui/react'
import { FiHeart, FiMessageCircle, FiBookmark } from 'react-icons/fi'
import { FaHeart, FaHeartBroken, FaBookmark } from 'react-icons/fa'
import { EventsBar } from '../components'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'
import Logo from '../images/ask_alx_logo_60.png'
import { useNavigate } from 'react-router-dom'
import { useAuth, useSignIn } from '@clerk/clerk-react'
import axios from 'axios'
import {CommentCard} from '../components'
import CommentType from '../utils/Tcomment'
import Comment from '../components/Comment'
import QuestionType from '../utils/Tquestion'

const ContentModel = ({question, convertDate}: any)=>(
    <Box className="w-full bg-white shadow-md rounded-lg p-6 ml-5 mx-auto " maxW="85%">
        {/* User Info Section */}
      <HStack spacing={4} alignItems="center">
        <Avatar
          size="md"
          name={question.username}
          src={question.userImage} 
        />
        <VStack align="flex-start" spacing={0}>
          <Text className="font-bold text-gray-800">{question.username}</Text>
          <Text className="text-sm text-gray-500">{convertDate()}</Text>
        </VStack>
      </HStack>
       {/* Reactions */}
       {/* <HStack spacing={2} mt={4}>
        <HStack spacing={1}>
          <Text>❤️</Text><Text className="text-gray-700">{question.likeCount}</Text>
        </HStack>
        <HStack spacing={1}>
          <Text>🙀</Text><Text className="text-gray-700">{question.dislikeCount}</Text>
        </HStack>
      </HStack> */}

      {/* Title */}
      <Heading as="h1" className="text-left text-2xl font-bold mt-4 mb-2  ">
        {question.title}
      </Heading>
      {/* Hashtags */}
      <HStack spacing={2} mb={5}>
        {
            question.tags && question.tags.map((tag:string, index:number)=>(
                <Badge size="md" key={tag} variant="solid" p={1} colorScheme="green">#{tag}</Badge>
            ))
        }
      </HStack>
      <Box className="text-gray-700 text-left">
        {
            question.content&&(
                <FroalaEditorView model={question.content} />
            )
        }
      </Box>
    </Box>
)

const SideBar= ({handleLike, handleDislike, handleSave, like, dislike, likeCount, dislikeCount, commentCount, saveStatus}:any)=>(
    <VStack ml={1} alignItems="center" spacing={4}>
        {/* Like Button */}
        <Box textAlign="center">
          <IconButton
            aria-label="Like"
            icon={like ? <FaHeart color='red' style={{pointerEvents: 'none'}} /> : <FiHeart />}
            size="lg"
            variant="ghost"
            onClick={handleLike}
            className="hover:bg-gray-100"
          />
          <Text fontSize="sm" className="text-gray-700">{likeCount}</Text>
        </Box>

        {/* Dislike Button */}
        <Box textAlign="center">
          <IconButton
            aria-label="Dislike"
            icon={<FaHeartBroken style={{color: dislike ? 'red':''}} />}
            size="lg"
            variant="ghost"
            onClick={handleDislike}
            className="hover:bg-gray-100"
          />
          <Text fontSize="sm" className="text-gray-700">{dislikeCount}</Text>
        </Box>

        {/* Comment Button */}
        <Box textAlign="center">
          <IconButton
            aria-label="Comment"
            icon={<FiMessageCircle />}
            size="lg"
            variant="ghost"
            className="hover:bg-gray-100"
          />
          <Text fontSize="sm" className="text-gray-700">{commentCount}</Text>
        </Box>

        {/* Bookmark Button */}
        <Box textAlign="center">
          <IconButton
            aria-label="Save"
            icon={saveStatus ? <FaBookmark color='blue' style={{pointerEvents: 'none'}} /> : <FiBookmark />}
            size="lg"
            variant="ghost"
            onClick={handleSave}
            className="hover:bg-gray-100"
          />
        </Box>
      </VStack>
)

function QuestionView() {
    const {_id} = useParams()
    const location = useLocation()
    // const {question} = location.state
    const navigate = useNavigate()
    const { isSignedIn } = useAuth()
    const {user} = useUser()
    const toast = useToast()
    const endpoint_url = process.env.REACT_APP_ENDPOINT_URL
    const [like, setLike] = useState<boolean>(false)
    const [dislike, setDislike] = useState<boolean>(false)
    const [saveStatus, setSaveStatus] = useState<boolean>(false)
    const [likeCount, setLikeCount] = useState<number>(0);
    const [dislikeCount, setDislikeCount] = useState<number>(0);
    const [comments, setComments] = useState<Array<CommentType>>([])


    const [question, setQuestion] = useState<QuestionType>()
    useEffect(()=>{
      const getQuestion = async ()=>{
        const reqQ = await axios.post(`${endpoint_url}/question`, {id: _id})
        if(reqQ.status === 200){
          setQuestion(reqQ.data.question)
          setLikeCount(reqQ.data.question.likeCount)
          setDislikeCount(reqQ.data.question.dislikeCount)
        }
        else{
          return toast({
            title: 'Alert',
            status: 'error',
            description: 'question doesn\'t exist',
            duration: 9000,
            isClosable: true,   
          })
        }
      }
      
      getQuestion()
    },[])

    useEffect(()=>{
      const handleComments = async ()=>{
        const request = await axios.post(`${endpoint_url}/comments`,{
          _id: _id
        })

        if(request.status === 200){
          console.log(request.data.comments)
          setComments(request.data.comments)
        }
      }

      handleComments()

    },[_id, question])

    const convertDate = ()=>{
        const date = new Date(parseFloat(question?._creationTime || ""));
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
        console.log(like)
        const request = await axios.post(`${endpoint_url}/qLike`, { _id })
        if(request.status === 200){
          toast({
            title: 'Success ',
            description: "You liked the question",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })

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
        console.log(dislike)
        const request = await axios.post(`${endpoint_url}/qDislike`, { _id })
        if(request.status === 200){
          toast({
            title: 'Success ',
            description: "You liked the question",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })

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

    const handleSave = async ()=>{
      if(!isSignedIn){
        return toast({
          title: 'Alert ',
          description: "Sign In to save the question",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      try{
        const request = await axios.post(`${endpoint_url}/saveQ`, {externalId: user?.id, _Qid: _id })
        console.log(user?.id)
        if(request.status === 200){
          toast({
            title: 'Success ',
            description: "You liked the question",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })

          setSaveStatus(!saveStatus)
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

    const handleNavigation = ()=>{
        navigate("/")
    }

  return (
    
    <Box className='w-full min-h-screen'>
        <div className="header flex items-center justify-start">
            <div className="flex w-full items-center justify-around ">
                <img style={{cursor: 'pointer'}} onClick={handleNavigation} src={Logo} alt="app_logo_60_px" />
                <h1 className='press-start-2p-regular'>Question</h1>
                <div className="signI">
                    <SignedOut>
                        <SignInButton forceRedirectUrl={`/question/${_id}`} >
                            <button className='signInBtn'>
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton></UserButton>
                    </SignedIn>
                </div>
            </div>
        </div>
        <Box className="w-full rounded-lg p-6 max-w-full flex justify-around">
            <SideBar question={question} handleLike={handleLike} handleDislike={handleDislike} handleSave={handleSave} like={like} dislike={dislike} likeCount ={likeCount} dislikeCount={dislikeCount} commentCount={comments.length} saveStatus={saveStatus} />
            <Box flex="1" className='w-full'>
                {question && <ContentModel question={question} convertDate={convertDate}/>}
                <HStack justify="space-between" mb={4} ml={5} mt={5}>
                  <Text fontWeight="bold" id='comments' className='press-start-2p-regular'>Comments</Text>
                </HStack>
                {
                  isSignedIn ?  <CommentCard userImage={user?.imageUrl || ""}  qId={_id || ""} /> : (
                    <Box maxW="70%" className=' h-32 flex flex-col rounded-lg justify-center items-center bg-white shadow-md   mt-5 ml-5 hover:shadow-xl transition-shadow duration-300'>
                      <Text className='mb-5 text-xl'>
                        Please Sign in to post your comment
                      </Text>
                      <SignInButton forceRedirectUrl={`/question/${_id}`} >
                            <button className='signInBtn'>
                                Sign In
                            </button>
                        </SignInButton>
                    </Box>
                  )
                }
                <Divider mt={5} />
                {
                  comments.length > 0 ? comments.map((comment)=>(
                      <Comment comment={comment} />
                  )):
                  <Box maxW="70%"  className='h-32 flex flex-col rounded-lg justify-center items-center bg-white shadow-md   mt-5 ml-5 hover:shadow-xl transition-shadow duration-300'>
                      <Text className='mb-5 text-xl'>
                        No comments yet on this post, be the first !
                      </Text>
                  </Box>
                }
            </Box>
            <Box style={{maxWidth: '300px'}}>
                <EventsBar />
            </Box>
        </Box>
    </Box>
    
  )
}

export default QuestionView