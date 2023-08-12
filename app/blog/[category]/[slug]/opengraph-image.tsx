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

    return new ImageResponse(<img src={imageUrl} />, size)
}
