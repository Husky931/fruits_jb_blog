import HomeText from "./components/HomepageText"
import AllCountries from "./components_countries/All"

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <AllCountries />
            <HomeText />
        </main>
    )
}
