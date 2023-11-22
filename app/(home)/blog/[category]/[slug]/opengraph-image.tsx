import { ImageResponse } from "next/og"
import { fetchAPI } from "../../utils/fetch-api"

export const size = {
    width: 1200,
    height: 630
}
export const runtime = "edge"
export const alt = ""

export const contentType = "image/jpeg"

export default async function Image({ params }: { params: { slug: string } }) {
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
    const ogImage = metadata.shareImage.data.attributes.url
    const imageLink = process.env.NEXT_PUBLIC_STRAPI_SERVER + ogImage

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    color: "black",
                    background: "#f6f6f6",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <img alt="My Image" height="630" src={imageLink} width="1200" />
            </div>
        ),
        {
            width: 1200,
            height: 630
        }
    )
}
