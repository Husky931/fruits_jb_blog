import PageHeader from "@/app/(home)/blog/components/PageHeader"
import { fetchAPI } from "@/app/(home)/blog/utils/fetch-api"
import PostList from "@/app/(home)/blog/components/PostList"
import type { Metadata } from "next"

async function fetchPostsByCategory(filter: string) {
    try {
        const path = `/articles`

        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
        const urlParamsObject = {
            sort: { createdAt: "desc" },
            filters: {
                category: {
                    slug: filter
                }
            },
            populate: {
                cover: { fields: ["url"] },
                category: {
                    populate: "*"
                },
                authorsBio: {
                    populate: "*"
                }
            }
        }
        const options = { headers: { Authorization: `Bearer ${token}` } }
        const responseData = await fetchAPI(path, urlParamsObject, options)
        return responseData
    } catch (error) {
        console.error(error)
    }
}

export async function generateMetadata({
    params
}: {
    params: { category: string }
}): Promise<Metadata> {
    const category = params.category
    return {
        metadataBase: new URL("https://fruitspickingjobs.com"),
        title: `Blog Category: ${category}`,
        description: `Posts in the ${category} category`,
        openGraph: {
            // images: [
            //     {
            //         url: new URL("https://fruitspickingjobs.com/poster.jpeg"),
            //         width: 800,
            //         height: 600
            //     }
            // ],
            images: "/poster.jpeg",
            title: `Blog Category: ${category}`,
            description: `Posts in the ${category} category`,
            url: `https://fruitspickingjobs.com/blog/${category}`,
            type: "website"
        },
        twitter: {
            images: "/poster.jpeg",
            card: "summary_large_image",
            title: `Blog Category: ${category}`,
            description: `Posts in the ${category} category`
        },
        alternates: {
            canonical: `blog/${params.category}`
        }
    }
}

export default async function CategoryRoute({
    params
}: {
    params: { category: string }
}) {
    const filter = params.category
    const { data } = await fetchPostsByCategory(filter)

    if (data.length === 0) return <div>Not Posts In this category</div>

    const { name, description } = data[0]?.attributes.category.data.attributes

    return (
        <div>
            <PageHeader heading={name} text={description} />
            <PostList data={data} />
        </div>
    )
}

export async function generateStaticParams() {
    const categories = [
        "entertaining",
        "general",
        "guides",
        "innovations",
        "money",
        "visa"
    ]

    return categories.map((m) => ({
        category: m
    }))
}
