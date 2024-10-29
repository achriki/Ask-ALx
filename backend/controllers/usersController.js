import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"
const dotenv = require('dotenv');
// import messages from './utils/auth';
dotenv.config();

const client = new ConvexHttpClient(process.env.CONVEX_URL)

class usersController{
    static async saveQuestion(req, res){
        try{
            const {externalId ,_Qid} = req.body
            console.log('args obj', {externalId, _Qid})

            if(!_Qid){
                throw new Error("Can't get current question _id")
            }
    
            await client.mutation(api.users.saveQuestion, {
                externalId, _id: _Qid
            })

            res.status(200).send('question saved successfully')
        }catch(err){
            if(err){
                console.log(err.message)
                res.status(400).send("Internal server error")
            }
        }
    }

    static async getUserQuestions(req, res){
        try{
            const {publisher} = req.body
            console.log('_publisherId: ', publisher)
            if(!publisher){
                throw new Error("Can't get current question _id")
            }
            const questions = await client.query(api.questions.getUserQuestions,{
                publisherId: publisher
            })

            if(questions.length === 0){
                res.status('404').send('questions not found')
            }
            res.status(200).json({questions})
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async getSavedQuestion(req, res){
        try{
            const {userId} = req.body
            if(!userId){
                throw new Error("user id invalid")
            }
            const questions = await client.query(api.questions.getUserSavedQuestions, {
                userId: userId
            })

            if(questions.length === 0){
                res.status(400).send('question not found')
            }
            res.status(200).json({savedQuestion: questions})
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }
}

export default usersController