import Navigation from "../(home)/components/navigation/index"
import { fetchAPI } from "../(home)/blog/utils/fetch-api"
import Footer from "../(home)/blog/components/Footer"

export const metadata = {
    metadataBase: new URL("https://fruitspickingjobs.com/post"),
    title: "job post",
    description: "this is the desciption"
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
        <div className="p-4 sm:px-24 sm:py-4 max-w-[1350px] mx-auto">
            <Navigation />
            {children}
            <Footer
                // logoUrl={footerLogoUrl}
                // logoText={footer.footerLogo.logoText}
                menuLinks={footer.menuLinks}
                categoryLinks={footer.categories.data}
                legalLinks={footer.legalLinks}
                socialLinks={footer.socialLinks}
            />
        </div>
    )
}
