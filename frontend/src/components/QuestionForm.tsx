import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function QuestionForm() {
    const navigate = useNavigate()
    const handleAskQuestion = ()=>{
        navigate("/newQuestion")
    }
  return (
    <div className='flex justify-center items-center container pb-2' style={{borderBottom: '.5px solid #000' }}>
        <div className="heed w-full">
            <h1 className='press-start-2p-regular '>Top Questions</h1>
        </div>
        <div className="btnContainer w-full">
            <SignedIn>
                <button onClick={handleAskQuestion} className='signInBtn' >
                    Ask Question
                </button>
            </SignedIn>
            <SignedOut>
                <SignInButton>
                    <button className='signInBtn'>
                        Sign In
                    </button>
                </SignInButton>
            </SignedOut>
        </div>
    </div>
  )
}

export default QuestionForm