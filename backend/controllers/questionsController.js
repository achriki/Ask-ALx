import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"
const dotenv = require('dotenv');
// import messages from './utils/auth';
dotenv.config();

const client = new ConvexHttpClient(process.env.CONVEX_URL)

console.log("convex url: ", process.env.CONVEX_URL)

class questionController {
    static async getQuestions(req, res){
        try{
            const questions = await client.query(api.questions.getQuestions)
            console.log(questions)

            if(!questions){
                res.status(404).send('no question found')
            }
    
            res.status(200).json({questions: questions})
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async createQuestion(req, res){
        try{
            const questionObject = req.body.questionPayload
            const createQuestion = await client.mutation(api.questions.createQuestion ,{
                data: questionObject
            })

            if(!createQuestion){
                res.status(404).send('server error on creating question')
            }
            res.status(201).send("question created successfully")
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async getCurrentQuestion(req, res){
        try{
            const {id} = req.body
            console.log('_id: ', id)
            if(!id){
                throw new Error("Can't get current question _id")
            }
            const question = await client.query(api.questions.getCurrentQuestion,{
                _id: id
            })

            if(!question){
                res.status('404').send('question not found')
            }
            res.status(200).json({question})
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async LikeQuestion(req, res){
        try{
            const { _id } = req.body
            console.log('_id: ', _id)
            if(!_id){
                throw new Error("Can't get current question _id")
            }
            
            await client.mutation(api.questions.LikeCountUpdate, {
                _id
            })

            res.status(200).send('question data updated')
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async DislikeQuestion(req, res){
        try{
            const { _id } = req.body
            console.log('_id: ', _id)
            await client.mutation(api.questions.DislikeCountUpdate, {
                _id
            })
            res.status(200).send('question data updated')
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }
}

export default questionController