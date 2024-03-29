import { fetchAPI } from "@/app/(home)/blog/utils/fetch-api"
import Post from "@/app/(home)/blog/components/Post"
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
    params: { slug: string; category: string }
}): Promise<Metadata> {
    const meta = await getMetaData(params.slug)
    const metadata = meta[0].attributes.seo

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        alternates: {
            canonical: `blog/${params.category}/${params.slug}`
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

    return articleResponse.data.map(
        (article: {
            attributes: {
                slug: string
                category: {
                    data: {
                        attributes: {
                            slug: string
                        }
                    }
                }
            }
        }) => ({
            slug: article.attributes.slug,
            category: article.attributes.category.data.attributes.slug
        })
    )
}
