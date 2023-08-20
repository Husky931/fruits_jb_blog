import { fetchAPI } from "../blog/utils/fetch-api"
import CountryPagination from "../components/CountryPagination"
import RichText from "../blog/components/RichText"

async function getCountrySeo(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
    const path = `/seo-countries`
    // const urlParamsObject = {
    //     // filters: { slug },
    //     populate: "*"
    // }
    const options = { headers: { Authorization: `Bearer ${token}` } }
    const response = await fetchAPI(path, options)
    return response.data
}

export default async function Page({
    params
}: {
    params: { country: string }
}) {
    const { country } = params
    const res = await getCountrySeo(country)
    const filteredData = res.filter(
        (item: any) => item.attributes.slug === country
    )
    const data = {
        body: filteredData[0].attributes.seo_text
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full flex flex-col justify-start items-center">
                {/* <CountryPagination /> */}
                <RichText data={data} />
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
        // "greece",
        "ireland",
        "italy",
        "japan",
        "new-zealand",
        "norway",
        "spain",
        "sweden",
        "usa"
    ]
    // const res = await fetch(`https://...`, { cache: 'no-store' })

    return countries.map((m) => ({
        country: m
    }))
}
