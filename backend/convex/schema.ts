import { defineSchema, defineTable } from "convex/server";
import {v} from 'convex/values';

export const QuestionsSchema = {
    title: v.string(),
    content: v.string(),
    publisherId: v.string(),
    useful: v.number(),
    notUseful: v.number(),
    tags: v.array(v.string()),
}

export const TagsSchema = {
    name: v.string(),
    userId: v.string(),
}

export const commentSchema = {
    comment: v.string(),
    publisherId: v.string(),
    useful:v.number(),
    notUseful: v.number(),
    questionId: v.string()
}

export const userSchema = {
    clerkMetadata : v.object({
        email: v.string(),
        userId: v.string(),
        username: v.string(),
        full_name: v.string(),
        image_url: v.string(),
        created_at: v.string(),
        updated_at: v.string(),
        phone_number: v.string()
    }),
    savedQuestion: v.array(v.object({
        _id: v.string()
    })),
    favTags:v.array(v.string()),
}


export default defineSchema({
    questions: defineTable(QuestionsSchema),
    users: defineTable(userSchema),
    comments: defineTable(commentSchema),
    tags: defineTable(TagsSchema)
})