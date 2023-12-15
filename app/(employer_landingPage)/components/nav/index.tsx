"use client"
import React, { useEffect, useState } from "react"
import { useUser } from "@/context/AuthUserContext"
import { User } from "@/types"
import Link from "next/link"
import Button from "@mui/material/Button"

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
            className={`fixed transform w-full mx-auto flex justify-between items-center px-12 py-3 z-50 transition-all duration-700 ${
                isScrolling ? "opacity-0" : "opacity-100 bg-[#2D2D2D]"
            }`}
        >
            <Link prefetch={false} href="/">
                <div className="w-[65px] h-[35px] relative cursor-pointer">
                    <img
                        src="/fruits_job_board_logo.png"
                        alt="harvest jobs logo"
                        className="h-full w-full"
                    />
                </div>
            </Link>
            <Link href="/dashboard">
                <Button
                    sx={{
                        backgroundColor: "#2557A7",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#2557A7"
                        },
                        border: 0,
                        fontWeight: "bold",
                        py: 2,
                        px: 8,
                        borderRadius: "4px"
                    }}
                    variant="outlined"
                    color="inherit"
                >
                    POST
                </Button>
            </Link>
        </div>
    )
}
