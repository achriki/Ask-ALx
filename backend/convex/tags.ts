import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

export const getAllTags = query({
    args:{},
    handler: (ctx)=>{
        const tagsList = ctx.db
        .query('tags')
        .collect()

        return tagsList
    }
})