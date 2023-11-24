"use client"
import React, { useState, useEffect } from "react"

const ManageJobs = () => {
    const [jobs, setJobs] = useState([])
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
        <div className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="mb-4">
                    <h1 className="text-xl font-semibold">Manage Jobs</h1>
                </div>
                {isLoading ? (
                    <p>Loading jobs...</p>
                ) : jobs.length === 0 ? (
                    <p>No jobs posted yet.</p>
                ) : (
                    <ul>
                        {jobs.map((job) => (
                            <li
                                key={job.id}
                                className="border-b border-gray-200 p-4"
                            >
                                {job.title}
                                {/* Add action buttons or links here */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default ManageJobs
