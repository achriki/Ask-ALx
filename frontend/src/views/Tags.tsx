import React, { useEffect, useState } from 'react'
import { SignIn, TagCard } from '../components'
import { Box, useToast } from '@chakra-ui/react'
import TagsType from '../utils/Ttags'
import axios from 'axios'
function Tags() {
  const [tags, setTags] = useState<Array<TagsType>>([])
  const toast = useToast()
  const endpoint_url = process.env.REACT_APP_ENDPOINT_URL
  
  useEffect(()=>{
    const getTags = async ()=>{
      try{
        const request = await axios.get(`${endpoint_url}/tags`)
        if(request.status === 200){
          setTags(request.data.tags)
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

    getTags()
  },[])


  return (
    <div className='w-full'>
        <div className="headerSection bg-white">
            <SignIn />
        </div>
        <div className="flex flex-col min-h-screen mt-4 text-left">
          <h1 className='press-start-2p-regular m-5'>Tags</h1>
          <Box className="grid gap-4 grid-cols-3 grid-rows-3 place-items-center mb-5">
            {
              tags && tags.map((tag)=>(
                <TagCard tag={tag} />
              ))
            }
          </Box>
        </div>      
    </div>
  )
}

export default Tags