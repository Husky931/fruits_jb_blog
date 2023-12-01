export default async function HomeText() {
    return (
        <div className="seo-text mt-8 md:mt-12">
            <h1 className="text-center">
                Welcome to the World of Fruit Picking Jobs!
            </h1>
            <h3>
                Your one-stop destination for fruit picker positions, farm labor
                opportunities, and seasonal worker roles across the globe
            </h3>

            <p>
                Are you looking for seasonal picking work? We are a platform
                that <span className="font-semibold">collects and display</span>{" "}
                all sorts of harvesting and seasonal fruits related picking jobs
                from various websites, farms and agencies and displays them in
                one place.
            </p>

            <p>
                This is a place where a job seeker can come, get the needed
                information and try to find a job in this industry. Have a
                specific country in mind that you want to do some picking in? We
                present country-specific information, so just select the country
                you want to find a job in. You can find additional information
                in the{" "}
                <a
                    className="text-[#0000FF] font-semibold"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog`}
                    target="_blank"
                >
                    blog section
                </a>{" "}
                about visa related issues or just related topics about the fruit
                picking industry and we are in the process of{" "}
                <span className="font-semibold">making a forum</span>, so the
                fruit pickers and harvest workers can more easily exchange
                information.
            </p>

            <p>
                If you have any questions, contact us and we will get back to
                you.
            </p>

            <p>Easy picking.</p>
        </div>
    )
}
