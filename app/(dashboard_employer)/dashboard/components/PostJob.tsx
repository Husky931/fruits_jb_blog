"use client"
import React, { useState } from "react"
import { Button, Box, Divider, Modal, Typography } from "@mui/material"
import { getTokenFromLocalCookie } from "@/app/utils/auth"
import Cookies from "js-cookie"
import ReusableModal from "./ReusableModal"
import JobPostPreview from "./JobPostPreview"
import { processImage } from "@/app/utils/processImage"

const PostJob = () => {
    const [jobDetails, setJobDetails] = useState({
        companyName: "",
        country: "",
        city: "",
        title: "",
        description: "",
        url: "",
        email: ""
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
        const file = e.target.files[0]

        if (file) {
            // Validate file size and dimensions
            const maxFileSize = 5 * 1024 * 1024 // 5MB
            if (file.size > maxFileSize) {
                alert("File size should be less than 5MB")
                return
            }

            const img = new Image()
            img.onload = () => {
                const width = img.naturalWidth
                const height = img.naturalHeight

                if (width > 1024 || height > 1024) {
                    alert("Image dimensions should be less than 1024 x 1024")
                    return
                }

                setLogoPreview(URL.createObjectURL(file))
            }
            img.src = URL.createObjectURL(file)
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
        const formData = new FormData()

        formData.append(
            "data",
            JSON.stringify({
                posted_by: Cookies.get("id"),
                company_name: jobDetails.companyName,
                country_location: jobDetails.country,
                city_location: jobDetails.city,
                title: jobDetails.title,
                job_description: jobDetails.description,
                URL: jobDetails.url
            })
        )

        const fileInput = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            try {
                const processedBlob = await processImage(fileInput.files[0])
                formData.append(
                    "files.company_logo",
                    processedBlob,
                    "company_logo.webp"
                )
            } catch (error) {
                console.error("Error processing image:", error)
                alert(error)
            }
        }

        try {
            const response = await fetch(
                "http://localhost:1337/api/job-posts",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalCookie()}`
                    },
                    body: formData
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
            setErrorMessage(
                "There was an error processing your request. Is your company "
            )
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
                        <label>
                            Contact email
                            <input
                                type="text"
                                name="email"
                                value={jobDetails.email}
                                onChange={handleChange}
                                placeholder="Email for applications"
                                className="w-full p-2 border rounded mt-2"
                            />
                        </label>
                    </Box>
                    <Box mb={2}>
                        <label className="mb-6">
                            Company logo
                            <input
                                type="file"
                                name="companyLogo"
                                onChange={handleChangeImge}
                                placeholder="Company Logo File"
                                className="w-full p-2 border rounded mt-2"
                            />
                        </label>
                        <div>
                            <div className="max-h-[200px] overflow-hidden">
                                <img
                                    src={
                                        !logoPreview
                                            ? `upload-image_1.png`
                                            : logoPreview
                                    }
                                    alt="Logo Preview"
                                    className="h-full w-auto object-cover"
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

                <div className=" flex justify-between items-center w-full p-6">
                    <JobPostPreview
                        jobDetails={jobDetails}
                        logoPreview={logoPreview}
                    />
                </div>
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
                type="success"
            />
            <ReusableModal
                open={errorModalOpen}
                title="Error"
                description={errorMessage}
                onClose={handleErrorClose}
                type="error"
            />
        </Box>
    )
}

export default PostJob
