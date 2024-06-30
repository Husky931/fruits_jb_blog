import React from "react"

interface PageHeaderProps {
    heading: string
    text?: string
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
    return (
        <div className="my-4 w-full text-center">
            {text && <span className="font-bold text-[#78B53B]">{text}</span>}
            {/* <h2 className="text-4xl my-4 lg:text-5xl font-bold font-heading">
                {heading}
            </h2> */}
        </div>
    )
}
