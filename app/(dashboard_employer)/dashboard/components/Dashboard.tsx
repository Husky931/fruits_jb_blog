"use client"
import React from "react"

const Dashboard = () => {
    // This is where you can add state and other logic for the Dashboard

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="mb-4">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                </div>
                <div>
                    {/* Example content, replace with your own */}
                    <p>
                        Welcome to your Dashboard! Here you can view your job
                        listings and other relevant information.
                    </p>

                    {/* Dashboard widgets or other components can be added here */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
