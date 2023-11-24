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
        <html lang="en" className="h-auto">
            <body className="h-auto w-full py-4 px-4">{children}</body>
        </html>
    )
}
