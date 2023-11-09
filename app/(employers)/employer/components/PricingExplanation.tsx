export default function PricingExplanation() {
    return (
        <div className="bg-[#4D4D4D] px-4 py-8 pb-24">
            <div className="text-center my-12 mb-16">
                <h1 className="font-bold text-white text-3xl mb-4">
                    Fee structure
                </h1>
                <p className="text-white">
                    Posting a job requires no long-term contract, and there are
                    no initial costs, posting costs, or recruitment success
                    fees.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="rounded border flex flex-col space-y-4 w-full md:w-auto p-4">
                    <h2 className="text-white text-center font-semibold text-xl mb-4">
                        Why its Free
                    </h2>
                    <img
                        src="/free.png"
                        alt="Free"
                        className="w-[80%] md:w-1/2 h-auto mx-auto"
                    />
                    <p className="text-white mt-4">
                        Our mission is to connect fruit pickers with employers.
                        We believe that by posting more jobs, we can provide job
                        seekers with more opportunities to find the job they
                        desire.
                    </p>
                    <p className="text-white">
                        We provide a service that is free to hiring companies,
                        just make your post free of charge.
                    </p>
                </div>
                <div className="rounded border flex flex-col space-y-4 w-full md:w-auto p-4">
                    <h2 className="text-white text-center font-semibold text-xl mb-4">
                        Advantages of using paid options
                    </h2>
                    <img
                        src="/paid.png"
                        alt="Paid"
                        className="w-full md:w-1/2 h-auto mx-auto"
                    />
                    <p className="text-white mt-4">
                        By using our paid option Sponsored Jobs, you can display
                        your company's job post at the top of the respective
                        country, making it easier to hire the workers you are
                        looking for.
                    </p>
                    <p className="text-white">
                        Your post will be guaranteed to stay there for 7 days.
                    </p>
                </div>
            </div>
        </div>
    )
}
