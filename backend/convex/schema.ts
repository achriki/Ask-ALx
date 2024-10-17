import { defineSchema, defineTable } from "convex/server";
import {v} from 'convex/values';

export const userSchema = {
    name: v.string(),
    externalId: v.string(),
    email:v.string(),
    questions: v.optional(v.array(v.id('questions'))),
    savedQuestion: v.optional(v.array(v.id('questions'))),
    favTags:v.optional(v.array(v.id('tags')))
}

export const QuestionsSchema = {
    title: v.string(),
    content: v.string(),
    publisherId: v.string(),
    username:v.string(),
    userImage:v.string(),
    likeCount: v.number(),
    dislikeCount: v.number(),
    tags: v.optional(v.array(v.string())),
}

export const TagsSchema = {
    name: v.string(),
    description: v.string(),
    userId: v.optional(v.id('users')),
}

export const commentSchema = {
    comment: v.string(),
    publisherId: v.string(),
    username:v.string(),
    userImage:v.string(),
    likeCount:v.number(),
    dislikeCount: v.number(),
    questionId: v.id('questions')
}



export default defineSchema({
    questions: defineTable(QuestionsSchema).index("byPubId", ["publisherId"]),
    users: defineTable(userSchema).index("byExternalId", ["externalId"]),
    comments: defineTable(commentSchema).index("byQuestionId",["questionId"]),
    tags: defineTable(TagsSchema).index("byName", ["name"])
})