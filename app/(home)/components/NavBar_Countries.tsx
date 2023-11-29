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
        <ul className="container px-6 my-12">
            <div className="space-y-4 sm:justify-evenly md:space-y-0 md:flex md:flex-wrap md:justify-start ">
                <li className="inline-block py-2 px-1 mx-1 cursor-pointer">
                    <Link
                        prefetch={false}
                        className={`
          ${pathname === "/" ? "text-[#0000EE] font-semibold" : "text-black"}
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
                            className="inline-block py-2 px-1 mx-1 cursor-pointer"
                            key={link}
                        >
                            <Link
                                prefetch={false}
                                className={`
              ${isActive ? "text-[#0000EE] font-semibold" : "text-black"}
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
