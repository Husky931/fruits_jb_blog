"use client"
import React, { useState } from "react"
import Menu from "./components/Menu"
import Dashboard from "./components/Dashboard"
import ManageJobs from "./components/ManageJobs"
import PostJob from "./components/PostJob"

const App = () => {
    const [currentView, setCurrentView] = useState("PostJob")

    return (
        <div className="h-full">
            <Menu />
            {currentView === "Dashboard" && <Dashboard />}
            {currentView === "ManageJobs" && <ManageJobs />}
            {currentView === "PostJob" && <PostJob />}
        </div>
    )
}

export default App
