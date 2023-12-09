"use client"
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    FC,
    ReactNode
} from "react"

import { StrapiPostAttributes } from "@/types"

interface JobPost {
    id: number
    attributes: StrapiPostAttributes
}

interface JobPostsApiResponse {
    data: JobPost[]
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

const ClientPostsContext = createContext<JobPost[] | null>(null)

export const ClientPostsProvider: FC<{ children: ReactNode }> = ({
    children
}) => {
    const [clientPosts, setClientPosts] = useState<JobPost[] | null>(null)

    useEffect(() => {
        const fetchClientPosts = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:1337/api/job-posts?populate=*&sort=updatedAt%3Adesc&filters[moderation_status][$eq]=approved&pagination[pageSize]=100"
                )
                const jsonResponse: JobPostsApiResponse = await response.json()
                const runningPosts = jsonResponse.data.filter(
                    (post) => post.attributes.status === "running"
                )
                setClientPosts(runningPosts)
            } catch (error) {
                console.error("Error fetching client posts:", error)
                setClientPosts(null)
            }
        }

        fetchClientPosts()
    }, [])

    return (
        <ClientPostsContext.Provider value={clientPosts}>
            {children}
        </ClientPostsContext.Provider>
    )
}

export const useClientPosts = () => useContext(ClientPostsContext)

export default ClientPostsProvider
