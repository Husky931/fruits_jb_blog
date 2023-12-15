"use client"
import { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"
import { Box, Paper } from "@mui/material"

export default function EmployerHomePage() {
    const [displayRegister, setDisplayRegister] = useState<boolean>(false)

    return (
        <main
            className="my-auto flex h-full w-full items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/auth_bg_2.webp')",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(255, 255, 255, 0.3)"
            }}
        >
            <Paper className="ml-[10px] mr-[10px] flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg md:w-1/2 md:p-6 lg:w-1/3">
                {/* <img
                    src="/fruits_job_board_logo_blue.png"
                    style={{ width: "80px", height: "22px" }}
                    alt="logo"
                /> */}

                {displayRegister ? (
                    <Register setDisplayRegister={setDisplayRegister} />
                ) : (
                    <Login setDisplayRegister={setDisplayRegister} />
                )}
            </Paper>
        </main>
    )
}
