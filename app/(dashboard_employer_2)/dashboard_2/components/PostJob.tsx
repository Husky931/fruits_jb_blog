"use client"
import React, { useState } from "react"
import { Button, Box, Divider } from "@mui/material"

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

    const [logoPreview, setLogoPreview] = useState(null) // State for the logo preview

    const handleChangeImge = (e) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })

        // Handling file upload
        if (e.target.name === "companyLogo" && e.target.files.length > 0) {
            const file = e.target.files[0]
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    return (
        <Box className="mt-12">
            <div className="my-4 text-2xl">Post a Job</div>
            <Box className="bg-white shadow rounded-lg">
                <div className=" flex justify-between items-center w-full p-6">
                    <div>
                        <div className="text-xl font-semibold">
                            Job Description
                        </div>
                    </div>
                </div>
                <Divider />
                <div className=" p-6">
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <label className="h-auto">
                                Company name *
                                <input
                                    type="text"
                                    name="companyName"
                                    value={jobDetails.companyName}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="w-full p-2 border rounded mt-2"
                                />
                            </label>
                        </Box>
                        <Box mb={2}>
                            <label>
                                Country *
                                <input
                                    type="text"
                                    name="country"
                                    value={jobDetails.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="w-full p-2 border rounded mt-2"
                                />
                            </label>
                        </Box>
                        <Box mb={2}>
                            <label>
                                City *
                                <input
                                    type="text"
                                    name="city"
                                    value={jobDetails.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full p-2 border rounded mt-2"
                                />
                            </label>
                        </Box>
                        <Box mb={2}>
                            <label>
                                Description *
                                <textarea
                                    name="description"
                                    value={jobDetails.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className="w-full p-2 border rounded mt-2"
                                ></textarea>
                            </label>
                        </Box>
                    </form>
                </div>
            </Box>
            <Box className="bg-white shadow rounded-lg mt-12">
                <div className=" flex justify-between items-center w-full p-6">
                    <div>
                        <div className="text-xl font-semibold">
                            Company Information - Optional
                        </div>
                    </div>
                </div>
                <Divider />
                <div className=" p-6">
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <label className="mb-6">
                                Company logo
                                <input
                                    type="file"
                                    onChange={handleChangeImge}
                                    placeholder="Company Logo File"
                                    className="w-full p-2 border rounded mt-2"
                                />
                            </label>
                            <img
                                src="upload-image.png"
                                alt="Logo Preview"
                                className=" max-h-[200px]"
                            />
                        </Box>
                        <Box mb={2}>
                            <label>
                                Company social media URL
                                <input
                                    type="text"
                                    name="country"
                                    value={jobDetails.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="w-full p-2 border rounded mt-2"
                                />
                            </label>
                        </Box>
                    </form>
                </div>
            </Box>
            <Box className="bg-white shadow rounded-lg mt-12">
                <div className=" flex justify-between items-center w-full p-6">
                    <div>
                        <div className="text-xl font-semibold">
                            Job Post Preview
                        </div>
                    </div>
                </div>
                <Divider />
                <div className=" p-6"></div>
            </Box>
            <Box className="bg-white shadow rounded-lg mt-12">
                <div className=" flex justify-between items-center w-full p-6">
                    <div>
                        <div className="text-xl font-semibold">Job Preview</div>
                    </div>
                </div>
                <Divider />
                <div className=" p-6"></div>
            </Box>
        </Box>
    )
}

export default PostJob
