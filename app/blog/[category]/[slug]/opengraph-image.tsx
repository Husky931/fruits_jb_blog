import { ImageResponse } from "next/server"
import { fetchAPI } from "../../utils/fetch-api"
import { getStrapiMedia } from "../../utils/api-helpers"
import imgSrc from "../../../../public/opengraph-image.jpg"

export const size = {
    width: 1200,
    height: 630
}
export const runtime = "edge"
export const alt = ""

export const contentType = "image/jpeg"

export default async function Image({ params }: { params: { slug: string } }) {
    const fontData = await fetch(
        new URL("./fonts/Inter-Medium.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer())
    try {
        return new ImageResponse(
            (
                <div
                    style={{
                        display: "flex",
                        fontSize: 60,
                        color: "black",
                        background: "#f6f6f6",
                        width: "100%",
                        height: "100%",
                        paddingTop: 50,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img
                        alt="My Image"
                        height="630"
                        //@ts-ignore
                        src={new url(imgSrc)}
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
