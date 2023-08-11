import type { Metadata } from "next"
import "./globals.css"
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers"
import { fetchAPI } from "./utils/fetch-api"

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const FALLBACK_SEO = {
    title: "Fruit pickers Daily Blog",
    description: "Daily content related to the fruit picking industry"
    // ogImage: "image url"
}

async function getGlobal(): Promise<any> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

    if (!token)
        throw new Error("The Strapi API Token environment variable is not set.")

    const path = `/global`
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const urlParamsObject = {
        populate: [
            "metadata.shareImage",
            "favicon",
            "navbar.links",
            "navbar.navbarLogo.logoImg",
            "footer.footerLogo.logoImg",
            "footer.menuLinks",
            "footer.legalLinks",
            "footer.socialLinks",
            "footer.categories"
        ]
    }

    const response = await fetchAPI(path, urlParamsObject, options)
    return response
}

export async function generateMetadata(): Promise<Metadata> {
    const meta = await getGlobal()

    if (!meta.data) return FALLBACK_SEO

    const { metadata, favicon } = meta.data.attributes
    const { url } = favicon.data.attributes

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        icons: {
            icon: [new URL(url, getStrapiURL())]
        }
    }
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { lang: string }
}) {
    const global = await getGlobal()
    // TODO: CREATE A CUSTOM ERROR PAGE
    if (!global.data) return null
    const { navbar, footer } = global.data.attributes

    const navbarLogoUrl = getStrapiMedia(
        navbar.navbarLogo.logoImg.data.attributes.url
    )

    const footerLogoUrl = getStrapiMedia(
        footer.footerLogo.logoImg.data.attributes.url
    )

    return (
        <>
            <Navbar
                links={navbar.links}
                categoryLinks={footer.categories.data}
                logoUrl={navbarLogoUrl}
                logoText={navbar.navbarLogo.logoText}
            />

            <main className="min-h-screen">{children}</main>

            {/* <Footer
                // logoUrl={footerLogoUrl}
                // logoText={footer.footerLogo.logoText}
                menuLinks={footer.menuLinks}
                categoryLinks={footer.categories.data}
                legalLinks={footer.legalLinks}
                socialLinks={footer.socialLinks}
            /> */}
        </>
    )
}
