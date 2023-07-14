"use client"
import { useState, useEffect } from "react"
import Pagination from "@mui/material/Pagination"
import SingleJobPost from "@/app/components/SingleJobPost"
import { ColorRing } from "react-loader-spinner"
import SiteTitle from "../components/SiteTitle"

export default async function AllCountries() {
    const [page, setPage] = useState<number>(1)
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(true)

    const handlePageChange = async (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value)
        await fetchPosts(value)
    }

    const fetchPosts = async (pageNum: number) => {
        setIsLoading(true)
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_SERVER}/all?page=${pageNum}`,
            {
                cache: "no-store"
            }
        )
        const data = await res.json()
        setPosts(data)
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchTotalPosts = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_EXPRESS_SERVER}/total`,
                {
                    cache: "no-store"
                }
            )
            const total = await res.json()
            setTotalPages(Math.ceil(total / 25))
        }
        fetchTotalPosts()
        fetchPosts(page)
    }, [])

    if (isLoading)
        return (
            <>
                <div className="min-h-screen min-w-screen flex justify-center items-top z-50">
                    <ColorRing
                        visible={true}
                        height="160"
                        width="160"
                        ariaLabel="blocks-loading"
                        colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87"
                        ]}
                    />
                </div>
            </>
        )

    return (
        <>
            <div className="w-full flex justify-start items-center">
                <Pagination
                    count={totalPages}
                    variant="outlined"
                    page={page}
                    onChange={handlePageChange}
                    sx={{ marginTop: "30px" }}
                />
            </div>
            <ul className="w-full mt-[10px]">
                {posts.map((m: any) => (
                    <SingleJobPost
                        key={m.id}
                        title={m.title}
                        companyName={m.company_name}
                        country={m.country}
                        jobLocation={m.location}
                        jobDescription={m.description}
                        link={m.url}
                        date={m.posted_date}
                    />
                ))}
            </ul>
            <div className="w-full flex justify-start items-center">
                <Pagination
                    count={totalPages}
                    variant="outlined"
                    page={page}
                    onChange={handlePageChange}
                    sx={{ marginTop: "30px" }}
                />
            </div>
        </>
    )
}
