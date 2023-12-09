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
            className="min-h-screen flex justify-center items-center p-4 sm:px-24 sm:py-4 max-w-[1350px] mx-auto"
            style={{
                height: "100vh",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
            }}
        >
            <Navigation />
            {children}
        </div>
    )
}
