import EmployersNav from "./employer/components/Navigation"
import Footer from "@/app/components/Footer"

export const metadata = {
    metadataBase: new URL("https://fruitspickingjobs.com/employers"),
    title: "Employers page",
    openGraph: {
        images: [
            {
                url: new URL("https://fruitspickingjobs.com/poster.jpeg"),
                width: 800,
                height: 600
            }
        ]
    },
    twitter: {
        images: [
            {
                url: new URL("https://fruitspickingjobs.com/poster.jpeg"),
                width: 800,
                height: 600
            }
        ],
        card: "summary_large_image"
    }
}



export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div style={{ height: "100vh", margin: 0, width: "100%" }}>
            <EmployersNav />
            {children}
            <Footer />
        </div>
    )
}
