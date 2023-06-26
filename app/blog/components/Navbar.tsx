"use client"
import Logo from "./Logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CategoryLink } from "./Footer"

interface NavLink {
    id: number
    url: string
    newTab: boolean
    text: string
}

interface CategoryLink {
    id: string
    attributes: {
        name: string
        slug: string
    }
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function NavLink({ url, text }: NavLink) {
    const path = usePathname()

    return (
        <li className="flex">
            <Link
                href={url}
                className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${
                    path === url &&
                    "dark:text-violet-400 dark:border-violet-400"
                }}`}
            >
                {text}
            </Link>
        </li>
    )
}

export default function Navbar({
    links,
    logoUrl,
    logoText,
    categoryLinks
}: {
    categoryLinks: Array<CategoryLink>
    links: Array<NavLink>
    logoUrl: string | null
    logoText: string | null
}) {
    const pathname = usePathname()
    return (
        <div className="container p-6 dark:bg-black dark:text-gray-100">
            <div className="container flex justify-between mx-auto px-0">
                {/* <Logo src={logoUrl}>
                    {logoText && (
                        <h2 className="text-2xl font-bold">{logoText}</h2>
                    )}
                </Logo> */}

                <div className="container items-center flex-shrink-0 lg:flex">
                    <ul className="container items-stretch space-x-3 lg:flex text-[18px] font-semibold">
                        <Link href={`/`} className="hover:dark:text-violet-400">
                            <li className="inline-block">Home</li>
                        </Link>
                        {categoryLinks.map((link: CategoryLink) => {
                            const isActive = pathname.startsWith(
                                `/blog/${link.attributes.slug}`
                            )
                            return (
                                <li className="inline-block" key={link.id}>
                                    <Link
                                        href={`/blog/${link.attributes.slug}`}
                                        className={
                                            isActive
                                                ? "text-[#a78bfa] font-semibold"
                                                : "text-black"
                                        }
                                    >
                                        {link.attributes.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    {/* <ul className="container items-stretch space-x-3 lg:flex">
                        {links.map((item: NavLink) => (
                            <NavLink key={item.id} {...item} />
                        ))}
                    </ul> */}
                </div>

                {/* <button className="p-4 lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 dark:text-gray-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button> */}
            </div>
        </div>
    )
}
