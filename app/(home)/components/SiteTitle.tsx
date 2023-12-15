import Link from "next/link"

const SiteTitle = () => {
    const today = new Date()

    const month = today.getMonth() + 1
    const day = today.getDate()
    const year = today.getFullYear()

    const dateString = `${month}/${day}/${year}`
    return (
        <div className="my-4 w-full">
            <Link
                prefetch={false}
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
            >
                <div className="w-full text-center text-2xl font-semibold sm:text-3xl">
                    Fruits Picking Jobs Daily
                </div>
            </Link>
            <div className="w-full text-center text-[16px] font-semibold">
                Last updated: {dateString}
            </div>
        </div>
    )
}

export default SiteTitle
