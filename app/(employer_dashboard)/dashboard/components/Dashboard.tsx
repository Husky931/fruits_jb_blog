"use client"
import React from "react"
import { Button, Divider } from "@mui/material"
import { User } from "@/types"

type DashboardProps = {
    setView: (view: string) => void
    user: User | undefined
}

const Dashboard = ({ setView, user }: DashboardProps) => {
    return (
        <div className="mt-12">
            <div className="my-4 text-2xl">Welcome!</div>
            <div className="rounded-lg bg-white shadow">
                <div className=" flex w-full items-center justify-between p-6">
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
                    {user && user.job_posts.length > 0 ? (
                        user &&
                        user.job_posts.map((job) => (
                            <div
                                key={job.id}
                                className="mb-4 rounded-lg bg-gray-100 p-4 shadow md:grid md:grid-cols-2 md:grid-rows-2"
                            >
                                <div className="md:col-span-2">
                                    <div className="mb-2 text-xl font-semibold">
                                        {job.title}
                                    </div>
                                </div>
                                <div className="text-gray-500">
                                    <div className="mb-1">
                                        {job.company_name}
                                    </div>
                                    <div className="mb-1">
                                        {job.country_location},{" "}
                                        {job.city_location}
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:text-right">
                                    <div className="mb-1 text-red-500">
                                        Status:{" "}
                                        <span
                                            className={`mb-1 ${
                                                job.moderation_status ===
                                                "pending"
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            } font-semibold`}
                                        >
                                            {job.moderation_status}
                                        </span>
                                    </div>
                                    <div className="text-gray-500">
                                        Posted on:{" "}
                                        {new Date(
                                            job.createdAt
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-xl">
                            No jobs posted yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
