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
                prefetch={false}
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
    const isBlog = pathname === `/blog`
    return (
        <div className="m-6 py-1 dark:bg-black dark:text-gray-100 border-t border-b border-black">
            <div className="items-center lg:flex justify-start">
                <ul className="w-full items-start space-x-3 lg:flex text-[18px]">
                    <Link
                        prefetch={false}
                        href={`/blog`}
                        className={
                            isBlog
                                ? "text-[#a78bfa] font-semibold"
                                : "text-black"
                        }
                    >
                        <li className="inline-block">all</li>
                    </Link>
                    {categoryLinks.map((link: CategoryLink) => {
                        const isActive = pathname.startsWith(
                            `/blog/${link.attributes.slug}`
                        )
                        return (
                            <li className="inline-block" key={link.id}>
                                <Link
                                    prefetch={false}
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
            </div>
        </div>
    )
}
