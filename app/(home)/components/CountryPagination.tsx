"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Pagination from "@mui/material/Pagination"
import SingleJobPost from "@/app/(home)/components/SingleJobPost"
import { ColorRing } from "react-loader-spinner"
import { useClientPosts } from "@/context/ClientPostsContext"
import SingleClientPost from "@/app/(home)/components/SingleClientPost"
import Link from "next/link"

export default function CountryPagination() {
    const [page, setPage] = useState(1)
    const clientsPosts = useClientPosts()
    const [strapiPosts, setStrapiPosts] = useState([])
    const [loading, setLoading] = useState<boolean>(false)

    const pathname = usePathname().slice(1)
    const filteredPosts = clientsPosts?.filter(
        (post) => post.attributes.country_location === pathname
    )

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value)
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        const fetchStrapiPosts = async (pageNum: number) => {
            setLoading(true)
            let url
            if (process.env.NODE_ENV === "production") {
                url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/job-vacancies?filters[country][$eq]=${pathname}`
            } else {
                url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/job-vacancies?filters[country][$eq]=${pathname}`
            }
            const res = await fetch(url, {
                cache: "no-store"
            })
            const data = await res.json()
            console.log(data.data)
            setStrapiPosts(data.data)
            setLoading(false)
        }
        fetchStrapiPosts(page)
    }, [page])

    if (loading)
        return (
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
        )

    return (
        <main className="flex min-h-screen flex-col items-center">
            {filteredPosts?.map((m) => (
                <Link href={`/post/${m.id}`} key={m.id} className="w-full">
                    <SingleClientPost
                        key={m.id}
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
                {strapiPosts.map((m: any) => (
                    <SingleJobPost
                        key={m.id}
                        title={m.attributes.title}
                        companyName={m.attributes.company_name}
                        country={m.attributes.country}
                        db_add_timestamp={m.attributes.createdAt}
                        jobDescription={m.attributes.job_description}
                        jobLocation={m.attributes.city_location}
                        link={m.attributes.url}
                        date={m.attributes.publishedAt}
                    />
                ))}
            </ul>
        </main>
    )
}
