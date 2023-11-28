import SiteTitle from "@/app/(home)/components/SiteTitle"
import { Metadata, Viewport } from "next"
import "../globals/globals.css"
import Countries from "@/app/(home)/components/NavBar_Countries"
import GoogleAnalytics from "@/app/(home)/components/GoogleAnalytics"
import Navigation from "./components/navigation"
import { fetchAPI } from "./blog/utils/fetch-api"
import Footer from "./blog/components/Footer"

export async function generateMetadata(): Promise<Metadata> {
    const metadataBase = new URL("https://fruitspickingjobs.com")
    return {
        title: "Fruit harvesting jobs board",
        description:
            "Daily fruits picking jobs generated from all over the world",
        metadataBase: metadataBase,
        alternates: {
            canonical: "https://fruitspickingjobs.com"
        },
        keywords: ["Fruits", "Jobs", "Picking", "World", "Daily"],
        openGraph: {
            title: "Fruits picking job board",
            description:
                "Daily fruits picking jobs generated from all over the world",
            url: "https://fruitspickingjobs.com",
            siteName: "Fruits Picking Jobs",
            images: [
                {
                    url: metadataBase + "/poster.jpeg",
                    width: 800,
                    height: 600
                }
            ],
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title: "Fruits picking job board",
            description:
                "Daily fruits picking jobs generated from all over the world",
            site: "@fruitspickingjobs",
            images: [metadataBase + "/twitter-image.jpg"]
        }
    }
}

async function getGlobal(): Promise<any> {
    const path = `/global`

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

    if (!token)
        throw new Error("The Strapi API Token environment variable is not set.")

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
            <body className="p-4 sm:px-24 sm:py-4 max-w-[1350px] mx-auto">
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
