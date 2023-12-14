export default function PricingExplanation() {
    return (
        <div className="px-4 py-8 bg-white">
            <div className="text-center my-12 mb-16 text-black">
                <h1 className="font-bold text-4xl mb-4">No need to pay</h1>
                <p className="text-[18px]">
                    Posting a job requires no long-term contract, and there are
                    no initial costs, posting costs, or recruitment fees.
                </p>
            </div>

            <div className="flex justify-center">
                <div className="rounded-lg border flex flex-col space-y-4 w-full max-w-md p-6 bg-[#D6DBDC]">
                    <h2 className="text-center font-semibold text-2xl mb-4">
                        Why its Free
                    </h2>
                    <img
                        src="/free.png"
                        alt="Free"
                        className="w-[80%] md:w-1/2 h-auto mx-auto"
                    />
                    <p className="mt-4">
                        We are looking for the easiest way to start connecting
                        workers with employers.
                    </p>
                    <p>
                        Thats why it's extremely easy to create an account and
                        post a job on our platform.
                    </p>
                </div>
            </div>
            {/* Commented out for future use
            <div className="flex justify-center">
                <div className="rounded border flex flex-col space-y-4 w-full max-w-md p-6 bg-[#D6DBDC]">
                    <h2 className="text-center font-semibold text-xl mb-4">
                        Advantages of using paid options
                    </h2>
                    <img
                        src="/paid.png"
                        alt="Paid"
                        className="w-full md:w-1/2 h-auto mx-auto"
                    />
                    <p className="mt-4">
                        By using our paid option Sponsored Jobs, you can display
                        your company's job post at the top of the respective
                        country, making it easier to hire the workers you are
                        looking for.
                    </p>
                    <p>
                        Your post will be guaranteed to stay there for 7 days.
                    </p>
                </div>
            </div>
            */}
        </div>
    )
}

// The code below is with the 2 sibilings divs (Why its Free and Advantages of using paid options). Uncomment when the traffic is there
// export default function PricingExplanation() {
//     return (
//         <div className="bg-[#717171] px-4 py-8 pb-24">
//             <div className="text-center my-12 mb-16 text-white">
//                 <h1 className="font-bold  text-3xl mb-4">Fee structure</h1>
//                 <p className="">
//                     Posting a job requires no long-term contract, and there are
//                     no initial costs, posting costs, or recruitment success
//                     fees.
//                 </p>
//             </div>

//             <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
//                 <div className="rounded border flex flex-col space-y-4 w-full md:w-auto p-4 bg-[#D6DBDC]">
//                     <h2 className=" text-center font-semibold text-xl mb-4">
//                         Why its Free
//                     </h2>
//                     <img
//                         src="/free.png"
//                         alt="Free"
//                         className="w-[80%] md:w-1/2 h-auto mx-auto"
//                     />
//                     <p className=" mt-4">
//                         Our mission is to connect fruit pickers with employers.
//                         We believe that by posting more jobs, we can provide job
//                         seekers with more opportunities to find the job they
//                         desire.
//                     </p>
//                     <p className="">
//                         We provide a service that is free to hiring companies,
//                         just make your post free of charge.
//                     </p>
//                 </div>
//                 <div className="rounded border flex flex-col space-y-4 w-full md:w-auto p-4 bg-[#D6DBDC]">
//                     <h2 className=" text-center font-semibold text-xl mb-4">
//                         Advantages of using paid options
//                     </h2>
//                     <img
//                         src="/paid.png"
//                         alt="Paid"
//                         className="w-full md:w-1/2 h-auto mx-auto"
//                     />
//                     <p className=" mt-4">
//                         By using our paid option Sponsored Jobs, you can display
//                         your company's job post at the top of the respective
//                         country, making it easier to hire the workers you are
//                         looking for.
//                     </p>
//                     <p className="">
//                         Your post will be guaranteed to stay there for 7 days.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }
