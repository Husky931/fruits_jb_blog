import { fetchAPI } from "@/app/blog/utils/fetch-api"
import Post from "@/app/blog/components/Post"
import type { Metadata } from "next"

async function getPostBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
    const path = `/articles`
    const urlParamsObject = {
        filters: { slug },
        populate: {
            cover: { fields: ["url", "alternativeText"] },
            authorsBio: { populate: "*" },
            category: { fields: ["name"] },
            blocks: { populate: "*" }
        }
    }
    const options = { headers: { Authorization: `Bearer ${token}` } }
    const response = await fetchAPI(path, urlParamsObject, options)
    return response
}

async function getMetaData(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
    const path = `/articles`
    const urlParamsObject = {
        filters: { slug },
        populate: { seo: { populate: "*" } }
    }
    const options = { headers: { Authorization: `Bearer ${token}` } }
    const response = await fetchAPI(path, urlParamsObject, options)
    return response.data
}

export async function generateMetadata({
    params
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const meta = await getMetaData(params.slug)
    const metadata = meta[0].attributes.seo
    const ogImage = metadata.shareImage.data.attributes.url
    // console.log(metadata, "i am metadata")
    // console.log(ogImage, "i am ogImage")

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        openGraph: {
            type: "website",
            url: ogImage,
            siteName: "Fruit picking jobs",
            description: "daily friuit picking job posts"
        }
    }
}

export default async function PostRoute({
    params
}: {
    params: { slug: string }
}) {
    const { slug } = params
    const data = await getPostBySlug(slug)
    if (data.data.length === 0) return <h2>no post found</h2>
    return <Post data={data.data[0]} />
}

export async function generateStaticParams() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
    const path = `/articles`
    const options = { headers: { Authorization: `Bearer ${token}` } }
    const articleResponse = await fetchAPI(
        path,
        {
            populate: ["category"]
        },
        options
    )

    //  if (articleResponse.data === null || articleResponse.data === undefined) {
    //     return []; // Return an empty array or handle the error case as per your requirement
    // }

    return articleResponse.data.map(
        (article: {
            attributes: {
                slug: string
                category: {
                    slug: string
                }
            }
        }) => ({
            slug: article.attributes.slug,
            category: article.attributes.slug
        })
    )
}
