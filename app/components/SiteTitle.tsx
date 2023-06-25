const SiteTitle = () => {
    const today = new Date()

    const month = today.getMonth() + 1
    const day = today.getDate()
    const year = today.getFullYear()

    const dateString = `${month}/${day}/${year}`
    return (
        <>
            <h2 className="w-full text-center mb-4 text-2xl sm:text-3xl font-semibold">
                Fruits Picking Jobs Daily
            </h2>
            <h4 className="w-full text-center mb-4 font-semibold">
                Last updated: {dateString}
            </h4>
        </>
    )
}

export default SiteTitle
