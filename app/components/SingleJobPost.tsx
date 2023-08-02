type SingleJobPostTypes = {
    title: string
    companyName: string
    country: string
    jobLocation: string
    jobDescription: string
    link: string
    date: string
}

const SingleJobPost: React.FC<SingleJobPostTypes> = ({
    title,
    companyName,
    country,
    jobLocation,
    jobDescription,
    link,
    date
}) => {
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
                    <div className="">Company name: </div>
                    <div className="text-[#663300] mx-1 font-semibold">
                        {companyName}
                    </div>
                </div>
                <div className="flex">
                    <div className="">Location: </div>
                    <div className="mx-1 font-semibold">
                        {country.charAt(0).toUpperCase() +
                            country.slice(1).toLowerCase()}
                        , {jobLocation}
                    </div>
                </div>
                <div id="description" className="flex flex-col">
                    <div className="line-clamp-2 overflow-ellipsis overflow-hidden">
                        <span className="">Description: </span>
                        <span className="font-semibold">{jobDescription}</span>
                    </div>
                    <div className="text-[#0000EE]">read more</div>
                </div>
                <div className="text-gray-500 font-semibold">{date}</div>
            </li>
        </a>
    )
}

export default SingleJobPost
