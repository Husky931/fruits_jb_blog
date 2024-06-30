"use client"
import { ColorRing } from "react-loader-spinner"

export default function Loading() {
    return (
        <div className="min-w-screen items-top z-50 flex min-h-screen justify-center">
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
