import formatDistance from "date-fns/formatDistance"
import parseISO from "date-fns/parseISO"
import { Divider } from "@mui/material"

type SingleJobPostTypes = {
    title: string
    companyName: string
    country: string
    jobLocation: string
    jobDescription: string
    link: string
    date: string
    db_add_timestamp: string
}

const SingleClientPost: React.FC = () => {
    function isISOFormat(date: string) {
        // Regex for ISO 8601 format
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
        return regex.test(date)
    }

    // const displayDate = isISOFormat(db_add_timestamp)
    //     ? formatDistance(parseISO(db_add_timestamp), new Date(), {
    //           addSuffix: true
    //       })
    //     : date

    // THE SAME FUNCTION BELOW, BUT TO SHOW THE SCRAPER DATA FROM THE WEBSITES
    // const displayDate = isISOFormat(date)
    //     ? formatDistance(parseISO(date), new Date(), { addSuffix: true })
    //     : date

    return (
        // <a target="_blank" className="text-black no-underline">
        <div className="w-full my-4 text-[14px] sm:text-[14px] leading-[20px] border-2 rounded-md border-red-600 p-2">
            <div>
                <div className="text-2xl font-semibold underline text-red-600">
                    Direct farm apply
                </div>
            </div>
            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <div
                id="job-title"
                className="text-[14px] sm:text-[18px] font-semibold underline text-[#0000EE]"
            >
                bla
            </div>

            <div className="flex">
                <div className="font-bold">Company name: </div>
                <div className="text-[#663300] mx-1">Farm LLC</div>
            </div>
            <div className="flex">
                <div>Location: </div>
                <div className="mx-1 font-black">Sweden , Stoklom</div>
            </div>
            <div id="description" className="flex flex-col">
                <div className="line-clamp-2 overflow-ellipsis overflow-hidden">
                    <span>Description: </span>
                    <span className="">
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old.
                        Richard McClintock, a Latin professor at Hampden-Sydney
                        College in Virginia, looked up one of the more obscure
                        Latin words, consectetur, from a Lorem Ipsum passage,
                        and going through the cites of the word in classical
                        literature, discovered the undoubtable source. Lorem
                        Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                        Finibus Bonorum et Malorum" (The Extremes of Good and
                        Evil) by Cicero, written in 45 BC. This book is a
                        treatise on the theory of ethics, very popular during
                        the Renaissance. The first line of Lorem Ipsum, "Lorem
                        ipsum dolor sit amet..", comes from a line in section
                        1.10.32. The standard chunk of Lorem Ipsum used since
                        the 1500s is reproduced below for those interested.
                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
                        Malorum" by Cicero are also reproduced in their exact
                        original form, accompanied by English versions from the
                        1914 translation by H. Rackham.
                    </span>
                </div>
                <div className="text-[#0000EE]">read more</div>
            </div>

            <div className="text-gray-500 font-semibold">03/02/2023</div>
        </div>
        // </a>
    )
}

export default SingleClientPost
