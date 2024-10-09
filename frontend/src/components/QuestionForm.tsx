import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function QuestionForm() {
    const navigate = useNavigate()
    const handleAskQuestion = ()=>{
        navigate("/newQuestion")
    }
  return (
    <div className='container'>
        <div className="heed">
            <h1>Top Questions</h1>
        </div>
        <div className="btnContainer">
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