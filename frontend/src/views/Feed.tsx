import React,{useEffect, useState} from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { SignIn, QuestionForm, QuestionCard, NavBar, EventsBar } from '../components'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useQuery } from 'convex/react';
import QuestionType from '../utils/Tquestion';

function Feed() {
  const toast = useToast()
  const endpoint_url = process.env.REACT_APP_ENDPOINT_URL
  const [questions, setQuestion] = useState<Array<QuestionType>>([])

  useEffect(()=>{
    const getQuestions = async ()=>{
      try{
        const request = await axios.get(`${endpoint_url}/questions`)
        if(request.status === 200){
          setQuestion(request.data.questions)
        }
      }catch(err){
        toast({
          title: 'Alert',
          description: "No questions found",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
    getQuestions()
    
  },[])
  return (
    <div className='w-full'>
      <div className="headerSection bg-white">
        <SignIn />
      </div>
      <div className="flex h-screen mt-4">
        <div className=" w-64 flex flex-col scroll navBar" >
          <NavBar />
        </div>
        <div className="w-3/4 flex flex-col scroll questionsSection justify-start items-stretch" >
          <div className="qForm flex flex-col justify-start items-center ">
            <QuestionForm />
            {
              questions && questions.map((q)=>(
                  <QuestionCard question={q} />
                )
              )
            }
          </div>
        </div>
        <div className="w-1/4 mr-4 flex flex-col scroll questionsSection">
          <EventsBar />
        </div>
      </div>      
    </div>
    
  )
}

export default Feed