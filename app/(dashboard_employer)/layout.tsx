import "../globals/globals.css"

export const metadata = {
    metadataBase: new URL("https://fruitspickingjobs.com/dashboard_employer"),
    title: "Authentication",
    description: "Fruts picking jobs daily",
    openGraph: {
        title: "Fruits picking job",
        description: "Fruts picking jobs daily",
        image: "/poster.jpeg"
    },
    twitter: {
        card: "summary_large_image",
        site: "@eMartiiin94",
        title: "Fruits picking job",
        description: "Fruts picking jobs daily",
        image: "/poster.jpeg"
    }
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="min-h-screen h-auto">
            <body className="h-auto w-full ">{children}</body>
        </html>
    )
}
