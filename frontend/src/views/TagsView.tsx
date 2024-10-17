import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom'
import QuestionType from '../utils/Tquestion'
import { Box, Toast, Divider, useToast } from '@chakra-ui/react'
import { EventsBar, NavBar, QuestionCard, SignIn } from '../components'
import axios from 'axios'

function TagsView() {
    const {tagName} = useParams()
    const toast = useToast()
    const navigate = useNavigate()
    const endpoint_url = process.env.REACT_APP_ENDPOINT_URL
    const [questions, setQuestions] = useState<Array<QuestionType>>([])
    useEffect(()=>{
        const getQuestions = async ()=>{
            try{

              const request = await axios.post(`${endpoint_url}/qTag`,{
                tagName
              })

              if(request.status === 200){
                setQuestions(request.data.questions)
              }
            }catch(err){
              toast({
                title: 'Alert',
                description: "No questions found",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              navigate('/tags')
            }
        }
        getQuestions()
    },[])
    return (
        <div className='w-full'>
        <div className="headerSection bg-white">
            <SignIn />
        </div>
        <div className="flex flex-col min-h-screen mt-4 text-left">
          <h1 className='press-start-2p-regular m-5'>{tagName}</h1>
          <Box className="w-full rounded-lg p-6 max-w-full flex justify-around">
            <Box className=" flex flex-col scroll navBar" maxW="20%">
                <NavBar />
            </Box>
            <div className="w-3/4 flex flex-col scroll questionsSection justify-start items-stretch" >
            <div className="qForm flex flex-col justify-start items-center ">
                {
                    questions && questions.map((q)=>(
                        <QuestionCard question={q} />
                    )
                )
                }
            </div>
            </div>
            <Box style={{maxWidth: '300px'}}>
                <EventsBar />
            </Box>
          </Box>
        </div>      
    </div>
    )
}

export default TagsView