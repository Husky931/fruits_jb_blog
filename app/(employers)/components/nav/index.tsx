import React from "react"
import Link from "next/link"
import Button from "@mui/material/Button"
import Image from "next/image"

export default function EmpoyersNav() {
    return (
        <div className="fixed top-4 left-2/4 transform -translate-x-2/4 w-full md:w-[85%] mx-auto flex justify-between items-center px-4 py-3 bg-transparent z-50 ">
            <Link prefetch={false} href="/">
                <div className="w-[50px] h-[40px] relative cursor-pointer">
                    <Image
                        src="/fruits_job_board_logo_blue.png"
                        alt="harvest jobs logo"
                        width="70"
                        height="70"
                        className="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4"
                    />
                </div>
            </Link>
            <Button
                className="bg-blue-600 text-white hover:bg-transparent hover:text-blue-600 border-blue-600 border-2 font-semibold py-2 px-8 rounded"
                variant="outlined"
                color="inherit"
            >
                POST
            </Button>
        </div>
    )
}
