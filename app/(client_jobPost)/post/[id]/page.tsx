"use client"
import { useEffect, useState } from "react"
import { ColorRing } from "react-loader-spinner"
import { useClientPosts } from "@/context/ClientPostsContext"
import { StrapiPostAttributes } from "@/types"
import { Box } from "@mui/material"
import Link from "next/link"
import ReusableModal from "@/app/components/ReusableModal"
import ReusableModalYesNo from "@/app/components/ReusableModalYesNo"
import Cookies from "js-cookie"

interface JobPost {
    id: number
    attributes: StrapiPostAttributes
}

export default function ClientPostPage({ params }: { params: { id: string } }) {
    const id = params.id
    const [post, setPost] = useState<JobPost | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const [isFileLoading, setIsFileLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [successModalOpen, setSuccessModalOpen] = useState(false)
    const [errorModalOpen, setErrorModalOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [errorModalFileSizeOpen, setErrorModalFileSizeOpen] = useState(false)
    const [errorModalFileTypeOpen, setErrorModalFileTypeOpen] = useState(false)

    const [confirmUploadModalOpen, setConfirmUploadModalOpen] = useState(false)

    const [successfullySent, setSuccessfullySent] = useState(false)

    const clientsPosts = useClientPosts()

    useEffect(() => {
        if (id) {
            setIsLoading(true)
            const postId = Array.isArray(id) ? id[0] : id
            const post = clientsPosts?.find(
                (post) => post.id === parseInt(postId)
            )
            if (post) {
                setPost(post)
            }

            setIsLoading(false)

            // Check if the user has already applied for this job
            const hasApplied = Cookies.get(`applied_job_${id}`) === "true"
            setSuccessfullySent(hasApplied)
        }
    }, [id, clientsPosts])

    const handleFileChange = (event: any) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB, for example
        const ALLOWED_FILE_TYPES = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ] // PDF, DOC, DOCX

        if (event.target.files[0].size > MAX_FILE_SIZE) {
            setErrorModalFileSizeOpen(true)
            return
        }

        if (!ALLOWED_FILE_TYPES.includes(event.target.files[0].type)) {
            setErrorModalFileTypeOpen(true)
            return
        }

        setSelectedFile(event.target.files[0])
        setConfirmUploadModalOpen(true)
    }

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file")
            return
        }

        setIsFileLoading(true)

        const now = new Date()
        const formattedTimestamp = now
            .toISOString()
            .replace(/T/, "_") // replace T with an underscore
            .replace(/\..+/, "") // delete the dot and everything after
            .replace(/:/g, "-") // replace colons with dashes

        const modifiedFileName = `resume_${formattedTimestamp}_${selectedFile.name}`

        const formData = new FormData()
        formData.append("files", selectedFile, modifiedFileName)

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/upload`,
                {
                    method: "POST",
                    body: formData
                }
            )

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }

            setSuccessMessage(
                "Resume succesfully uploaded and sent to employer. Good luck"
            )
            Cookies.set(`applied_job_${id}`, "true")
            setConfirmUploadModalOpen(false)
            setSuccessfullySent(true)
            setSuccessModalOpen(true)
            await updateApplicantsNumber()
        } catch (error) {
            setErrorMessage(
                "Error submitting your file to the server. Make sure your file is pdf, doc or docx format and under 5mb"
            )
            setErrorModalOpen(true)
        }
    }

    const updateApplicantsNumber = async () => {
        const currentApplicantsNumber = post?.attributes.applicants_number || 0

        try {
            const updateResponse = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/job-posts/${post?.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        data: {
                            applicants_number: currentApplicantsNumber + 1
                        }
                    })
                }
            )

            if (!updateResponse.ok) {
                throw new Error("Failed to update the applicants_number")
            }
        } catch (error) {
            alert(error)
            console.log(error)
        } finally {
            setIsFileLoading(false)
        }
    }

    if (isLoading) {
        return (
            <section className="m-4 rounded-lg bg-white p-8 shadow-lg lg:max-w-[700px]">
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
        <section className="h-auto w-full">
            <Box
                sx={{
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgb(243, 244, 246)",
                    padding: "10px",
                    paddingBottom: "30px",
                    borderRadius: "8px"
                }}
            >
                <div className="flex w-full items-center justify-start">
                    <Box sx={{ width: "100px", height: "100px" }}>
                        <img
                            className="max-h-full max-w-full"
                            src={
                                post?.attributes.company_logo.data
                                    ? `${process.env.NEXT_PUBLIC_STRAPI_SERVER}${post?.attributes.company_logo.data.attributes.formats.thumbnail.url}`
                                    : "/upload-image_1.png"
                            }
                        />
                    </Box>
                    <Box sx={{ marginLeft: "25px" }}>
                        <div className="text-2xl font-bold text-[#0000EE] md:text-3xl">
                            {post?.attributes.title}
                        </div>
                        <div className="text-lg font-bold text-[#663300] md:text-xl">
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
                </div>

                <Box sx={{ marginTop: "30px" }}>
                    <div className="my-1 text-2xl font-semibold">
                        Job Description
                    </div>
                    <div> {post?.attributes.job_description}</div>
                    {post?.attributes.URL && (
                        <Link
                            href={`https://${post?.attributes.URL}`}
                            target="_blank"
                        >
                            <div className="mt-2 text-blue-700">
                                {post?.attributes.URL}
                            </div>
                        </Link>
                    )}
                </Box>
                <Box sx={{ marginTop: "30px", width: "100%" }}>
                    {isFileLoading ? (
                        <div className="text-center">
                            <ColorRing
                                visible={true}
                                height="60"
                                width="60"
                                ariaLabel="file-loading"
                                colors={[
                                    "#e15b64",
                                    "#f47e60",
                                    "#f8b26a",
                                    "#abbd81",
                                    "#849b87"
                                ]}
                            />
                            <p>Uploading file...</p>
                        </div>
                    ) : successfullySent ? (
                        <div className="w-full text-center text-2xl font-semibold">
                            Resume Sent Succesfully!
                        </div>
                    ) : (
                        <div className="mx-auto w-full">
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                className="w-full"
                            />
                            <label
                                htmlFor="fileInput"
                                className="mt-2 block w-full cursor-pointer rounded bg-red-500 px-4 py-2 text-center font-bold text-white"
                            >
                                Upload CV
                            </label>
                        </div>
                    )}
                </Box>
            </Box>
            <ReusableModal
                open={successModalOpen}
                title="Success"
                description={successMessage}
                onClose={() => setSuccessModalOpen(false)}
                type="success"
            />
            <ReusableModal
                open={errorModalOpen}
                title="Error"
                description={errorMessage}
                onClose={() => {
                    setErrorModalOpen(false)
                    setSelectedFile(null)
                }}
                type="error"
            />
            <ReusableModal
                open={errorModalFileSizeOpen}
                title="Error"
                description="File size should not exceed 5MB"
                onClose={() => {
                    setErrorModalFileSizeOpen(false)
                    setSelectedFile(null)
                }}
                type="error"
            />
            <ReusableModal
                open={errorModalFileTypeOpen}
                title="Error"
                description="Invalid file type. Only PDF, DOC, and DOCX are allowed"
                onClose={() => {
                    setErrorModalFileTypeOpen(false)
                    setSelectedFile(null)
                }}
                type="error"
            />
            <ReusableModalYesNo
                open={confirmUploadModalOpen}
                title="Send Resume to Employer"
                description="Your resume will be sent to the employer. Are you sure
                you want to proceed?"
                onClose={() => setConfirmUploadModalOpen(false)}
                executeAffirmative={() => handleFileUpload()}
                executeNegative={() => setConfirmUploadModalOpen(false)}
            />
        </section>
    )
}
