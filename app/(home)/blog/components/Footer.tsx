"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Logo from "./Logo"
import { CgWebsite } from "react-icons/cg"
import { FaDiscord } from "react-icons/fa"
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai"
import { Toolbar, Tooltip } from "@mui/material"

interface FooterLink {
    id: number
    url: string
    newTab: boolean
    text: string
    social?: string
}

interface CategoryLink {
    id: string
    attributes: {
        name: string
        slug: string
    }
}

function FooterLink({ url, text }: FooterLink) {
    const path = usePathname()
    if (text === "Forum") {
        return (
            <Tooltip title="Coming soon">
                {/* <li className="flex">{text}</li> */}
                <></>
            </Tooltip>
        )
    }
    return (
        <li className="flex">
            <Link prefetch={false} href={url}>
                {text}
            </Link>
        </li>
    )
}

export function CategoryLink({ attributes }: CategoryLink) {
    return (
        <li className="flex">
            <Link href={`/blog/${attributes.slug}`}>{attributes.name}</Link>
        </li>
    )
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
    switch (social) {
        case "WEBSITE":
            return <CgWebsite />
        case "TWITTER":
            return <AiFillTwitterCircle />
        case "YOUTUBE":
            return <AiFillYoutube />
        case "DISCORD":
            return <FaDiscord />
        default:
            return null
    }
}

export default function Footer({
    logoUrl,
    logoText,
    menuLinks,
    categoryLinks,
    legalLinks,
    socialLinks
}: {
    logoUrl?: string | null
    logoText?: string | null
    menuLinks: Array<FooterLink>
    categoryLinks: Array<CategoryLink>
    legalLinks: Array<FooterLink>
    socialLinks: Array<FooterLink>
}) {
    return (
        <footer className="py-6">
            <div className="container mx-auto space-y-6 px-6 md:space-y-12">
                <div className="grid grid-cols-12 border-t border-gray-400-50 pt-6">
                    {/* <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                        <Logo src={logoUrl}>
                            {logoText && (
                                <h2 className="text-2xl font-bold">
                                    {logoText}
                                </h2>
                            )}
                        </Logo>
                    </div> */}

                    <div className="col-span-6 text-center md:col-span-3 md:text-left">
                        <p className="pb-1 text-left text-lg font-medium">
                            Categories
                        </p>
                        <ul>
                            {categoryLinks.map((link: CategoryLink) => (
                                <CategoryLink key={link.id} {...link} />
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-6 text-center md:col-span-3 md:text-left">
                        <p className="pb-1 text-left text-lg font-medium">
                            Menu
                        </p>
                        <ul>
                            {menuLinks.map((link: FooterLink) => (
                                <FooterLink key={link.id} {...link} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="grid justify-center border-t border-gray-400-50 pt-6 lg:justify-between">
                    <div className="flex">
                        <span className="mr-2">
                            ©{new Date().getFullYear()} All rights reserved
                        </span>
                        {/* <ul className="flex">
                            {legalLinks.map((link: FooterLink) => (
                                <Link
                                    href={link.url}
                                    className="text-gray-400 hover:text-gray-300 mr-2"
                                    key={link.id}
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </ul> */}
                    </div>
                    {/* <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
                        {socialLinks.map((link: FooterLink) => {
                            return (
                                <a
                                    key={link.id}
                                    rel="noopener noreferrer"
                                    href={link.url}
                                    title={link.text}
                                    target={link.newTab ? "_blank" : "_self"}
                                    className="flex items-center justify-center w-10 h-10 rounded-full"
                                >
                                    <RenderSocialIcon social={link.social} />
                                </a>
                            )
                        })}
                    </div> */}
                </div>
            </div>
        </footer>
    )
}
