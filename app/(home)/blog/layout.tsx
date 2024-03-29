import type { Metadata } from "next"
import "./globals.css"
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers"
import { fetchAPI } from "./utils/fetch-api"

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const FALLBACK_SEO = {
    title: "Fruit pickers Daily Blog",
    description: "Strapi Starter Next Blog"
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

    // if you transfor the urlParamsObject you get the below query
    // populate[]=metadata.shareImage&populate[]=favicon&populate[]=navbar.links&populate[]=navbar.navbarLogo.logoImg&populate[]=footer.footerLogo.logoImg&populate[]=footer.menuLinks&populate[]=footer.legalLinks&populate[]=footer.socialLinks&populate[]=footer.categories

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
        metadataBase: new URL("https://fruitspickingjobs.com"),
        alternates: {
            canonical: "https://fruitspickingjobs.com/blog"
        },
        openGraph: {
            title: "Fruits picking job",
            description: "Fruts picking jobs daily",
            images: "/poster.jpeg"
        },
        twitter: {
            card: "summary_large_image",
            title: "Fruits picking job",
            description: "Fruts picking jobs daily",
            images: "/poster.jpeg"
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
