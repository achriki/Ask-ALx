import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";
import { query } from "./_generated/server";


const questionType = {
    title: v.string(),
    content: v.string(),
    publisherId:v.string(),
    username:v.string(),
    userImage:v.string(),
    likeCount: v.number(),
    dislikeCount: v.number(),
    tags: v.optional(v.array(v.string()))
}

export const getCurrentQuestion = query({
    args:{_id: v.id('questions')},
    handler: async (ctx, args)=>{
        const question = await ctx.db
        .query('questions')
        .filter((q)=>q.eq(q.field('_id'), args._id))
        .unique()

        
        return question
    }
})

export const getTagQuestions = query({
    args:{tagName: v.string()},
    handler: async (ctx, args)=>{
        const questionList = await ctx.db.query('questions').collect()
        const tagQuestions:Array<any> = []
        
        questionList.map((question)=>{
            if(question.tags?.includes(args.tagName)){
                tagQuestions.push(question)
            }
        })
        console.log('Tags list: ', tagQuestions)

        return tagQuestions
    }
})

export const getUserQuestions = query({
    args:{publisherId:v.string()},
    handler: async (ctx, args)=>{
        const questions = await ctx.db
        .query('questions')
        .filter((q)=>q.eq(q.field('publisherId'), args.publisherId))
        .collect()

        return questions
    }
})

export const getQuestions = query({
    args:{},
    handler: async (ctx)=>{
        return await ctx.db.query('questions').collect()
    }
})

export const createQuestion = mutation({
    args:{data:v.object(questionType)},
    handler: async (ctx, args)=>{
        const questionId = await ctx.db.insert('questions', args.data)

        return questionId;
    }
})

export const updatedQuestion = mutation({
    args:{_id: v.id('questions'), data:v.object(questionType)},
    handler: async (ctx, args)=>{
        const {_id} = args
        //object checker
        console.log("pre-check: ", await ctx.db.get(_id))
        
        //update the data by index of Id
        await ctx.db.patch(_id, args.data)

        //check the updates
        console.log("updated object: ", await ctx.db.get(_id))
    }
})

export const deleteQuestion = mutation({
    args:{_id:v.id('questions')},
    handler: async(ctx, args)=>{
        const{_id} = args
        //object checker
        console.log("pre-check: ", await ctx.db.get(_id))
        await ctx.db.delete(args._id)
    }
})

export const LikeCountUpdate = mutation({
    args:{_id:v.id('questions')},
    handler: async (ctx, args)=>{
        const {_id} = args;
        const question = await ctx.db.get(_id)
        console.log("question object: ", question)
        await ctx.db.patch(_id, {likeCount: (question?.likeCount || 0) + 1} )

    }    
})

export const DislikeCountUpdate = mutation({
    args:{_id:v.id('questions')},
    handler: async (ctx, args)=>{
        const {_id} = args;
        const question = await ctx.db.get(_id)
        await ctx.db.patch(_id, {dislikeCount: (question?.dislikeCount || 0) + 1} )

    }    
})
