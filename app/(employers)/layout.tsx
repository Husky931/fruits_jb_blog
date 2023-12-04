import Footer from "../(home)/blog/components/Footer"
import EmployersNav from "../(employers)/components/nav"
import { fetchAPI } from "../(home)/blog/utils/fetch-api"

export const metadata = {
    metadataBase: new URL("https://fruitspickingjobs.com/employers"),
    title: "Employers page",
    openGraph: {
        images: "/poster.jpeg"
    },
    twitter: {
        images: "/poster.jpeg"
    }
    // openGraph: {
    //     images: [
    //         {
    //             url: new URL("https://fruitspickingjobs.com/poster.jpeg"),
    //             width: 800,
    //             height: 600
    //         }
    //     ]
    // },
    // twitter: {
    //     images: [
    //         {
    //             url: new URL("https://fruitspickingjobs.com/poster.jpeg"),
    //             width: 800,
    //             height: 600
    //         }
    //     ],
    //     card: "summary_large_image"
    // }
}

async function getGlobal(): Promise<any> {
    const path = `/global`

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

    if (!token)
        throw new Error("The Strapi API Token environment variable is not set.")

    const options = { headers: { Authorization: `Bearer ${token}` } }

    const urlParamsObject = {
        populate: [
            // "metadata.shareImage",
            // "favicon",
            // "navbar.links",
            // "navbar.navbarLogo.logoImg",
            "footer.footerLogo.logoImg",
            "footer.menuLinks",
            "footer.legalLinks",
            "footer.socialLinks",
            "footer.categories"
        ]
    }

    const response = await fetchAPI(path, urlParamsObject, options)
    return response
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const global = await getGlobal()
    // TODO: CREATE A CUSTOM ERROR PAGE
    if (!global.data) return null
    const { navbar, footer } = global.data.attributes

    return (
        <div style={{ height: "100vh", margin: 0 }}>
            <EmployersNav />
            {children}
            <Footer
                menuLinks={footer.menuLinks}
                categoryLinks={footer.categories.data}
                legalLinks={footer.legalLinks}
                socialLinks={footer.socialLinks}
            />
        </div>
    )
}
