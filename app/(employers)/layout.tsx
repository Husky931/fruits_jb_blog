import "../globals/globals.css"
import Footer from "../(home)/blog/components/Footer"
import { fetchAPI } from "../(home)/blog/utils/fetch-api"
import EmployersNav from "../(employers)/components/nav"

export const metadata = {
    metadataBase: new URL("http://localhost:3000"),
    title: "Employers page"
}

async function getGlobal(): Promise<any> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

    if (!token)
        throw new Error("The Strapi API Token environment variable is not set.")

    const path = `/global`
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
        <html lang="en" style={{ height: "100vh" }}>
            <body style={{ height: "100vh", margin: 0 }}>
                <EmployersNav />
                {children}
                <Footer
                    menuLinks={footer.menuLinks}
                    categoryLinks={footer.categories.data}
                    legalLinks={footer.legalLinks}
                    socialLinks={footer.socialLinks}
                />
            </body>
        </html>
    )
}
