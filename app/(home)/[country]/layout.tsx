export const metadata = {
    metadataBase: new URL("https://fruitspickingjobs.com/auth"),
    title: "Authentication",
    description: "this is the desciption",
    openGraph: {
        title: "Fruits picking job",
        description: "Fruts picking jobs daily",
        image: "/poster.jpeg"
    },
    twitter: {
        card: "summary_large_image",
        title: "Fruits picking job",
        description: "Fruts picking jobs daily",
        image: "/poster.jpeg"
    }
}

export default function LayoutRoute({
    children
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}
