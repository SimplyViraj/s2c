import { combinedSlug } from "@/lib/utils"
export type ConvexUserRaw = {
    _creationTime: number
    _id: string
    email: string
    emailVerificationTime?: number
    image?: string
    name?: string
}

export type Profile = {
    id: string
    email: string
    createdAtMs: number
    emailVerifiedAtMs?: number
    name?: string
    image?: string
}
export const normalizeProfile=(raw: ConvexUserRaw | null): Profile | null=>
{
    if (!raw) return null
   const extractNameFromEmail=(email:string):string=>
   {
    const username=email.split('@')[0]
    return username.split(/[._-]/).map((part)=>part.charAt(0).toUpperCase()+part.slice(1)).join(' ')
   }

   const name=combinedSlug(raw.name!) || extractNameFromEmail(raw.email)

   return {
        id: raw._id,
        email: raw.email,
        createdAtMs: raw._creationTime,
        emailVerifiedAtMs: raw.emailVerificationTime,
        name,
        image: raw.image
   }
}
