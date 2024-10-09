import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import {Search2Icon} from '@chakra-ui/icons'
import Logo from '../images/ask_alx_logo_100.png'
import { useNavigate } from 'react-router-dom'

function SignIn() {
    const navigate = useNavigate()
    const handleNavigation = ()=>{
        navigate("/")
    }
  return (
    <header>
        <div className="logo">
            <img style={{cursor: 'pointer'}} onClick={handleNavigation} src={Logo} alt="app_logo_100px" />
        </div>
        <div className="searchBar">
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
        </div>
        
        <div className="signI">
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
        </div>
    </header>
  )
}

export default SignIn