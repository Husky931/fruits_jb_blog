import CountryPagination from "../components/CountryPagination"

export default async function Page({
    params
}: {
    params: { country: string }
}) {
    const { country } = params

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full flex flex-col justify-start items-center">
                <h1 className="text-black">Hello {country}</h1>
                <CountryPagination />
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
