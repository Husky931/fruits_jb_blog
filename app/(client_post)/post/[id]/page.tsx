"use client"
import { useEffect, useState } from "react"
import { ColorRing } from "react-loader-spinner"
import { useClientPosts } from "@/context/ClientPostsContext"
import { StrapiPostAttributes } from "@/types"
import { Box, Modal, Typography, Button } from "@mui/material"
import Link from "next/link"
import ReusableModal from "@/app/(dashboard_employer)/dashboard/components/ReusableModal"

interface JobPost {
    id: number
    attributes: StrapiPostAttributes
}

export default function ClientPostPage({ params }: { params: { id: string } }) {
    const id = params.id
    const [post, setPost] = useState<JobPost | null>(null)
    const [selectedFile, setSelectedFile] = useState()

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
                console.log(post, "posts from page")
                setPost(post)
            }

            setIsLoading(false)
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

        const timestamp = new Date().getTime() // Get current timestamp
        const modifiedFileName = `resume_${timestamp}_${selectedFile.name}`

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
        const currentApplicantsNumber = post.attributes.applicants_number || 0

        try {
            const updateResponse = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/job-posts/${post.id}`,
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
                    paddingBottom: "30px",
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
                <Box sx={{ marginTop: "30px", width: "100%" }}>
                    {successfullySent ? (
                        <div className="text-2xl font-semibold w-full text-center">
                            Resume Sent Succesfully!
                        </div>
                    ) : (
                        <div className="w-full mx-auto">
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                className="w-full"
                            />
                            <label
                                htmlFor="fileInput"
                                className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded block w-full cursor-pointer text-center"
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
                onClose={() => setErrorModalOpen(false)}
                type="error"
            />
            <ReusableModal
                open={errorModalFileSizeOpen}
                title="Error"
                description="File size should not exceed 5MB"
                onClose={() => setErrorModalFileSizeOpen(false)}
                type="error"
            />
            <ReusableModal
                open={errorModalFileTypeOpen}
                title="Error"
                description="Invalid file type. Only PDF, DOC, and DOCX are allowed"
                onClose={() => setErrorModalFileTypeOpen(false)}
                type="error"
            />
            <Modal
                open={confirmUploadModalOpen}
                onClose={() => setConfirmUploadModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    className="bg-white p-6 mx-auto rounded-lg shadow-lg "
                    sx={(theme) => ({
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        [theme.breakpoints.up("sm")]: {
                            width: "400px"
                        },
                        maxWidth: "100%",
                        outline: "none"
                    })}
                >
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: "green",
                            textAlign: "center"
                        }}
                    >
                        Send Resume to Employer
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Your resume will be sent to the employer. Are you sure
                        you want to proceed?
                    </Typography>
                    <Box sx={{ display: "flex", gap: "3rem" }}>
                        <Button
                            variant="contained"
                            onClick={() => setConfirmUploadModalOpen(false)}
                            sx={{
                                marginTop: "20px",
                                backgroundColor: "red !important",
                                color: "white",
                                width: "100%",
                                padding: "8px",
                                fontWeight: "bold"
                            }}
                        >
                            No
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleFileUpload()}
                            sx={{
                                marginTop: "20px",
                                backgroundColor: "green !important",
                                color: "white",
                                width: "100%",
                                padding: "8px",
                                fontWeight: "bold"
                            }}
                        >
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </section>
    )
}
