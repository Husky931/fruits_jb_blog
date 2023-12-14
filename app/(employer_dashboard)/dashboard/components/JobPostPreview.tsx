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
    email: string
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
        <div className="bg-white shadow rounded-lg w-full text-[14px] sm:text-[14px] leading-[20px] ">
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
                <Box className="w-full flex justify-start items-center">
                    <Box sx={{ width: "100px", height: "100px" }}>
                        <img
                            className="max-w-full max-h-full"
                            src={logoPreview || "upload-image_1.png"}
                        />
                    </Box>
                    <Box sx={{ marginLeft: "25px" }}>
                        <div className="text-2xl md:text-3xl text-[#0000EE] font-bold">
                            {jobDetails.title || "Job Title"}
                        </div>
                        <div className="text-[#663300] font-bold text-lg md:text-xl">
                            {jobDetails.companyName || "Job Title"}
                        </div>
                        <div className="font-semibold">
                            {jobDetails.country.charAt(0).toUpperCase() +
                                jobDetails.country.slice(1).toLowerCase()}
                            , {jobDetails.city}
                        </div>
                    </Box>
                </Box>

                <Box sx={{ marginTop: "30px" }}>
                    <div className="font-semibold text-2xl my-1">
                        Job Description
                    </div>
                    {jobDetails.description.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                    {jobDetails.url && (
                        <div className="text-blue-700 mt-2">
                            {jobDetails.url}
                        </div>
                    )}
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                    <button className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded w-full">
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
