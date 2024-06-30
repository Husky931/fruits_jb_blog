import SiteTitle from "@/app/(home)/components/SiteTitle"
import { Metadata } from "next"
import Countries from "@/app/(home)/components/NavBar_Countries"
import Navigation from "./components/navigation"
import { fetchAPI } from "./blog/utils/fetch-api"
import Footer from "./blog/components/Footer"
import NewFooter from "@/app/components/NewFooter"

export async function generateMetadata(): Promise<Metadata> {
    const metadataBase = new URL("https://fruitspickingjobs.com")
    return {
        title: "Find Fruit Picking Jobs - Explore Vacancies Worldwide | Fruits Picking Jobs",
        description:
            "Discover rewarding fruit picking jobs worldwide. Browse job vacancies for seasonal fruit picking work and start your adventure today. Visit our website for access to diverse fruit picking vacancies.",
        metadataBase: metadataBase,
        alternates: {
            canonical: "https://fruitspickingjobs.com"
        },
        keywords: ["Fruits", "Jobs", "Picking", "World", "Daily"],
        openGraph: {
            title: "Find Fruit Picking Jobs - Explore Vacancies Worldwide | Fruits Picking Jobs",
            description:
                "Discover rewarding fruit picking jobs worldwide. Browse job vacancies for seasonal fruit picking work and start your adventure today. Visit our website for access to diverse fruit picking vacancies.",
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
            title: "Find Fruit Picking Jobs - Explore Vacancies Worldwide | Fruits Picking Jobs",
            description:
                "Discover rewarding fruit picking jobs worldwide. Browse job vacancies for seasonal fruit picking work and start your adventure today. Visit our website for access to diverse fruit picking vacancies.",
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

    return (
        <div>
            <div className="w-full">
                <Navigation />
            </div>

            <div className="mx-auto max-w-[1350px] p-4 sm:px-24 sm:py-4">
                <SiteTitle />
                <Countries />
                {children}
            </div>
            <div className="w-full">
                <NewFooter />
            </div>
        </div>
    )
}
