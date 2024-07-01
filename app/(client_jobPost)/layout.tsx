import Navigation from "../(home)/components/navigation/index"
import Footer from '@/app/components/Footer'

export const metadata = {
    metadataBase: new URL("https://fruitspickingjobs.com/post"),
    title: "job post",
    description: "this is the desciption"
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mx-auto max-w-[1350px] p-4 sm:px-24 sm:py-4">
            <Navigation />
            {children}
            <Footer />
        </div>
    )
}
