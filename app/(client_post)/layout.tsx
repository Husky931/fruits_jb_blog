import Navigation from "../(home)/components/navigation/index"

export const metadata = {
    metadataBase: new URL("https://fruitspickingjobs.com/post"),
    title: "job post",
    description: "this is the desciption"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div
            className="min-h-screen flex justify-center items-center"
            style={{ height: "100vh", margin: 0 }}
        >
            <Navigation />
            {children}
        </div>
    )
}
