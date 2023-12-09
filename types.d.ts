export type ImageFormat = {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    url: string
}

export type CompanyLogo = {
    data: {
        id: number
        attributes: {
            name: string
            alternativeText: string | null
            caption: string | null
            width: number
            height: number
            formats: {
                thumbnail: ImageFormat
                small: ImageFormat
                medium: ImageFormat
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: string | null
            provider: string
            provider_metadata: any | null
            createdAt: string
            updatedAt: string
        }
    }
}

type UserStatus =
    | "running"
    | "stopped"
    | "running"
    | "deleted"
    | "pending"
    | "expired"

type ModerationStatus = "pending" | "approved" | "rejected"

export type UserType = "employer" | "worker"

export type StrapiPostAttributes = {
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
    company_logo: CompanyLogo
    contact_email: string
    id: number
}

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
    job_posts: StrapiPostAttributes[]
}

export type PostgresJobPostTypes = {
    title: string
    companyName: string
    country: string
    jobLocation: string
    jobDescription: string
    link: string
    date: string
    db_add_timestamp: string
}
