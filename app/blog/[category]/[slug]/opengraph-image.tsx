import { ImageResponse } from "next/server"
import { fetchAPI } from "../../utils/fetch-api"
import { getStrapiMedia } from "../../utils/api-helpers"
import imgSrc from "../../../../public/opengraph-image.jpg"

export const size = {
    width: 1200,
    height: 630
}
export const runtime = "edge"

export const contentType = "image/jpeg"

export default async function Image({ params }: { params: { slug: string } }) {
    const imageUrl = imgSrc.src

    try {
        const imageUrl = imgSrc.src

        return new ImageResponse(
            (
                <div style="height: 100%; width: 100%; display: flex; textAlign: center; alignItems: center; justifyContent: center;">
                    <img
                        alt="My Image"
                        height="630"
                        src="${imageUrl}"
                        width="1200"
                    />
                </div>
            ),
            {
                width: 1200,
                height: 630
            }
        )
    } catch (e: any) {
        console.log(`${e.message}`)
        return new Response(`Failed to generate the image`, {
            status: 500
        })
    }
}
