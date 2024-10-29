import express from 'express'
import questionController from "../controllers/questionsController"
import commentsController from '../controllers/commentsContoller'
import usersController from '../controllers/usersController'
import tagsController from '../controllers/tagsController'

const router = express.Router()

const routerController = (app) => {
    app.use('/', router)

    //question routes
    router.get('/questions', async (req, res)=>{
        await questionController.getQuestions(req, res)
    })

    router.post('/saveQ', async(req, res)=>{
        await usersController.saveQuestion(req, res)
    })

    router.post('/question', async(req, res)=>{
        await questionController.getCurrentQuestion(req, res)
    })

    router.post('/qLike', async(req, res)=>{
        await questionController.LikeQuestion(req, res)
    })

    router.post('/qDislike', async (req, res)=>{
        await questionController.DislikeQuestion(req, res)
    })

    router.post('/newQuestion', async (req, res)=>{
        await questionController.createQuestion(req, res)
    })

    router.post('/updateQuestion', (req, res)=>{

    })

    router.post('/deleteQuestion', (req, res)=>{

    })

    router.post('/comments', async(req, res)=>{
        await commentsController.getQComments(req, res)
    })

    router.post('/pushComment', async(req, res)=>{
        await commentsController.pushComment(req, res)
    })
    
    router.post('/cLike', async(req, res)=>{
        await commentsController.LikeComment(req, res)
    })

    router.post('/cDislike', async (req, res)=>{
        await commentsController.DislikeComment(req, res)
    })

    //tags routes
    router.get('/tags', async (req, res)=>{
        await tagsController.getTags(req, res)
    })

    router.post('/qTag', async (req, res)=>{
        await tagsController.getTagQuestions(req, res)
    })

    //user routes
    router.post('/qUser', async (req, res)=>{
        await usersController.getUserQuestions(req, res)
    })

    router.post('/savedQ', async(req, res)=>{
        await usersController.getSavedQuestion(req, res)
    })
}

export default routerController