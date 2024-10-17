interface CommentType {
    _id: string
    title: string
    comment: string
    publisherId: string
    username: string
    userImage: string
    questionId: string
    likeCount: number
    dislikeCount: number
    _creationTime: string
} 

export default CommentType