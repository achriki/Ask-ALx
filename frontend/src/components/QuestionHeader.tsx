import React, {useState} from 'react'
import { Box, Button, Input, Tag, TagLabel, TagCloseButton, Flex, Text, VStack, Divider }from "@chakra-ui/react";
import TagsType from '../utils/Ttags';

type headerParams = {
    qHandler: Function;
    questionTitle: string;
    tags: Array<string>;
    searchTags: Array<TagsType>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function QuestionHeader(props:headerParams) {
    const [inputTag, setInputTag] = useState("");

    const filteredTags = props.searchTags.filter((tag) =>
        tag.name.toLowerCase().includes(inputTag.toLowerCase())
    );

    // Function to remove a tag
    const handleRemoveTag = (index:number) => {
        props.setTags(props.tags.filter((_, i) => i !== index));
    };

    const handleAddTag = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputTag && props.tags.length < 4) {
          props.setTags([...props.tags, inputTag]);
          setInputTag("");
        }
    };
  return (
    <Box className="p-8 bg-white ">
        <Input 
            value={props.questionTitle}
            onChange={(e) => props.qHandler(e.target.value)}
            placeholder="New post title here..."
            size="lg"
            border='none'
            fontSize='25px'
            className="press-start-2p-regular mb-4 p-10"
        />
        <form className='bg-white' onSubmit={handleAddTag}>
            <Flex wrap="wrap" gap="2" mb="4">
                {props.tags.map((tag, index) => (
                    <Tag
                        key={index}
                        size="lg"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="teal"
                    >
                        <TagLabel>#{tag}</TagLabel>
                        <TagCloseButton onClick={() => handleRemoveTag(index)} />
                    </Tag>
                ))}
            </Flex>

            {/* Tag input field */}
            <Input
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                placeholder={props.tags.length < 4 ? "Add up to 4 tags..." : "Only 4 selections allowed"}
                size="md"
                isDisabled={props.tags.length >= 4}
            />
            {/* Tag Suggestions */}
            {
                inputTag.length > 0 ? (<VStack 
                    spacing={4}
                    align="start"
                    textAlign='left'
                    maxH="200px" // Limit the height
                    overflowY="auto" // Make it scrollable
                    border="1px solid #E2E8F0" // Add a border for better visibility
                    p={2}
                    ml={4}
                    borderRadius="md"
                >
                    <Text fontWeight="bold" className="text-gray-800">Top tags</Text>
                    <Divider />

                    {filteredTags.length > 0 ? (
                    filteredTags.map((tag) => (
                        <Box key={tag.name} onClick={() => setInputTag(tag.name)} className="hover:bg-gray-100 p-2 rounded-lg">
                            <Tag size="lg" colorScheme="green" className="mr-2">
                                <TagLabel>#{tag.name}</TagLabel>
                            </Tag>
                            <Text fontSize="sm" color="gray.600">{tag.description}</Text>
                        </Box>
                    ))
                    ) : (
                        <Text>No matching tags found</Text>
                    )}
                </VStack>):(<></>)
            }
        </form>
    </Box>
  )
}

export default QuestionHeader