"use client"
import React, { useEffect, useState } from "react"
import { useUser } from "@/context/AuthUserContext"
import { User } from "@/types"
import Link from "next/link"

export default function EmpoyersNav() {
    const user: User | undefined = useUser()
    const [isScrolling, setIsScrolling] = useState(false)
    let scrollTimeout: number | null = null

    const handleScroll = () => {
        if (!isScrolling) setIsScrolling(true)

        if (scrollTimeout !== null) {
            clearTimeout(scrollTimeout)
        }

        scrollTimeout = window.setTimeout(() => {
            setIsScrolling(false)
        }, 200) // Adjust the time to control the delay
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (scrollTimeout !== null) {
                clearTimeout(scrollTimeout)
            }
        }
    }, [])
    return (
        // <div className="fixed top-4 left-2/4 transform -translate-x-2/4 w-full md:w-[85%] mx-auto flex justify-between items-center px-4 py-3 bg-transparent z-50 ">
        <div
            className={`fixed z-50 mx-auto flex w-full transform items-center justify-between px-12 py-3 transition-all duration-700 ${
                isScrolling ? "opacity-0" : "bg-[#2D2D2D] opacity-100"
            }`}
        >
            <Link prefetch={false} href="/">
                <div className="relative h-[35px] w-[65px] cursor-pointer">
                    <img
                        src="/fruits_job_board_logo.png"
                        alt="harvest jobs logo"
                        className="h-full w-full"
                    />
                </div>
            </Link>
            <Link href="/dashboard">
                <button className="rounded border-0 bg-[#2557A7]  px-8 py-2 font-semibold text-white hover:bg-[#2557A7]">
                    POST
                </button>
            </Link>
        </div>
    )
}
