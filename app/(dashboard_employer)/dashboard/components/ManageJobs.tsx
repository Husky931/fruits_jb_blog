"use client"
import React, { useState } from "react"
import { Button, Box, Typography, Divider, Modal } from "@mui/material"
import { User, JobPostAttributes } from "@/types" // Import the correct types

type ManageJobsProps = {
    user: User | undefined
}

const ManageJobs = ({ user }: ManageJobsProps) => {
    const [openModal, setOpenModal] = useState(false)
    // const [modalInfo, setModalInfo] = useState({
    //     id: null,
    //     action: "",
    //     title: ""
    // })

    const handleOpenModal = (jobId, action) => {
        // setModalInfo({ id: jobId, action, title: job.title })
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        // setModalInfo({ id: null, action: "", title: "" })
    }

    // const handleConfirmAction = () => {
    //     if (modalInfo.id) {
    //         // Implement the stop/delete logic
    //         console.log(`${modalInfo.action} job: ${modalInfo.id}`)
    //     }
    //     handleCloseModal()
    // }

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
                            .filter(
                                (job) => job.moderation_status === "approved"
                            )
                            .map((job: JobPostAttributes) => (
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
                                            <button
                                                className="mx-4"
                                                onClick={() =>
                                                    handleOpenModal(
                                                        job.id,
                                                        "stop"
                                                    )
                                                }
                                            >
                                                Stop
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleOpenModal(
                                                        job.id,
                                                        "delete"
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
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
                            // color:
                            //     modalInfo.action === "delete" ? "red" : "green",
                            textAlign: "center"
                        }}
                    >
                        {/* Confirm {modalInfo.action} */}
                        Confirm
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        {/* Are you sure you want to {modalInfo.action} the job '
                        {modalInfo.title}'? */}
                        Are you sure you want
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, marginTop: "25px" }}>
                        <Button
                            variant="contained"
                            // onClick={handleConfirmAction}
                            sx={{
                                backgroundColor: "red",
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
                                fontWeight: "bold"
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
