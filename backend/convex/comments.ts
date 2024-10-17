import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";
import { query } from "./_generated/server";

const commentObject = {
    comment: v.string(),
    publisherId: v.string(),
    username:v.string(),
    userImage:v.string(),
    likeCount:v.number(),
    dislikeCount: v.number(),
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
    args:{_id:v.id('comments')},
    handler: async (ctx, args)=>{
        const {_id} = args;
        const comment = await ctx.db.get(_id)
        console.log("comment object: ", comment)
        await ctx.db.patch(_id, {likeCount: (comment?.likeCount || 0) + 1} )

    }    
})

export const DislikeCountUpdate = mutation({
    args:{_id:v.id('comments')},
    handler: async (ctx, args)=>{
        const {_id} = args;
        const comment = await ctx.db.get(_id)
        await ctx.db.patch(_id, {dislikeCount: (comment?.dislikeCount || 0) + 1} )

    }    
})