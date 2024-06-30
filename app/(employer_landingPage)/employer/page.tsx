import HeroImage from "./components/HeroImage"
import PricingExplanation from "./components/PricingExplanation"
import ThreeSteps from "./components/ThreeSteps"
import Button from "@mui/material/Button"
import Link from "next/link"

export default function EmployerHomePage() {
    return (
        <main className="h-auto w-full">
            <HeroImage />
            <PricingExplanation />
            <ThreeSteps />
            <div className="flex w-full flex-col items-center justify-center bg-white py-10 pt-10 md:pt-16">
                <div className="px-4 text-center text-4xl font-bold">
                    Start hiring workers today
                </div>
                <Link href="/dashboard">
                    <button className="lg:mt-18 mt-12 rounded bg-[#2557A7] px-20 py-3 font-bold text-white">
                        Post a job
                    </button>
                </Link>
            </div>
        </main>
    )
}
