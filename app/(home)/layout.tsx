import SiteTitle from "@/app/(home)/components/SiteTitle"
import { Metadata } from "next"
import Countries from "@/app/(home)/components/NavBar_Countries"
import Navigation from "@/app/(home)/components/navigation/AppBar"
import Footer from "@/app/components/Footer"

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

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div>
            <Navigation />

            <div className="mx-auto mt-[60px] max-w-[1350px] p-4 sm:px-24 sm:py-4">
                <SiteTitle />
                <Countries />
                {children}
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </div>
    )
}
