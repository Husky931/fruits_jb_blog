import CountryPagination from "../components/CountryPagination"
import { Metadata } from "next"
import {
    Australia,
    Austria,
    Belgium,
    Canada,
    Denmark,
    England,
    France,
    Finland,
    Germany,
    Italy,
    Ireland,
    Japan,
    NewZealand,
    Norway,
    Spain,
    Sweden,
    USA
} from "../seo_text/index"

const countryComponents = {
    australia: Australia,
    austria: Austria,
    belgium: Belgium,
    canada: Canada,
    denmark: Denmark,
    england: England,
    france: France,
    finland: Finland,
    germany: Germany,
    italy: Italy,
    ireland: Ireland,
    japan: Japan,
    newzealand: NewZealand,
    norway: Norway,
    spain: Spain,
    sweden: Sweden,
    usa: USA
}
export async function generateMetadata({
    params
}: {
    params: { country: string }
}): Promise<Metadata> {
    const title = `Daily ${params.country} curated fruit harvesting and picking jobs `

    return {
        title: title,
        alternates: {
            canonical: params.country
        },
        description: `Find the latest fruit picking jobs in ${params.country}. Daily updates and curated selection for ${params.country} fruit harvesting.`,
        openGraph: {
            title: title,
            description: `Find the latest fruit picking jobs in ${params.country}. Daily updates and curated selection for ${params.country} fruit harvesting.`,
            images: [`https://fruitpickingjobs.com/og/poster.jpeg`]
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: `Find the latest fruit picking jobs in ${params.country}. Daily updates and curated selection for ${params.country} fruit harvesting.`,
            images: [`https://fruitpickingjobs.com/og/poster.jpeg.jpg`]
        }
    }
}

export default async function Page({
    params
}: {
    params: { country: string }
}) {
    let { country } = params
    if (country === "new-zealand") {
        country = country.replace("-", "")
    }
    //@ts-ignore
    const CountrySEO = countryComponents[country]

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full flex flex-col justify-start items-center">
                <CountryPagination />
                <CountrySEO />
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const countries = [
        "australia",
        "austria",
        "belgium",
        "canada",
        "denmark",
        "england",
        "finland",
        "france",
        "germany",
        "italy",
        // "greece",
        "ireland",
        "japan",
        "new-zealand",
        "norway",
        "spain",
        "sweden",
        "usa"
    ]

    return countries.map((m) => ({
        country: m
    }))
}
