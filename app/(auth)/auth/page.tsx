"use client"
import { useState } from "react"
import Login from "../authModal/Login"
import Register from "../authModal/Register"
import { Box, Paper } from "@mui/material"

export default function EmployerHomePage() {
    const [displayRegister, setDisplayRegister] = useState<boolean>(false)

    return (
        <main className="flex justify-center items-center w-full h-full my-auto">
            <Paper className="flex flex-col items-center justify-center p-4 mx-auto md:w-1/2 lg:w-1/3 md:p-6 bg-white shadow-lg rounded-lg">
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
