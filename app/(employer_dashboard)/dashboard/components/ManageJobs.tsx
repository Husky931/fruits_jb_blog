"use client"
import React, { useState } from "react"
import { Button, Box, Typography, Divider, Modal } from "@mui/material"
import { User, StrapiPostAttributes } from "@/types" // Import the correct types
import { getTokenFromLocalCookie } from "@/app/utils/auth"

type ManageJobsProps = {
    user: User | undefined
}

type ModalInfoTypes = {
    id: number | null
    action: string
    title: string
}

const ManageJobs = ({ user }: ManageJobsProps) => {
    const [openModal, setOpenModal] = useState(false)
    const [modalInfo, setModalInfo] = useState<ModalInfoTypes>({
        id: null,
        action: "",
        title: ""
    })

    const handleOpenModal = (jobId: number, action: string, title: string) => {
        setModalInfo({ id: jobId, action, title })
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setModalInfo({ id: null, action: "", title: "" })
    }

    const handleConfirmAction = async () => {
        if (modalInfo.id) {
            if (modalInfo.action === "start") {
                handleJob("running")
            }
            if (modalInfo.action === "stop") {
                handleJob("stopped")
            }
            if (modalInfo.action === "delete") {
                handleJob("deleted")
            }
        }
        handleCloseModal()
    }

    const handleJob = async (action: string) => {
        const token = getTokenFromLocalCookie()
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/job-posts/${modalInfo.id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: {
                        status: action
                    }
                })
            }
        )
        const data = await res.json()

        if (data.error) {
            alert(data.error.message)
        } else {
            window.location.reload()
        }
    }

    return (
        <Box className="mt-12">
            <div className="my-4 text-2xl">Manage Jobs</div>
            <Box className="bg-white shadow rounded-lg">
                <div className="flex justify-between items-center w-full p-6">
                    <div>
                        <div className="text-xl font-semibold">Active Jobs</div>
                    </div>
                </div>
                <Divider />

                <div className="mt-12 p-6">
                    {user && user.job_posts.length > 0 ? (
                        user.job_posts
                            .filter((job) => job.status !== "pending")
                            .map((job: StrapiPostAttributes) => (
                                <div
                                    key={job.createdAt}
                                    className="bg-gray-100 p-4 mb-4 rounded-lg shadow md:grid md:grid-cols-2 md:grid-rows-2"
                                >
                                    <div className="md:col-span-2">
                                        <div className="text-xl font-semibold mb-2">
                                            {job.title}
                                        </div>
                                    </div>
                                    <div className="text-gray-500">
                                        <div className="mb-1">
                                            Posted on:{" "}
                                            {new Date(
                                                job.createdAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </div>
                                        <div>
                                            Last updated:{" "}
                                            {new Date(
                                                job.updatedAt
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 md:text-right">
                                        <div className="mb-1">
                                            Status:{" "}
                                            <span
                                                className={`font-semibold ${
                                                    job.status === "running"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {job.status}
                                            </span>
                                        </div>
                                        <div>
                                            {job.status !== "deleted" && (
                                                <div>
                                                    {job.status ===
                                                        "running" && (
                                                        <button
                                                            className="md:mx-4"
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    job.id,
                                                                    "stop",
                                                                    job.title
                                                                )
                                                            }
                                                        >
                                                            Stop
                                                        </button>
                                                    )}
                                                    {job.status ===
                                                        "stopped" && (
                                                        <button
                                                            className="md:mx-4"
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    job.id,
                                                                    "start",
                                                                    job.title
                                                                )
                                                            }
                                                        >
                                                            Start
                                                        </button>
                                                    )}
                                                    <button
                                                        className="ml-4 md:ml-0"
                                                        onClick={() =>
                                                            handleOpenModal(
                                                                job.id,
                                                                "delete",
                                                                job.title
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <Typography variant="h6" className="text-center">
                            No approved jobs to manage yet
                        </Typography>
                    )}
                </div>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    className="bg-white p-6 mx-auto rounded-lg shadow-lg"
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
                            color:
                                modalInfo.action === "delete" ? "red" : "green",
                            textAlign: "center"
                        }}
                    >
                        Confirm {modalInfo.action}
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to {modalInfo.action} the job '
                        {modalInfo.title}'?
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, marginTop: "25px" }}>
                        <Button
                            variant="contained"
                            onClick={handleConfirmAction}
                            sx={{
                                backgroundColor: "red !important",
                                "&:hover": {
                                    backgroundColor: "red"
                                },
                                color: "white",
                                width: "100%",
                                padding: "8px",
                                fontWeight: "bold"
                            }}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleCloseModal}
                            sx={{
                                color: "black",
                                width: "100%",
                                padding: "8px",
                                fontWeight: "bold",
                                "&:hover": {
                                    back: "none"
                                }
                            }}
                        >
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default ManageJobs
