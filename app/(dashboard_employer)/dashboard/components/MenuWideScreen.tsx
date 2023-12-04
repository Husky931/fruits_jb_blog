"use client"
import React from "react"
import WorkIcon from "@mui/icons-material/Work"
import PostAddIcon from "@mui/icons-material/PostAdd"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import LogoutIcon from "@mui/icons-material/Logout"
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import { unsetToken } from "@/app/utils/auth"

type NormalMenuProps = {
    setView: (view: string) => void
}

const NormalMenu = ({ setView }: NormalMenuProps) => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                borderRadius: "0 0 4px 4px",
                height: "100vh",
                position: "sticky",
                top: 0,
                paddingX: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingBottom: "20px" // Added padding at the bottom
            }}
        >
            <Box>
                <Box className="w-full py-4 mx-auto">
                    <Link href="/" passHref>
                        <Image
                            src="/fruits_job_board_logo_blue.png"
                            alt="Fruits Jobs Logo"
                            width={100}
                            height={50}
                            className="mx-auto"
                        />
                    </Link>
                </Box>
                <Box className="mt-8">
                    <ListItemButton
                        className="hover:bg-white/20"
                        onClick={() => setView("Dashboard")}
                    >
                        <ListItemIcon>
                            <ReceiptLongIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Dashboard"
                            sx={{
                                fontWeight: "bold"
                            }}
                        />
                    </ListItemButton>

                    <ListItemButton
                        className="hover:bg-white/20"
                        onClick={() => setView("ManageJobs")}
                    >
                        <ListItemIcon>
                            <WorkIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Jobs" />
                    </ListItemButton>

                    <ListItemButton
                        className="hover:bg-white/20"
                        onClick={() => setView("PostJob")}
                    >
                        <ListItemIcon>
                            <PostAddIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary="Post a job" />
                    </ListItemButton>
                </Box>
            </Box>

            <Box className="mb-4">
                {" "}
                {/* Added margin at the bottom */}
                <ListItemButton
                    className="hover:bg-white/20"
                    onClick={() => {
                        unsetToken()
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon sx={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItemButton>
            </Box>
        </Box>
    )
}

export default NormalMenu
