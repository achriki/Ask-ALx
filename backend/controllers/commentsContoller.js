import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"
const dotenv = require('dotenv');
// import messages from './utils/auth';
dotenv.config();

const client = new ConvexHttpClient(process.env.CONVEX_URL)

console.log("convex url: ", process.env.CONVEX_URL)

class commentsController {
    static async getQComments(req, res){
        try{
            const {_id} = req.body
            const comments = await client.query(api.comments.getQComments, {
                _id: _id
            })

            if(!comments){
                res.status(404).send('no comment found')
            }

            res.status(200).json({comments: comments})
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async pushComment(req, res){
        try{
            const commentObject = req.body.commentPayload
            console.log('obj: ', commentObject)
            const createComment = await client.mutation(api.comments.pushComment ,{
                data: commentObject
            })

            if(!createComment){
                res.status(404).send('server error on creating question')
            }
            res.status(201).send("question created successfully")
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async LikeComment(req, res){
        try{
            const { _id } = req.body
            console.log('_id: ', _id)
            if(!_id){
                throw new Error("Can't get current question _id")
            }
            await client.mutation(api.comments.LikeCountUpdate, {
                _id
            })

            res.status(200).send('comment data updated')
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async DislikeComment(req, res){
        try{
            const { _id } = req.body
            console.log('_id: ', _id)
            await client.mutation(api.comments.DislikeCountUpdate, {
                _id
            })
            res.status(200).send('comment data updated')
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }


}

export default commentsController