"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ColorRing } from "react-loader-spinner"
import formatDistance from "date-fns/formatDistance"
import parseISO from "date-fns/parseISO"
import Link from "next/link"

type SingleJobPostTypes = {
    title: string
    company_name: string
    country: string | undefined
    location: string
    description: string
    url: string
    date: string
    db_add_timestamp: string
}

type JobModalProps = {
    jobId: string
}

export default async function JobModalSocial({ jobId }: JobModalProps) {
    const [job, setJob] = useState<SingleJobPostTypes | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    function isISOFormat(date: string | undefined) {
        // Regex for ISO 8601 format
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
        return regex.test(date!)
    }

    const displayDate = isISOFormat(job?.db_add_timestamp)
        ? formatDistance(parseISO(job?.db_add_timestamp!), new Date(), {
              addSuffix: true
          })
        : job?.date

    useEffect(() => {
        if (jobId) {
            const fetchJob = async () => {
                setIsLoading(true)
                let url = ""
                // to be added Strapi endpoint for social media landing posts
                const res = await fetch(url, {
                    cache: "no-store"
                })
                const data = await res.json()
                setJob(data)
                setIsLoading(false)
            }
            fetchJob()
        } else {
            setIsLoading(false)
        }
    }, [jobId])

    const handleOutsideClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (e.target === e.currentTarget) {
            router.push("/")
        }
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            onClick={handleOutsideClick}
        >
            <section className="m-4 rounded-lg bg-white p-8 shadow-lg lg:max-w-[700px]">
                {isLoading ? (
                    <div style={{ pointerEvents: isLoading ? "auto" : "none" }}>
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
                ) : (
                    <div>
                        <h1 className="mb-4 text-2xl font-semibold">
                            {job?.title}
                        </h1>
                        <div className="my-1 flex">
                            <div className="font-bold">Company name: </div>
                            <div className="mx-1 text-[#663300]">
                                {job?.company_name}
                            </div>
                        </div>
                        <div className="flex">
                            <div>Location: </div>
                            <div className="mx-1 font-black">
                                {job && job.country
                                    ? job.country.charAt(0).toUpperCase() +
                                      job.country.slice(1).toLowerCase()
                                    : ""}
                                , {job?.location}
                            </div>
                        </div>
                        <div className="my-2 line-clamp-2 overflow-hidden overflow-ellipsis">
                            Job Description: {job?.description}
                        </div>
                        <div className="my-2">Added On: {displayDate}</div>
                        {job?.url && (
                            <div className="my-6 flex w-full items-center justify-center">
                                <Link
                                    href={job?.url}
                                    id="applyNowButton"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="z-50 cursor-pointer rounded bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    )
}
