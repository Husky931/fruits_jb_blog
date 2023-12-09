import React from "react"
import { Divider, Box, Typography, Button } from "@mui/material"
import { StrapiPostAttributes } from "@/types"

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
        <div className="w-full my-4 text-[14px] sm:text-[14px] leading-[20px] bg-gray-100 p-4 rounded-lg shadow p-2">
            <div className="text-2xl font-semibold  text-red-600">
                Direct farm apply
            </div>
            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <Box display="flex" justifyContent="start" alignItems="center">
                <img
                    src={getImageUrl()}
                    alt="company logo"
                    className="w-16 h-16 mr-4 rounded-md" // Thumbnail size image
                />
                <div className="flex justify-center items-start flex-col">
                    <div className="text-[#0000EE] text-[24px] mb-1">
                        {title}
                    </div>
                    <div className="text-[#663300] text-base">
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
                <Box flexGrow={1} className="pr-4 mb-4 sm:mb-0">
                    <Typography variant="subtitle1" fontWeight="bold">
                        Description
                    </Typography>
                    <Typography className="line-clamp-4 overflow-ellipsis overflow-hidden">
                        {job_description}
                    </Typography>
                </Box>
                <Box className="flex flex-col items-start justify-center gap-y-1 md:px-4 sm:items-end">
                    <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
