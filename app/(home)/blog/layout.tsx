import type { Metadata } from "next"
import "./globals.css"
import { fetchAPI } from "./utils/fetch-api"

const FALLBACK_SEO = {
    title: "Fruit pickers Daily Blog",
    description: "Strapi Starter Next Blog"
}

async function getGlobal(): Promise<any> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

    if (!token)
        throw new Error("The Strapi API Token environment variable is not set.")

    const path = `/global`
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const urlParamsObject = {
        populate: [
            "metadata.shareImage",
        ]
    }

    const response = await fetchAPI(path, urlParamsObject, options)
    return response
}

export async function generateMetadata(): Promise<Metadata> {
    const meta = await getGlobal()

    if (!meta.data) return FALLBACK_SEO

    const { metadata } = meta.data.attributes

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        metadataBase: new URL("https://fruitspickingjobs.com"),
        alternates: {
            canonical: "https://fruitspickingjobs.com/blog"
        },
        openGraph: {
            title: "Fruits picking job",
            description: "Fruts picking jobs daily",
            images: "/poster.jpeg"
        },
        twitter: {
            card: "summary_large_image",
            title: "Fruits picking job",
            description: "Fruts picking jobs daily",
            images: "/poster.jpeg"
        }
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <main className="min-h-screen">{children}</main>
        </>
    )
}
