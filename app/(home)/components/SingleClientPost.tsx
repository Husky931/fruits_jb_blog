import React from "react"
import formatDistance from "date-fns/formatDistance"
import parseISO from "date-fns/parseISO"
import { Divider } from "@mui/material"
import { StrapiPostAttributes } from "@/types"

const SingleClientPost: React.FC<StrapiPostAttributes> = ({
    title,
    job_description,
    createdAt,
    updatedAt,
    publishedAt,
    city_location,
    company_name,
    country_location,
    URL,
    moderation_status,
    status,
    company_logo
}) => {
    const getImageUrl = () => {
        if (company_logo.data) {
            const { url, formats } = company_logo.data.attributes
            // Use different sizes for different screen sizes
            const imageUrl =
                window.innerWidth > 768
                    ? url
                    : window.innerWidth > 480
                    ? formats.small.url
                    : formats.thumbnail.url
            return `${process.env.NEXT_PUBLIC_STRAPI_SERVER}${imageUrl}`
        }
        return "upload-image_1.png"
    }

    return (
        <div className="w-full my-4 text-[14px] sm:text-[14px] leading-[20px] border-2 rounded-md border-red-600 p-2">
            <div className="text-2xl font-semibold underline text-red-600">
                Direct farm apply
            </div>
            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <div className="flex flex-col sm:flex-row">
                {/* Adjusted image size to be smaller */}
                <div className="sm:w-1/6 m-auto">
                    <img
                        src={getImageUrl()}
                        alt="company logo"
                        className="max-w-full h-auto rounded-md"
                    />
                </div>
                <div className="sm:w-5/6 sm:pl-4">
                    <div className="text-2xl font-semibold text-[#0000EE]">
                        {title}
                    </div>
                    <div>
                        <div className="flex">
                            <div className="font-bold">Company name:</div>
                            <div className="text-[#663300] mx-1">
                                {company_name}
                            </div>
                        </div>
                        <div className="flex">
                            <div>Location: </div>
                            <div className="font-bold">
                                {country_location}, {city_location}
                            </div>
                        </div>
                        {/* Truncate job_description text */}
                        <div className="line-clamp-2 overflow-ellipsis overflow-hidden">
                            Description: {job_description}
                        </div>
                        <div>
                            Posted:{" "}
                            {new Date(updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </div>
                        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleClientPost
