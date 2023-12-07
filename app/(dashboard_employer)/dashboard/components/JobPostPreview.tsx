// JobPostPreview.tsx
import React from "react"
import { Box, Typography, Button, Divider } from "@mui/material"

interface JobDetails {
    companyName: string
    title: string
    description: string
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
        <div className="bg-white shadow p-6 rounded-lg w-full my-4 text-[14px] sm:text-[14px] leading-[20px] ">
            <Box display="flex" justifyContent="start" alignItems="center">
                <img
                    src={logoPreview || "upload-image_1.png"}
                    alt="Company Logo"
                    className="w-16 h-16 mr-4 rounded-md"
                />
                <div className="flex justify-center items-start flex-col">
                    <Typography
                        variant="h5"
                        gutterBottom
                        className="text-[#0000EE] mb-1"
                    >
                        {jobDetails.title || "Job Title"}
                    </Typography>
                    <Typography variant="subtitle1">
                        {jobDetails.companyName || "Company Name"}
                    </Typography>
                    <Typography variant="subtitle1">
                        {jobDetails.companyName || "Company Name"}
                    </Typography>
                </div>
            </Box>
            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
                <Box flexGrow={1} className="pr-4 mb-4 md:mb-0">
                    <Typography variant="subtitle1" fontWeight="bold">
                        Description
                    </Typography>
                    <Typography className="">
                        {jobDetails.description || "Job Description"}
                    </Typography>
                </Box>
                <Box className="flex flex-col items-start justify-center gap-y-1 md:px-4 md:items-end">
                    <Button
                        variant="contained"
                        color="primary"
                        className="mt-2 md:mt-0"
                    >
                        Send CV
                    </Button>
                    <Typography variant="subtitle2">
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}

export default JobPostPreview
