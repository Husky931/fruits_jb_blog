import "../globals/globals.css"

export const metadata = {
    title: "authentication"
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
