import React from "react"
import { Divider, Box, Typography } from "@mui/material"
import { StrapiPostAttributes } from "@/types"
import PushPinIcon from "@mui/icons-material/PushPin"

const SingleClientPost: React.FC<StrapiPostAttributes> = ({
    title,
    job_description,
    updatedAt,
    company_name,
    company_logo,
    country_location,
    city_location
}) => {
    const getImageUrl = () => {
        if (company_logo.data) {
            const { url, formats } = company_logo.data.attributes
            // Use thumbnail size for all screen sizes
            return `${process.env.NEXT_PUBLIC_STRAPI_SERVER}${formats.thumbnail.url}`
        }
        return "upload-image_1.png"
    }

    return (
        <div className="my-4 w-full rounded-lg bg-gray-100 p-4 text-[14px] leading-[20px] shadow sm:text-[14px]">
            <div className="text-2xl font-semibold  text-red-600">
                <PushPinIcon sx={{ color: "black", mr: "8px" }} />
                Direct farm apply
            </div>
            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <Box display="flex" justifyContent="start" alignItems="center">
                <img
                    src={getImageUrl()}
                    alt="company logo"
                    className="mr-4 h-16 w-16 rounded-md" // Thumbnail size image
                />
                <div className="flex flex-col items-start justify-center">
                    <div className="mb-1 text-[24px] text-[#0000EE]">
                        {title}
                    </div>
                    <div className="text-base font-bold text-[#663300]">
                        {company_name}
                    </div>
                    <div className="font-semibold">
                        {country_location.charAt(0).toUpperCase() +
                            country_location.slice(1).toLowerCase()}
                        , {city_location}
                    </div>
                </div>
            </Box>
            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
                <Box flexGrow={1} className="mb-4 pr-4 sm:mb-0">
                    <Typography variant="subtitle1" fontWeight="bold">
                        Description
                    </Typography>
                    <Typography className="line-clamp-4 overflow-hidden overflow-ellipsis">
                        {job_description}
                    </Typography>
                </Box>
                <Box className="flex flex-col items-start justify-center gap-y-1 sm:items-end md:px-4">
                    <button className="mt-2 rounded  bg-blue-500 px-4 py-2 font-bold text-white">
                        Apply
                    </button>
                    <Typography variant="subtitle2">
                        {new Date(updatedAt).toLocaleDateString("en-US", {
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

export default SingleClientPost
