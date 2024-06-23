"use client"
import React, { useState } from "react"
import { Button, Box, Divider, Modal, Select, MenuItem } from "@mui/material"
import { getTokenFromLocalCookie } from "@/app/utils/auth"
import Cookies from "js-cookie"
import ReusableModal from "@/app/components/ReusableModal"
import JobPostPreview from "./JobPostPreview"
import { processImage } from "@/app/utils/processImage"

type JobDetails = {
    companyName: string
    country: string
    city: string
    title: string
    description: string
    url: string
    contact_email: string
    [key: string]: string // This is the index signature
}

const PostJob = () => {
    const [jobDetails, setJobDetails] = useState<JobDetails>({
        companyName: "",
        country: "",
        city: "",
        title: "",
        description: "",
        url: "",
        contact_email: ""
    })

    const [successModalOpen, setSuccessModalOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const [errorModalOpen, setErrorModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const [logoPreview, setLogoPreview] = useState<any>(null)
    const [countryModalOpen, setCountryModalOpen] = useState(false)
    const [countryInput, setCountryInput] = useState("")

    const handleChange = (e: any) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })
    }

    const handleCountryChange = (e: any) => {
        if (e.target.value === "other") {
            setCountryModalOpen(true)
        } else {
            setJobDetails({ ...jobDetails, country: e.target.value })
        }
    }

    const handleCountryModalClose = () => {
        setCountryModalOpen(false)
        setJobDetails({ ...jobDetails, country: countryInput })
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
        const requiredFields = [
            "companyName",
            "title",
            "description",
            "country",
            "city",
            "contact_email"
        ]
        for (let field of requiredFields) {
            if (!jobDetails[field].trim()) {
                setErrorMessage(`Please fill out the ${field} field.`)
                setErrorModalOpen(true)
                return // Stop the function execution if a field is empty
            }
        }

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
                URL: jobDetails.url,
                contact_email: jobDetails.contact_email
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
                `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/job-posts`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalCookie()}`
                    },
                    body: formData
                }
            )

            const data = await response.json()
            if (data.error) {
                throw new Error(data.error.message)
            }

            setSuccessMessage(
                "Your job post has been successfully submitted and will be reviewed by a moderator within the next 24 hours. Please check your dashboard again after 24 hours."
            )
            setSuccessModalOpen(true)
            window.location.reload()
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("Please fill all the required fields")
            }
            setErrorModalOpen(true)
        }
    }

    return (
        <div className="relative mt-12">
            <div className="my-4 text-2xl">Post a Job</div>
            <div className="rounded-lg bg-white shadow">
                <div className=" flex w-full items-center justify-between p-6">
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
                                autoComplete="off"
                                value={jobDetails.companyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                className="mt-2 w-full rounded border p-2"
                            />
                        </label>
                    </Box>
                    <Box mb={2}>
                        <label>
                            Country *
                            <Select
                                value={jobDetails.country}
                                onChange={handleCountryChange}
                                sx={{
                                    width: "100%",
                                    border: 1,
                                    borderRadius: "4px",
                                    mt: "8px"
                                }}
                            >
                                <MenuItem value="usa">USA</MenuItem>
                                <MenuItem value="canada">Canada</MenuItem>
                                <MenuItem value="uk">UK</MenuItem>
                                <MenuItem value="france">France</MenuItem>
                                <MenuItem value="austria">Austria</MenuItem>
                                <MenuItem value="spain">Spain</MenuItem>
                                <MenuItem value="italy">Italy</MenuItem>
                                <MenuItem value="belgium">Belgium</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                                {countryInput && (
                                    <MenuItem value={countryInput}>
                                        {countryInput}
                                    </MenuItem>
                                )}
                            </Select>
                        </label>
                    </Box>
                    <Box mb={2}>
                        <label>
                            City *
                            <input
                                type="text"
                                name="city"
                                autoComplete="off"
                                value={jobDetails.city}
                                onChange={handleChange}
                                placeholder="Enter city name"
                                className="mt-2 w-full rounded border p-2"
                            />
                        </label>
                    </Box>
                    <Box mb={2}>
                        <label>
                            Job Title *
                            <input
                                type="text"
                                name="title"
                                autoComplete="off"
                                value={jobDetails.title}
                                onChange={handleChange}
                                placeholder="Enter job title"
                                className="mt-2 w-full rounded border p-2"
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
                                className="mt-2 w-full rounded border p-2"
                                rows={10}
                            ></textarea>
                        </label>
                    </Box>
                </div>
            </div>
            <div className="mt-12 rounded-lg bg-white shadow">
                <div className=" flex w-full items-center justify-between p-6">
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
                            Email to receive applications *
                            <input
                                type="text"
                                name="contact_email"
                                autoComplete="off"
                                value={jobDetails.contact_email}
                                onChange={handleChange}
                                placeholder="Email for applications"
                                className="mt-2 w-full rounded border p-2"
                            />
                        </label>
                    </Box>
                    <Box mb={2}>
                        <label className="mb-6">
                            Company logo
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/gif"
                                autoComplete="off"
                                name="companyLogo"
                                onChange={handleChangeImge}
                                placeholder="Company Logo File"
                                className="mt-2 w-full rounded border p-2"
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
                                autoComplete="off"
                                value={jobDetails.url}
                                onChange={handleChange}
                                placeholder="Url link"
                                className="mt-2 w-full rounded border p-2"
                            />
                        </label>
                    </Box>
                </div>
            </div>
            <div className="mt-12 rounded-lg bg-white shadow">
                <div className=" flex w-full items-center justify-between p-6">
                    <div>
                        <div className="text-xl font-semibold">
                            Job Post Preview
                        </div>
                    </div>
                </div>
                <Divider />

                <div className=" flex w-full items-center justify-between p-6">
                    <JobPostPreview
                        jobDetails={jobDetails}
                        logoPreview={logoPreview}
                    />
                </div>
            </div>
            <Button
                variant="contained"
                onClick={() => createJobPost()}
                sx={{
                    color: "white",
                    width: "100%",
                    marginTop: "50px",
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
            {/* className="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4" */}
            <Modal open={countryModalOpen} onClose={handleCountryModalClose}>
                <Box
                    sx={{
                        padding: 2,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgb(215,220,221)",
                        borderRadius: "4px",
                        minWidth: "270px"
                    }}
                >
                    <div className="text-xl text-black">Enter Country Name</div>
                    <input
                        type="text"
                        autoComplete="off"
                        value={countryInput}
                        onChange={(e) => setCountryInput(e.target.value)}
                        className="mt-2 w-full rounded border p-2"
                    />
                    <Button
                        onClick={handleCountryModalClose}
                        variant="contained"
                        sx={{
                            marginTop: "20px",
                            backgroundColor: "red",
                            "&:hover": {
                                backgroundColor: "red"
                            }
                        }}
                    >
                        OK
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default PostJob
