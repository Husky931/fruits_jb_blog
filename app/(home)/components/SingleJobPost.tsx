import formatDistance from "date-fns/formatDistance"
import parseISO from "date-fns/parseISO"
import { PostgresJobPostTypes } from "@/types"

const SingleJobPost: React.FC<PostgresJobPostTypes> = ({
    title,
    companyName,
    country,
    jobLocation,
    jobDescription,
    link,
    date,
    db_add_timestamp
}) => {
    function isISOFormat(date: string) {
        // Regex for ISO 8601 format
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
        return regex.test(date)
    }

    const displayDate = isISOFormat(db_add_timestamp)
        ? formatDistance(parseISO(db_add_timestamp), new Date(), {
              addSuffix: true
          })
        : date

    // THE SAME FUNCTION BELOW, BUT TO SHOW THE SCRAPER DATA FROM THE WEBSITES
    // const displayDate = isISOFormat(date)
    //     ? formatDistance(parseISO(date), new Date(), { addSuffix: true })
    //     : date

    return (
        <a href={link} target="_blank" className="text-black no-underline">
            <li className="w-full my-4 text-[14px] sm:text-[14px] leading-[20px]">
                <div
                    id="job-title"
                    className="text-[14px] sm:text-[18px] font-semibold underline text-[#0000EE]"
                >
                    {title}
                </div>

                <div className="flex">
                    <div className="font-bold">Company name: </div>
                    <div className="text-[#663300] mx-1">{companyName}</div>
                </div>
                <div className="flex">
                    <div>Location: </div>
                    <div className="mx-1 font-black">
                        {country.charAt(0).toUpperCase() +
                            country.slice(1).toLowerCase()}
                        , {jobLocation}
                    </div>
                </div>
                <div id="description" className="flex flex-col">
                    <div className="line-clamp-2 overflow-ellipsis overflow-hidden">
                        <span>Description: </span>
                        <span className="">{jobDescription}</span>
                    </div>
                    <div className="text-[#0000EE]">read more</div>
                </div>
                <div className="border-2 rounded-md border-custom-dark-blue p-1 my-1 inline-block">
                    Source: {new URL(link).hostname}
                </div>
                <div className="text-gray-500 font-semibold">{displayDate}</div>
            </li>
        </a>
    )
}

export default SingleJobPost
