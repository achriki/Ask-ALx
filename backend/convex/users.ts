import { internalMutation, query, QueryCtx, mutation } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const userAttributes = {
      name: `${data.first_name} ${data.last_name}`,
      externalId: data.id,
      email: data.primary_email_address_id || '',
      questions: undefined,
      favTags: undefined,
      savedQuestion: undefined,
    };

    const user = await userByExternalId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export const saveQuestion = mutation({
  args:({externalId:v.string(), _id: v.id('questions')}),
  handler: async(ctx, args) =>{
    const {externalId, _id} = args
    const user = await userByExternalId(ctx, externalId)
    const currentSavedQuestions = user?.savedQuestion || []; 
    if(user) await ctx.db.patch(user?._id, {savedQuestion: [...currentSavedQuestions, _id] || undefined } )
  }
}) 

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  console.log("server identity", await ctx.auth.getUserIdentity());
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();

  // console.log('user identity: ', identity)
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity?.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
    .unique();
}