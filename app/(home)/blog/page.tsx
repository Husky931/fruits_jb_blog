"use client"
import { useState, useEffect, useCallback } from "react"
import { fetchAPI } from "./utils/fetch-api"
import Loader from "./components/Loader"
import PostList from "./components/PostList"
import PageHeader from "./components/PageHeader"

interface Meta {
    pagination: {
        start: number
        limit: number
        total: number
    }
}

export default function Profile() {
    const [meta, setMeta] = useState<Meta | undefined>()
    const [data, setData] = useState<any>([])
    const [isLoading, setLoading] = useState(true)

    const fetchData = useCallback((start: number, limit: number) => {
        setLoading(true)
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        const path = `/articles`
        const urlParamsObject = {
            sort: { createdAt: "desc" },
            populate: {
                cover: { fields: ["url"] },
                category: { populate: "*" },
                authorsBio: {
                    populate: "*"
                }
            },
            pagination: {
                start: start,
                limit: limit
            }
        }
        const options = { headers: { Authorization: `Bearer ${token}` } }
        fetchAPI(path, urlParamsObject, options)
            .then((responseData) => {
                if (start === 0) {
                    setData(responseData.data)
                } else {
                    setData((prevData: any[]) => [
                        ...prevData,
                        ...responseData.data
                    ])
                }
                setMeta(responseData.meta)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    function loadMorePosts(): void {
        const nextPosts = meta!.pagination.start + meta!.pagination.limit
        fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
    }

    useEffect(() => {
        fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
    }, [fetchData])

    if (isLoading) return <Loader />

    return (
        <div>
            {/* <PageHeader heading="Our Blog" text="Checkout Something Cool" /> */}
            <PostList data={data}>
                {meta!.pagination.start + meta!.pagination.limit <
                    meta!.pagination.total && (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="transform rounded-lg border border-gray-300 bg-gradient-to-t from-gray-200 to-gray-100 px-6 py-3 text-sm shadow-md transition-transform duration-150 hover:underline hover:shadow-lg"
                            onClick={loadMorePosts}
                        >
                            Load more posts...
                        </button>
                    </div>
                )}
            </PostList>
        </div>
    )
}
