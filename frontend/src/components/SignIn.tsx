import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Input, InputRightElement, InputGroup, Box } from '@chakra-ui/react'
import {Search2Icon} from '@chakra-ui/icons'
import Logo from '../images/ask_alx_logo_60.png'
import { useNavigate } from 'react-router-dom'

function SignIn() {
    const navigate = useNavigate()
    const handleNavigation = ()=>{
        navigate("/")
    }

    const handleAskQuestion = ()=>{
        navigate("/newQuestion")
    }
  return (
    <header>
        <Box className="logo">
            <img style={{cursor: 'pointer'}} onClick={handleNavigation} src={Logo} alt="app_logo_100px" />
        </Box>
        <Box className="searchBar">
            <InputGroup>
                <Input
                    style={{
                        borderColor: '#292929',
                        width:'500px'                       
                    }}
                    placeholder=''
                    _placeholder={{ opacity: 1, color: 'gray.500' }}
                />
                <InputRightElement style={{
                        background:'none',
                        cursor: 'pointer'                
                    }}
                >
                    <Search2Icon color='#2929290' />
                </InputRightElement>
            </InputGroup>
        </Box>
        
        <Box className="signI flex justify-center item-center" >
            <Box mr={8}>
                <SignedIn>
                    <button onClick={handleAskQuestion} className='signInBtn' >
                        Ask Question
                    </button>
                </SignedIn>
            </Box>
                
            <SignedOut>
                <SignInButton>
                    <button className='signInBtn'>
                        Sign In
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton></UserButton>
            </SignedIn>
        </Box>
    </header>
  )
}

export default SignIn