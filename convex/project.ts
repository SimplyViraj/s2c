import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { get } from "http";

export const getProject = query({
    args: { projectId: v.id("projects") },
    handler:async(ctx,{projectId})=>{
        const userId=await getAuthUserId(ctx)
        if(!userId) throw new Error("Not authenticated")

        const project=await ctx.db.get(projectId)
        if(!project) throw new Error("Project not found")

        if(project.userId!==userId && !project.isPublic) throw new Error("Access denied")
        return project
    }
})

export const createProject = mutation(
    {
        args:
        {
            userId: v.id('users'),
            name: v.optional(v.string()),
            sketchesData: v.any(),
            thumbnail: v.optional(v.string()),
        },
        handler:async(ctx,{userId,name,sketchesData,thumbnail})=>
        {
            console.log("Creating project for user:",userId)
            const projectNumber=await getNextProjectNumber(ctx,userId)
            const projectName=name || `Untitled Project ${projectNumber}`
            const projectId=await ctx.db.insert("projects",
                {
                    userId,
                    name: projectName,
                    sketchesData,
                    thumbnail,
                    createdAt: Date.now(),
                    lastModified: Date.now(),
                    isPublic: false,
                    projectNumber,
                }
            )
            return { projectId, name: projectName, projectNumber }
        }
    }
)

async function getNextProjectNumber(ctx: any ,userId:string):Promise<number>
{
    const counter=await ctx.db.query("project_counters").withIndex('by_userId',(q: any )=>q.eq("userId",userId)).first()
    if(!counter)
    {
        await ctx.db.insert("project_counters",{userId,getNextProjectNumber:2})
        return 1
    }
    const projectNumber=counter.getNextProjectNumber
    await ctx.db.patch(counter._id,{getNextProjectNumber:projectNumber+1})
    return projectNumber
}