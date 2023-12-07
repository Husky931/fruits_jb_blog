"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import HomeText from "./components/HomepageText"
import JobModal from "./components/JobModal"
import AllCountries from "./components_countries/All"

export default function Home() {
    const searchParams = useSearchParams()
    const [jobId, setJobId] = useState<string | null>(null)

    useEffect(() => {
        const asyncFetchJobId = async () => {
            const id = await searchParams.get("jobId")
            setJobId(id)
        }
        asyncFetchJobId()
    }, [searchParams])

    return (
        <main className="flex min-h-screen flex-col items-center">
            {jobId && <JobModal jobId={jobId} />}
            <AllCountries />
            <HomeText />
        </main>
    )
}
