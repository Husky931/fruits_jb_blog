import SiteTitle from "@/app/components/SiteTitle"
import "./globals.css"
import { Inter } from "next/font/google"
import Countries from "@/app/components/Countries"
import GoogleAnalytics from "@/app/components/GoogleAnalytics"
import Navigation from "./components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Fruits picking job board",
    description: "Daily fruits picking jobs generated from all over the world"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
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
            </body>
        </html>
    )
}
