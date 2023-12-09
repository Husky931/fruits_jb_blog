"use client"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { ColorRing } from "react-loader-spinner"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"
import { useUser } from "@/context/AuthUserContext"
import { User } from "@/types"

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
    const [currentView, setCurrentView] = useState("Dashboard")
    const [isOpen, setIsOpen] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const user: User | undefined = useUser()
    // console.log(user, "i am user")

    useEffect(() => {
        setIsClient(true)
        if (Cookies.get("jwt") === undefined) return redirect("/auth_employer")
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
                {currentView === "Dashboard" && (
                    <Dashboard setView={setView} user={user} />
                )}
                {currentView === "ManageJobs" && <ManageJobs user={user} />}
                {currentView === "PostJob" && <PostJob />}
            </div>
        </div>
    )
}

export default App
