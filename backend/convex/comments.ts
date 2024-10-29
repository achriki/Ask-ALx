import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";
import { query } from "./_generated/server";

const commentObject = {
    comment: v.string(),
    publisherId: v.string(),
    username:v.string(),
    userImage:v.string(),
    likedBy: v.optional(v.array(v.string())),
    dislikedBy: v.optional(v.array(v.string())),
    questionId: v.id('questions')
}

export const getQComments = query({
    args:{_id: v.id('questions')},
    handler: async(ctx, args)=>{
        const comments = await ctx.db
        .query('comments')
        .withIndex('byQuestionId', (q)=>q.eq('questionId', args._id))
        .collect()

        return comments
    }
})

export const pushComment = mutation({
    args: {data: v.object(commentObject)},
    handler: async(ctx, args)=>{
        const commentId = await ctx.db.insert('comments', args.data)

        return commentId;
    }
})

export const LikeCountUpdate = mutation({
    args:{_id:v.id('comments'), userId:v.string()},
    handler: async (ctx, args)=>{
        const {_id, userId} = args;
        const comment = await ctx.db.get(_id)
        console.log("comment object: ", comment)
        const index = comment?.dislikedBy?.indexOf(userId) || -1
        let dislikeListUpdate:any = []
        if(index !== -1){
           dislikeListUpdate =  comment?.dislikedBy?.splice(index, 1) || comment?.dislikedBy
        }
        
        const currentLikeList = comment?.likedBy || []
        await ctx.db.patch(_id, {likedBy: [...currentLikeList, userId], dislikedBy: dislikeListUpdate} )

    }    
})

export const DislikeCountUpdate = mutation({
    args:{_id:v.id('comments'), userId:v.string()},
    handler: async (ctx, args)=>{
        const {_id, userId} = args;
        const comment = await ctx.db.get(_id)
        const index = comment?.likedBy?.indexOf(userId) || -1
        let likedListUpdate: any= []

        if(index !== -1){
            likedListUpdate = comment?.likedBy?.splice(index, 1) || comment?.likedBy
        }
        const currentDislikeList = comment?.dislikedBy || []
        await ctx.db.patch(_id, {dislikedBy: [...currentDislikeList, userId], likedBy: likedListUpdate} )
    }    
})