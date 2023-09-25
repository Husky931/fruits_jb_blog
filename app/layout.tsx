import SiteTitle from "@/app/components/SiteTitle"
import { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import Countries from "@/app/components/NavBar_Countries"
import GoogleAnalytics from "@/app/components/GoogleAnalytics"
import Navigation from "./components/navigation"
import { getStrapiMedia, getStrapiURL } from "./blog/utils/api-helpers"
import { fetchAPI } from "./blog/utils/fetch-api"
import Footer from "./blog/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Fruits picking job board",
        description:
            "Daily fruits picking jobs generated from all over the world",
        metadataBase: new URL("https://fruitspickingjobs.com"),
        alternates: {
            canonical: "https://fruitspickingjobs.com"
        }
    }
}

async function getGlobal(): Promise<any> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

    if (!token)
        throw new Error("The Strapi API Token environment variable is not set.")

    const path = `/global`
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const urlParamsObject = {
        populate: [
            // "metadata.shareImage",
            // "favicon",
            // "navbar.links",
            // "navbar.navbarLogo.logoImg",
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

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const global = await getGlobal()
    // TODO: CREATE A CUSTOM ERROR PAGE
    if (!global.data) return null
    const { navbar, footer } = global.data.attributes
    const gaTrackingId = process.env.GA_TRACKING_ID as string

    return (
        <html lang="en">
            <GoogleAnalytics gaTrackingId={gaTrackingId} />
            <body
                className={`${inter.className} p-4 sm:px-24 sm:py-4 max-w-[1350px] mx-auto`}
            >
                <Navigation />
                <SiteTitle />
                <Countries />
                {children}
                <Footer
                    // logoUrl={footerLogoUrl}
                    // logoText={footer.footerLogo.logoText}
                    menuLinks={footer.menuLinks}
                    categoryLinks={footer.categories.data}
                    legalLinks={footer.legalLinks}
                    socialLinks={footer.socialLinks}
                />
            </body>
        </html>
    )
}
