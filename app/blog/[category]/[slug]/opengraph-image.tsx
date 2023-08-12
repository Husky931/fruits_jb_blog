import { ImageResponse } from "next/server"
import { fetchAPI } from "../../utils/fetch-api"
import { getStrapiMedia } from "../../utils/api-helpers"

export const size = {
    width: 1200,
    height: 630
}
export const runtime = "edge"

export const contentType = "image/jpg"

export default async function og({ params }: { params: { slug: string } }) {
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

    const meta = await getMetaData(params.slug)
    const metadata = meta[0].attributes.seo
    const ogImageURL = metadata.shareImage.data.attributes.url
    console.log(ogImageURL)

    const data = await getPostBySlug(params.slug)
    const cover = data.data[0]?.attributes

    const imageUrl = getStrapiMedia(cover.data?.attributes.url)

    // return new ImageResponse(<img src={ogImageURL + "jpg"} />, size)
    //@ts-ignore
    return new ImageResponse(<img src={imageUrl} />, size)
}
