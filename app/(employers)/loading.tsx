"use client"
import { ColorRing } from "react-loader-spinner"

export default function Loading() {
    return (
        <div className="min-h-screen min-w-screen flex justify-center items-top z-50">
            <ColorRing
                visible={true}
                height="160"
                width="160"
                ariaLabel="blocks-loading"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
        </div>
    )
}
