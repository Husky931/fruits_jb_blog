"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const Countries = () => {
    const pathname = usePathname()
    const countries = [
        "australia",
        "austria",
        "belgium",
        "canada",
        "denmark",
        "england",
        "finland",
        "france",
        "germany",
        // "greece",
        "ireland",
        "italy",
        "japan",
        "new-zealand",
        "norway",
        "spain",
        "sweden",
        "usa"
    ]
    return (
        <ul className="container px-6 my-2">
            <li className="inline-block px-1 mx-1 cursor-pointer">
                <Link
                    className={
                        pathname === "/"
                            ? "text-[#0000EE] font-semibold"
                            : "text-black"
                    }
                    href="/"
                    as="/"
                >
                    All
                </Link>
            </li>
            {countries.map((link) => {
                const isActive = pathname.startsWith(`/${link}`)
                return (
                    <li
                        className="inline-block px-1 mx-1 cursor-pointer"
                        key={link}
                    >
                        <Link
                            className={
                                isActive
                                    ? "text-[#0000EE] font-semibold"
                                    : "text-black"
                            }
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link}`}
                            as={`${process.env.NEXT_PUBLIC_BASE_URL}/${link}`}
                        >
                            {link}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Countries
