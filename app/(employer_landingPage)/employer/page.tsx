import HeroImage from "./components/HeroImage"
import PricingExplanation from "./components/PricingExplanation"
import ThreeSteps from "./components/ThreeSteps"
import Button from "@mui/material/Button"
import Link from "next/link"

export default function EmployerHomePage() {
    return (
        <main className="w-full h-auto">
            <HeroImage />
            <PricingExplanation />
            <ThreeSteps />
            <div className="w-full bg-white py-10 pt-10 md:pt-16 flex flex-col justify-center items-center">
                <div className="text-4xl text-center font-bold px-4">
                    Start hiring workers today
                </div>
                <Link href="/dashboard">
                    <button className="mt-12 lg:mt-18 py-3 px-20 rounded bg-[#2557A7] text-white font-bold">
                        Post a job
                    </button>
                </Link>
            </div>
        </main>
    )
}
