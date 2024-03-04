import Button from "@mui/material/Button"
import Link from "next/link"

export default function HeroImage() {
    return (
        <header className="relative h-[400px] w-full bg-[url('/employers-mob.webp')] bg-cover bg-top bg-no-repeat md:h-[400px] md:bg-[url('/employers.webp')] xl:h-[500px] 2xl:h-[700px]">
            <div className="z-10 flex h-full w-auto flex-col items-center justify-center p-4 text-center md:ml-4 md:items-start md:justify-center 2xl:ml-16">
                <h1 className="text-[40px] font-bold !text-white lg:text-[60px]">
                    Get your New hire
                </h1>
                <p className="mt-2 text-[20px] text-white">
                    Post a job for free and find the right candidate
                </p>
                <Link href="/dashboard">
                    <button className="lg:mt-18 mt-12 rounded bg-[#2557A7] px-20 py-3 font-bold text-white md:ml-4">
                        Post a job
                    </button>
                </Link>
            </div>
        </header>
    )
}
