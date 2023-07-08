import SiteTitle from "../components/SiteTitle"

export default function LayoutRoute({
    children
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}
