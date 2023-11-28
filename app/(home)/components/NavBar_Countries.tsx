"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const Countries = () => {
    const pathname = usePathname()
    const countries = [
        // "australia",
        "usa",
        "canada",
        "england",
        "france",
        "austria",
        "spain",
        "germany",
        "italy",
        "belgium"
        // "denmark",
        // "finland",
        // "greece",
        // "ireland",
        // "japan",
        // "new-zealand",
        // "norway",

        // "sweden",
    ]
    return (
        <ul className="container px-6 my-2 mt-8">
            <li className="inline-block px-1 mx-1 cursor-pointer">
                <Link
                    prefetch={false}
                    className={`
                        ${
                            pathname === "/"
                                ? "text-[#0000EE] font-semibold"
                                : "text-black"
                        }
                    text-2xl`}
                    href="/"
                    as="/"
                >
                    Latest
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
                            prefetch={false}
                            className={`
                                ${
                                    isActive
                                        ? "text-[#0000EE] font-semibold"
                                        : "text-black"
                                }
                                    text-2xl`}
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
