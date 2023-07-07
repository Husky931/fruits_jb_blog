const SiteTitle = () => {
    const today = new Date()

    const month = today.getMonth() + 1
    const day = today.getDate()
    const year = today.getFullYear()

    const dateString = `${month}/${day}/${year}`
    return (
        <div className="w-full my-4">
            <h2 className="w-full text-center text-2xl sm:text-3xl font-semibold">
                Fruits Picking Jobs Daily
            </h2>
            <h4 className="w-full text-center font-semibold">
                Last updated: {dateString}
            </h4>
        </div>
    )
}

export default SiteTitle
