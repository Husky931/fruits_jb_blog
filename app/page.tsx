"use client"
import HomeText from "./components/HomepageText"
import JobModal from "./components/JobModal"
import AllCountries from "./components_countries/All"
import { useSearchParams } from "next/navigation"

export default async function Home() {
    const searchParams = useSearchParams()
    const jobId = searchParams.get("jobId")
    return (
        <main className="flex min-h-screen flex-col items-center">
            {jobId && <JobModal jobId={jobId} />}
            <AllCountries />
            <HomeText />
        </main>
    )
}
