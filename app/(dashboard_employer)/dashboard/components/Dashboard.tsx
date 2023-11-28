"use client"
import React from "react"
import { Button, Box, Divider } from "@mui/material"

type DashboardProps = {
    setView: (view: string) => void
}

const Dashboard = ({ setView }: DashboardProps) => {
    return (
        <Box className="mt-12">
            <div className="my-4 text-2xl">Welcome!</div>
            <Box className="bg-white shadow rounded-lg">
                <div className=" flex justify-between items-center w-full p-6">
                    <div>
                        <div className="text-xl font-semibold">My Jobs</div>
                    </div>

                    <Button
                        variant="contained"
                        onClick={() => setView("PostJob")}
                        sx={{
                            backgroundColor: "red !important",
                            color: "white"
                        }}
                    >
                        Post a job
                    </Button>
                </div>
                <Divider />
                <div className="mt-12 p-6">
                    <div className="text-xl text-center">
                        No jobs posted yet
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default Dashboard
