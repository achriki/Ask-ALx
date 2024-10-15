import React,{useEffect, useState} from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { SignIn, QuestionForm } from '../components'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

function Feed() {
  const toast = useToast()
  const endpoint_url = process.env.REACT_APP_ENDPOINT_URL

  useEffect(()=>{

    const getQuestions = async ()=>{
      try{
        const request = await axios.get(`${endpoint_url}/questions`)
        if(request.status === 200){
          console.log(request.data.questions)
        }
      }catch(err){
        toast({
          title: 'Alert ',
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
      <div className="headerSection">
        <SignIn />
      </div>
      <div className="flex h-screen">
        <div className=" w-1/4 flex flex-col scroll navBar" style={{border: "1px solid red"}}>
          Navigation bar
        </div>
        <div className="w-3/4 flex flex-col scroll questionsSection" style={{border: "1px solid red"}}>
          <div className="qForm">
            <QuestionForm />  
          </div>
        </div>
        <div className="w-1/4 flex flex-col scroll questionsSection" style={{border: "1px solid red"}}>
          Alx Events
        </div>
      </div>      
    </div>
    
  )
}

export default Feed