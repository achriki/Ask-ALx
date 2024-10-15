import React,{useState, useEffect} from 'react'
import Logo from '../images/ask_alx_logo_100.png'
import { useNavigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";


import {  Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Tag, TagLabel, TagCloseButton, Flex, Alert, Button, 
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast
} from '@chakra-ui/react'
import { QuestionHeader, TextEditor } from '../components'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'
import axios from 'axios'

function Question() {
    const {user} = useUser()
    const toast = useToast()
    const endpoint_url = process.env.REACT_APP_ENDPOINT_URL
    // console.log("endpoint url: ", endpoint_url)
    const navigate = useNavigate()
    const handleNavigation = ()=>{
        navigate("/")
    }
    const [tags, setTags] = useState<Array<string>>([])
    const [questionTitle, setQuestionTitle] = useState<string>('')
    const [model, setModel] = useState<string>('');
    const [errorAlert, setErrorAlert] = useState<boolean>(false);

    const handleTitle = (title:string)=>{
        setQuestionTitle(title)
    }

    const handleDiscard = ()=>{
        const alert = window.confirm('Do you want to discard ?')
        if(alert){
            navigate("/")
        }
    }

    const handleQuestion = async ()=>{
        console.log("user Id: ", user?.id)
        if(!questionTitle || !model){
            setErrorAlert(true)
        }else{
            const payload = {
                publisherId: user?.id,
                username: user?.username,
                userImage:user?.imageUrl,
                title: questionTitle,
                content: model,
                likeCount: 0,
                dislikeCount: 0,
                tags
            }
            console.log('payload', payload)
            const request = await axios.post(`${endpoint_url}/newQuestion`, {
                questionPayload: payload
            })
            if(request.status === 201){
                toast({
                    title: 'Success ',
                    description: "your question created successfully",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

                navigate('/');
            }else{
                toast({
                    title: 'Alert ',
                    description: "Internal error !",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
    }

    const handleError = ()=>{
        return (
            <Alert status='warning'>
                <AlertIcon />
                <AlertTitle>Question Error: </AlertTitle>
                <AlertDescription>Please fill the missing fields</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className='min-h-screen w-full'>
            <div className="header flex items-center justify-start">
                <div className="logo flex items-center justify-center ">
                    <img style={{cursor: 'pointer'}} onClick={handleNavigation} src={Logo} alt="app_logo_100px" />
                    <h1 className='.press-start-2p-regular'>Create Question</h1>
                </div>
            </div>
            <div className="errorAlert">
                {
                    errorAlert && handleError()
                }
            </div>
            <div className="tabs">
                <Tabs variant='soft-rounded' colorScheme='yellow'>
                    <TabList className='ml-4'>
                        <Tab>Edit</Tab>
                        <Tab>Preview</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel 
                            className='w-3/4 h-full ml-16 mt-5 shadow-md rounder-md' 
                            bgColor='white'
                        >
                            <QuestionHeader qHandler={handleTitle} tags={tags} questionTitle={questionTitle} setTags={setTags} />
                            <TextEditor setModelContent={setModel} />
                        </TabPanel>
                        <TabPanel
                            className='w-3/4 h-full ml-16 mt-5 shadow-md rounder-md' 
                            bgColor='white'
                        >
                            <Box className=''>
                                <div className="header">
                                    <Text 
                                        size="lg"
                                        textAlign="left"
                                        border='none'
                                        fontSize='25px'
                                        className="press-start-2p-regular mb-4 p-10"
                                    >
                                        {questionTitle}
                                    </Text>
                                    <Flex wrap="wrap" gap="2" mb="4">
                                        {tags.map((tag, index) => (
                                            <Tag
                                                key={index}
                                                size="lg"
                                                borderRadius="full"
                                                variant="solid"
                                                colorScheme="teal"
                                            >
                                                <TagLabel>#{tag}</TagLabel>
                                            </Tag>
                                        ))}
                                    </Flex>
                                </div>
                                <div className="content">
                                    {
                                        model&&(
                                            <FroalaEditorView model={model} />
                                        )
                                    }
                                </div>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <div className='ml-16 mt-5 pb-5 '>
                    <Flex  wrap="wrap" gap="2" mb="4">
                        <Button
                            bgColor={model.length > 0 ? "blue.400":"gray.400"}
                            style={{pointerEvents: model.length > 0 ? 'auto': 'none'}}
                            onClick={handleQuestion}
                        >
                            Publish
                        </Button>
                        <Button
                            bgColor="red.400"
                            onClick={handleDiscard}
                        >
                            Cancel
                        </Button>
                    </Flex>
                </div>
            </div>
        </div>
    )
}

export default Question;