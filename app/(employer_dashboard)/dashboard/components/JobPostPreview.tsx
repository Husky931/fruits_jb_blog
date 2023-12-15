// JobPostPreview.tsx
import React from "react"
import { Box, Typography, Button, Divider } from "@mui/material"

interface JobDetails {
    companyName: string
    title: string
    description: string
    country: string
    city: string
    url: string
    contact_email: string
}

interface JobPostPreviewProps {
    jobDetails: JobDetails
    logoPreview: string | null
}

const JobPostPreview: React.FC<JobPostPreviewProps> = ({
    jobDetails,
    logoPreview
}) => {
    return (
        <div className="w-full rounded-lg bg-white text-[14px] leading-[20px] shadow sm:text-[14px] ">
            <Box
                sx={{
                    // marginTop: "30px",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgb(243, 244, 246)",
                    padding: "10px",
                    borderRadius: "8px"
                }}
            >
                <div className="flex w-full items-center justify-start">
                    <Box sx={{ width: "100px", height: "100px" }}>
                        <img
                            className="max-h-full max-w-full"
                            src={logoPreview || "upload-image_1.png"}
                        />
                    </Box>
                    <Box sx={{ marginLeft: "25px" }}>
                        <div className="text-2xl font-bold text-[#0000EE] md:text-3xl">
                            {jobDetails.title || "Job Title"}
                        </div>
                        <div className="text-lg font-bold text-[#663300] md:text-xl">
                            {jobDetails.companyName || "Job Title"}
                        </div>
                        <div className="font-semibold">
                            {jobDetails.country.charAt(0).toUpperCase() +
                                jobDetails.country.slice(1).toLowerCase()}
                            , {jobDetails.city}
                        </div>
                    </Box>
                </div>

                <Box sx={{ marginTop: "30px" }}>
                    <div className="my-1 text-2xl font-semibold">
                        Job Description
                    </div>
                    {jobDetails.description.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                    {jobDetails.url && (
                        <div className="mt-2 text-blue-700">
                            {jobDetails.url}
                        </div>
                    )}
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                    <button className="mt-2 w-full rounded bg-red-500 px-4 py-2 font-bold text-white">
                        Upload CV
                    </button>
                    <div className="mt-2">
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default JobPostPreview
