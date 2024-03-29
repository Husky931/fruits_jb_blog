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
                <div className="mx-auto w-full p-4">
                    <Link href="/" passHref>
                        <div className="relative h-[45px] w-[55px] cursor-pointer">
                            <Image
                                src="/fruits_job_board_logo_black.png"
                                alt="harvest jobs logo"
                                width="70"
                                height="70"
                                className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 transform"
                            />
                        </div>
                    </Link>
                </div>
                <div className="mt-8">
                    <ListItemButton
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.2)"
                            }
                        }}
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
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.2)"
                            }
                        }}
                        onClick={() => setView("ManageJobs")}
                    >
                        <ListItemIcon>
                            <WorkIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Jobs" />
                    </ListItemButton>

                    <ListItemButton
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.2)"
                            }
                        }}
                        onClick={() => setView("PostJob")}
                    >
                        <ListItemIcon>
                            <PostAddIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary="Post a job" />
                    </ListItemButton>
                </div>
            </Box>

            <Box className="mb-4">
                {" "}
                {/* Added margin at the bottom */}
                <ListItemButton
                    sx={{
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)"
                        }
                    }}
                    onClick={() => {
                        unsetToken()
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon sx={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItemButton>
            </Box>
        </Box>
    )
}

export default NormalMenu
