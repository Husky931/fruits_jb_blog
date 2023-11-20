import Link from "next/link"

const SiteTitle = () => {
    const today = new Date()

    const month = today.getMonth() + 1
    const day = today.getDate()
    const year = today.getFullYear()

    const dateString = `${month}/${day}/${year}`
    return (
        <div className="w-full my-4">
            <Link
                prefetch={false}
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
            >
                <div className="w-full text-center text-2xl sm:text-3xl font-semibold">
                    Fruits Picking Jobs Daily
                </div>
            </Link>
            <div className="w-full text-center font-semibold text-[16px]">
                Last updated: {dateString}
            </div>
        </div>
    )
}

export default SiteTitle
