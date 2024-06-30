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
                className="mx-4 -mb-1 flex items-center border-b-2"
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
        <div className="m-6 border-b border-t border-black py-1">
            <div className="items-center justify-start lg:flex">
                <ul className="w-full items-start space-x-3 text-[18px] lg:flex">
                    <Link
                        prefetch={false}
                        href={`/blog`}
                        className={
                            isBlog
                                ? "font-semibold text-[#a78bfa]"
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
                                            ? "font-semibold text-[#a78bfa]"
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
