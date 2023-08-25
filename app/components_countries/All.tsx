"use client"
import { useState, useEffect } from "react"
import Pagination from "@mui/material/Pagination"
import SingleJobPost from "@/app/components/SingleJobPost"
import { ColorRing } from "react-loader-spinner"

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
        window.scrollTo(0, 0)
    }

    const fetchPosts = async (pageNum: number) => {
        setIsLoading(true)
        let url
        if (process.env.NODE_ENV === "production") {
            url = `${process.env.NEXT_PUBLIC_EXPRESS_SERVER}/all?page=${pageNum}`
        } else {
            url = `${process.env.NEXT_PUBLIC_EXPRESS_SERVER}/api/all?page=${pageNum}`
        }
        const res = await fetch(url, {
            cache: "no-store"
        })
        const data = await res.json()
        setPosts(data)
        // console.log(data)
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchTotalPosts = async () => {
            let url
            if (process.env.NODE_ENV === "production") {
                url = `${process.env.NEXT_PUBLIC_EXPRESS_SERVER}/get/total`
            } else {
                url = `${process.env.NEXT_PUBLIC_EXPRESS_SERVER}/api/get/total`
            }
            const res = await fetch(url, {
                cache: "no-store"
            })
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
                        db_add_timestamp={m.db_add_timestamp}
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
