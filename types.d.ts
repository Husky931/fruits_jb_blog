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
}

export type UserType = "employer" | "worker"
