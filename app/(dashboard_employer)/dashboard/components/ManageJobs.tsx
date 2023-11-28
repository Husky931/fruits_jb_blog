"use client"
import React, { useState, useEffect } from "react"
import { Button, Box, Divider } from "@mui/material"

interface Job {
    id: number
    title: string
}
const ManageJobs = () => {
    const [jobs, setJobs] = useState<Array<Job>>([])
    const [isLoading, setIsLoading] = useState(true)

    // Dummy data fetching function
    // Replace this with your actual data fetching logic
    useEffect(() => {
        const fetchJobs = async () => {
            // Simulate a fetch call
            setTimeout(() => {
                setJobs([
                    { id: 1, title: "Frontend Developer" },
                    { id: 2, title: "Backend Developer" }
                ])
                setIsLoading(false)
            }, 1000)
        }

        fetchJobs()
    }, [])

    return (
        <Box className="mt-12">
            <div className="my-4 text-2xl">Active jobs</div>
            <Box className="bg-white shadow rounded-lg">
                <div className=" flex justify-between items-center w-full p-6">
                    <div>
                        <div className="text-xl font-semibold">Manage jobs</div>
                    </div>
                </div>
                <Divider />
                <div className="mt-12 p-6">
                    <div className="text-xl text-center">
                        No jobs posted yet
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default ManageJobs
