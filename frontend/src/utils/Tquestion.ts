
type QuestionType = {
    _id: string;
    title: string;
    content: string;
    publisherId: string
    username: string
    userImage:string
    likeCount: number
    dislikeCount: number
    tags:Array<string> | undefined
    _creationTime: string
} 
export default QuestionType