import { Provider } from "../context/AuthUser"
import GoogleAnalytics from "@/app/(home)/components/GoogleAnalytics"
import { Manrope } from "next/font/google"
import "./globals/globals.css"

const manrope = Manrope({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"]
})

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const gaTrackingId = process.env.GA_TRACKING_ID as string

    return (
        <html lang="en" className={manrope.className}>
            <GoogleAnalytics gaTrackingId={gaTrackingId} />
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    )
}
