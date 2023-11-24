"use client"
import React, { useState } from "react"
import Menu from "./components/Menu"
import Dashboard from "./components/Dashboard"
import ManageJobs from "./components/ManageJobs"
import PostJob from "./components/PostJob"

const App = () => {
    const [currentView, setCurrentView] = useState("PostJob")
    const [isOpen, setIsOpen] = useState(false)

    const setView = (view: string) => {
        setCurrentView(view)
        setIsOpen(false)
    }

    return (
        <div className="h-full">
            <Menu setView={setView} setIsOpen={setIsOpen} isOpen={isOpen} />
            {currentView === "Dashboard" && <Dashboard setView={setView} />}
            {currentView === "ManageJobs" && <ManageJobs />}
            {currentView === "PostJob" && <PostJob />}
        </div>
    )
}

export default App
