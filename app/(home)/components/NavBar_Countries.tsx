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
        <ul className="container my-12 px-6">
            <div className="space-y-4 sm:justify-evenly md:flex md:flex-wrap md:justify-start md:space-y-0 ">
                <li className="mx-1 inline-block cursor-pointer px-1 py-2">
                    <Link
                        prefetch={false}
                        className={`
          ${pathname === "/" ? "font-semibold text-[#0000EE]" : "text-black"}
          text-3xl`}
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
                            className="mx-1 inline-block cursor-pointer px-1 py-2"
                            key={link}
                        >
                            <Link
                                prefetch={false}
                                className={`
              ${isActive ? "font-semibold text-[#0000EE]" : "text-black"}
              text-3xl capitalize`}
                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link}`}
                                as={`${process.env.NEXT_PUBLIC_BASE_URL}/${link}`}
                            >
                                {link}
                            </Link>
                        </li>
                    )
                })}
            </div>
        </ul>
    )
}

export default Countries
