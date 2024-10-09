import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { SignIn, QuestionForm } from '../components'

function Feed() {
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