// ReusableModal.tsx
import React from "react"
import { Modal, Typography, Button, Box } from "@mui/material"

interface ReusableModalProps {
    open: boolean
    title: string
    description: string
    onClose: () => void
    type: "success" | "error"
}

const ReusableModal: React.FC<ReusableModalProps> = ({
    open,
    title,
    description,
    onClose,
    type
}) => {
    const isSuccessful = type === "success"

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                className="mx-auto rounded-lg bg-white p-6 shadow-lg "
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
                        color: isSuccessful ? "green" : "red",
                        textAlign: "center"
                    }}
                >
                    {title}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    {description}
                </Typography>
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{
                        marginTop: "20px",
                        backgroundColor: isSuccessful
                            ? "green !important"
                            : "red !important",
                        color: "white",
                        width: "100%",
                        padding: "8px",
                        fontWeight: "bold"
                    }}
                >
                    OK
                </Button>
            </Box>
        </Modal>
    )
}

export default ReusableModal
