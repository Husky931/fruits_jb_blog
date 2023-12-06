"use client"
import React, { useState } from "react"
import { Button, Box, Divider, Modal, Typography } from "@mui/material"
import { getTokenFromLocalCookie } from "@/app/utils/auth"
import Cookies from "js-cookie"
import ReusableModal from "./ReusableModal"

const PostJob = () => {
    const [jobDetails, setJobDetails] = useState({
        companyName: "",
        country: "",
        city: "",
        title: "",
        description: "",
        url: ""
    })

    const [successModalOpen, setSuccessModalOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const [errorModalOpen, setErrorModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [logoPreview, setLogoPreview] = useState<any>(null)

    const handleChange = (e: any) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })
    }

    const handleChangeImge = (e: any) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })

        // Handling file upload
        if (e.target.name === "companyLogo" && e.target.files.length > 0) {
            const file = e.target.files[0]
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    const handleSuccessClose = () => {
        setSuccessModalOpen(false)
        window.location.reload()
    }

    const handleErrorClose = () => {
        setErrorModalOpen(false)
    }

    async function createJobPost() {
        const id = Cookies.get("id")!
        try {
            const response = await fetch(
                "http://localhost:1337/api/job-posts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getTokenFromLocalCookie()}`
                    },
                    body: JSON.stringify({
                        data: {
                            posted_by: Cookies.get("id"),
                            company_name: jobDetails.companyName,
                            country_location: jobDetails.country,
                            city_location: jobDetails.city,
                            title: jobDetails.title,
                            job_description: jobDetails.description,
                            URL: jobDetails.url
                        }
                    })
                }
            )

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }

            const data = await response.json()
            setSuccessMessage(
                "Your job post has been successfully submitted and will be reviewed by a moderator within the next 24 hours. Please check your dashboard again after 24 hours."
            )
            setSuccessModalOpen(true)
            // window.location.reload()
        } catch (error) {
            console.error("Error creating job post:", error)
            setErrorMessage("There was an error processing your request.")
            setErrorModalOpen(true)
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
                    <Box mb={2}>
                        <label className="h-auto">
                            Company name *
                            <input
                                type="text"
                                name="companyName"
                                value={jobDetails.companyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
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
                                placeholder="Enter country name"
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
                                placeholder="Enter city name"
                                className="w-full p-2 border rounded mt-2"
                            />
                        </label>
                    </Box>
                    <Box mb={2}>
                        <label>
                            Job Title *
                            <input
                                type="text"
                                name="title"
                                value={jobDetails.title}
                                onChange={handleChange}
                                placeholder="Enter job title"
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
                                placeholder="Summarize the job duties"
                                className="w-full p-2 border rounded mt-2"
                            ></textarea>
                        </label>
                    </Box>
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
                        <div>
                            <div className="max-h-[200px] overflow-hidden">
                                <img
                                    src="upload-image_1.png"
                                    alt="Logo Preview"
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        </div>
                    </Box>
                    <Box mb={2}>
                        <label>
                            Website or social media URL
                            <input
                                type="text"
                                name="url"
                                value={jobDetails.url}
                                onChange={handleChange}
                                placeholder="Url link"
                                className="w-full p-2 border rounded mt-2"
                            />
                        </label>
                    </Box>
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
            <Button
                variant="contained"
                onClick={() => createJobPost()}
                sx={{
                    backgroundColor: "red !important",
                    color: "white",
                    width: "100%",
                    marginTop: "30px",
                    marginBottom: "20px",
                    padding: "8px",
                    fontWeight: "bold"
                }}
            >
                Post Job
            </Button>
            <ReusableModal
                open={successModalOpen}
                title="Success"
                description={successMessage}
                onClose={handleSuccessClose}
            />
            <ReusableModal
                open={errorModalOpen}
                title="Error"
                description={errorMessage}
                onClose={handleErrorClose}
            />
        </Box>
    )
}

export default PostJob
