import { ConvexHttpClient } from "convex/browser"
import { api } from "../convex/_generated/api"
const dotenv = require('dotenv');
// import messages from './utils/auth';
dotenv.config();

const client = new ConvexHttpClient(process.env.CONVEX_URL)

console.log("convex url: ", process.env.CONVEX_URL)

class tagsController {
    static async getTags(req, res){
        try{
            const tags = await client.query(api.tags.getAllTags)

            if(!tags){
                res.status(404).send('no question found')
            }
    
            res.status(200).json({tags})
        }catch(err){
            if(err){
                console.log(err.message)
            }
        }
    }

    static async getTagQuestions(req, res){
        try{
            const {tagName} = req.body
            console.log('tag name: ', tagName)
            if(!tagName){
                throw new Error("Can't get questions {tags}")
            }
            const questions = await client.query(api.questions.getTagQuestions,{
                tagName
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
}
export default tagsController