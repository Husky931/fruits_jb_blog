"use client"
import { useEffect, useState } from "react"
import { ColorRing } from "react-loader-spinner"
import { useClientPosts } from "@/context/ClientPostsContext"
import { StrapiPostAttributes } from "@/types"
import { Box } from "@mui/material"
import Link from "next/link"

interface JobPost {
    id: number
    attributes: StrapiPostAttributes
}

export default function ClientPostPage({ params }: { params: { id: string } }) {
    const id = params.id
    const [post, setPost] = useState<JobPost | null>(null)
    const [selectedFile, setSelectedFile] = useState()

    const [isLoading, setIsLoading] = useState(true)
    const clientsPosts = useClientPosts()

    useEffect(() => {
        if (id) {
            setIsLoading(true)
            const postId = Array.isArray(id) ? id[0] : id
            const post = clientsPosts?.find(
                (post) => post.id === parseInt(postId)
            )
            if (post) {
                console.log(post, "posts from page")
                setPost(post)
            }

            setIsLoading(false)
        }
    }, [id, clientsPosts])

    const handleFileChange = (event: any) => {
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0])
    }

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file")
            return
        }

        const formData = new FormData()
        formData.append("files", selectedFile, `resume${selectedFile.name}`)

        try {
            const response = await fetch(`http://127.0.0.1:1337/api/upload`, {
                method: "POST",
                body: formData
            })

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            console.log(data, "i am data")
            alert("File uploaded successfully")
        } catch (error) {
            console.error("Error:", error)
            alert(error)
        }
    }

    if (isLoading) {
        return (
            <section className="bg-white p-8 m-4 rounded-lg shadow-lg lg:max-w-[700px]">
                <div style={{ pointerEvents: isLoading ? "auto" : "none" }}>
                    <ColorRing
                        visible={true}
                        height="160"
                        width="160"
                        ariaLabel="blocks-loading"
                        colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87"
                        ]}
                    />
                </div>
            </section>
        )
    }

    return (
        <section className="w-full h-auto">
            <Box
                sx={{
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgb(243, 244, 246)",
                    padding: "10px",
                    borderRadius: "8px"
                }}
            >
                <Box className="w-full flex justify-start items-center">
                    <Box sx={{ width: "100px", height: "100px" }}>
                        <img
                            className="max-w-full max-h-full"
                            src={`${process.env.NEXT_PUBLIC_STRAPI_SERVER}${post?.attributes.company_logo.data.attributes.formats.thumbnail.url}`}
                        />
                    </Box>
                    <Box sx={{ marginLeft: "25px" }}>
                        <div className="text-2xl md:text-3xl text-[#0000EE] font-bold">
                            {post?.attributes.title}
                        </div>
                        <div className="text-[#663300] font-bold text-lg md:text-xl">
                            {post?.attributes.company_name}
                        </div>
                        <div className="font-semibold">
                            {post?.attributes &&
                                post?.attributes.country_location
                                    .charAt(0)
                                    .toUpperCase() +
                                    post?.attributes.country_location
                                        .slice(1)
                                        .toLowerCase()}
                            , {post?.attributes.city_location}
                        </div>
                    </Box>
                </Box>

                <Box sx={{ marginTop: "30px" }}>
                    <div className="font-semibold text-2xl my-1">
                        Job Description
                    </div>
                    <div> {post?.attributes.job_description}</div>
                    {post?.attributes.URL && (
                        <Link
                            href={`https://${post?.attributes.URL}`}
                            target="_blank"
                        >
                            <div className="text-blue-700 mt-2">
                                {post?.attributes.URL}
                            </div>
                        </Link>
                    )}
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="fileInput"
                        className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
                    >
                        Select File
                    </label>
                    {selectedFile && (
                        <button
                            className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
                            onClick={handleFileUpload}
                        >
                            Submit CV
                        </button>
                    )}
                </Box>
            </Box>
        </section>
    )
}
