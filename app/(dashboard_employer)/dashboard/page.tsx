"use client"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { ColorRing } from "react-loader-spinner"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"

const MenuMobile = dynamic(() => import("./components/MenuMobile"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen w-screen flex justify-center items-center">
            <ColorRing
                visible={true}
                height="200"
                width="200"
                ariaLabel="blocks-loading"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
        </div>
    )
})
const MenuLeft = dynamic(() => import("./components/MenuWideScreen"), {
    ssr: false
})
const Dashboard = dynamic(() => import("./components/Dashboard"), {
    ssr: false
})
const ManageJobs = dynamic(() => import("./components/ManageJobs"), {
    ssr: false
})
const PostJob = dynamic(() => import("./components/PostJob"), { ssr: false })
import { useWidth } from "../../utils/useWindowWidth"

const App = () => {
    if (Cookies.get("jwt") === undefined) return redirect("/auth_employer")

    const [currentView, setCurrentView] = useState("PostJob")
    const [isOpen, setIsOpen] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        console.log("i have rendered")
    }, [])

    const width = useWidth()

    const setView = (view: any) => {
        setCurrentView(view)
        setIsOpen(false)
    }

    return (
        <div
            className={`h-full w-full ${
                isClient && width! > 629 ? "flex flex-row" : "flex flex-col"
            }`}
        >
            {isClient && width! > 629 ? (
                <MenuLeft setView={setView} />
            ) : (
                <MenuMobile
                    setView={setView}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                />
            )}
            <div className="flex-grow w-full px-8">
                {currentView === "Dashboard" && <Dashboard setView={setView} />}
                {currentView === "ManageJobs" && <ManageJobs />}
                {currentView === "PostJob" && <PostJob />}
            </div>
        </div>
    )
}

export default App
