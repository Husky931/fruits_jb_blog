"use client"
import React, { useState } from "react"

const PostJob = () => {
    const [jobDetails, setJobDetails] = useState({
        companyName: "",
        country: "",
        city: "",
        description: ""
        // Add other fields as necessary
    })

    const handleChange = (e) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle job posting logic here
        console.log("Job Details:", jobDetails)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    {/* Job Description */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">
                            Job Description
                        </h2>
                        <input
                            type="text"
                            name="companyName"
                            value={jobDetails.companyName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full p-2 border rounded mt-2"
                        />
                        <input
                            type="text"
                            name="country"
                            value={jobDetails.country}
                            onChange={handleChange}
                            placeholder="Country"
                            className="w-full p-2 border rounded mt-2"
                        />
                        <input
                            type="text"
                            name="city"
                            value={jobDetails.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full p-2 border rounded mt-2"
                        />
                        <textarea
                            name="description"
                            value={jobDetails.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full p-2 border rounded mt-2"
                        ></textarea>
                    </div>

                    {/* Additional fields like 'Company Information', 'Job Post Preview', etc., can be added here */}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Post Job
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PostJob
