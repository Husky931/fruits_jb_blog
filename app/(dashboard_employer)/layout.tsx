import "../globals/globals.css"

export const metadata = {
    title: "employer dashboard",
    metadataBase: new URL("http://localhost:3000")
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
