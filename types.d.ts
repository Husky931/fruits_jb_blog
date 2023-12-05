import { Mode } from "fs"

export type User = {
    blocked: boolean
    confirmed: boolean
    createdAt: string
    email: string
    id: number
    provider: string
    updatedAt: string
    username: string
    userType: UserType
    job_posts: JobPost[]
}

type JobPost = {
    id: number
    title: string
    job_description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    city_location: string
    company_name: string
    country_location: string
    URL: string
    moderation_status: ModerationStatus
    status: UserStatus
}

type ModerationStatus = "pending" | "approved" | "rejected"
type UserStatus =
    | "running"
    | "stopped"
    | "running"
    | "deleted"
    | "pending"
    | "expired"

export type UserType = "employer" | "worker"
