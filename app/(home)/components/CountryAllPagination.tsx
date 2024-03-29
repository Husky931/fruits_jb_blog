import { useState, useEffect } from "react"
import Pagination from "@mui/material/Pagination"
import SingleJobPost from "@/app/(home)/components/SingleJobPost"
import SingleClientPost from "@/app/(home)/components/SingleClientPost"
import { ColorRing } from "react-loader-spinner"
import { useClientPosts } from "@/context/ClientPostsContext"
import Link from "next/link"

export default function CountryAllPagination() {
    const [page, setPage] = useState<number>(1)
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(true)
    const clientsPosts = useClientPosts()

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value)
        window.scrollTo(0, 0)
    }

    useEffect(() => {
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
            setIsLoading(false)
        }

        fetchPosts(page)
    }, [page])

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
    }, [])

    if (isLoading)
        return (
            <>
                <div className="min-w-screen items-top z-50 flex min-h-screen justify-center">
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
            <div className="flex w-full items-center justify-start">
                <Pagination
                    count={totalPages}
                    variant="outlined"
                    page={page}
                    onChange={handlePageChange}
                    sx={{ marginBottom: "10px" }}
                />
            </div>
            {clientsPosts?.map((m) => (
                <Link href={`/post/${m.id}`} key={m.id} className="w-full">
                    <SingleClientPost
                        id={m.attributes.id}
                        title={m.attributes.title}
                        job_description={m.attributes.job_description}
                        createdAt={m.attributes.createdAt}
                        updatedAt={m.attributes.createdAt}
                        publishedAt={m.attributes.publishedAt}
                        city_location={m.attributes.city_location}
                        company_name={m.attributes.company_name}
                        country_location={m.attributes.country_location}
                        URL={m.attributes.URL}
                        moderation_status={m.attributes.moderation_status}
                        status={m.attributes.status}
                        company_logo={m.attributes.company_logo}
                        contact_email={m.attributes.contact_email}
                        applicants_number={m.attributes.applicants_number}
                    />
                </Link>
            ))}

            <ul className="mt-[10px] w-full">
                {clientsPosts && clientsPosts?.length > 0 && (
                    <div className="mt-[20px] w-full">
                        Aggregated posts from other websites
                    </div>
                )}
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
            <div className="flex w-full items-center justify-start">
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
