import React, {useState} from 'react'
import { Box, Button, Input, Tag, TagLabel, TagCloseButton, Flex, Text }from "@chakra-ui/react";

type headerParams = {
    qHandler: Function;
    questionTitle: string;
    tags: Array<string>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function QuestionHeader(props:headerParams) {
    const [inputTag, setInputTag] = useState("");


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
        </form>
    </Box>
  )
}

export default QuestionHeader