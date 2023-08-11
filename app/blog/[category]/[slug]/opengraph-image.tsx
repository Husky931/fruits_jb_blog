import { ImageResponse } from "next/server"
import { fetchAPI } from "../../utils/fetch-api"

export const size = {
    width: 1200,
    height: 630
}

export const contentType = "image/jpg"
export const runtime = "edge"

export default async function og({ params }: { params: { slug: string } }) {
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

    return new ImageResponse(<img src={ogImageURL} />, size)
}
