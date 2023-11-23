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
        <html lang="en" style={{ height: "100vh" }}>
            <body
                className="flex justify-center items-center bg-blue-600"
                style={{ height: "100vh", margin: 0 }}
            >
                {children}
            </body>
        </html>
    )
}
