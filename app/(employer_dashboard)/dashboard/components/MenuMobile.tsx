"use client"
import React from "react"
import MenuIcon from "@mui/icons-material/Menu"
import WorkIcon from "@mui/icons-material/Work"
import PostAddIcon from "@mui/icons-material/PostAdd"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import CloseIcon from "@mui/icons-material/Close"
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

type HamburgerMenuProps = {
    setView: (view: string) => void
    setIsOpen: (isOpen: boolean) => void
    isOpen: boolean
}

const HamburgerMenu = ({ setView, setIsOpen, isOpen }: HamburgerMenuProps) => {
    const toogleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="w-full ">
            <div
                className="flex w-full items-center justify-around rounded bg-black px-4 py-4"
                style={
                    isOpen
                        ? { borderRadius: "4px 4px 0 0" }
                        : { borderRadius: "4px" }
                }
            >
                <Link href="/" passHref>
                    <div className="relative h-[45px] w-[55px] cursor-pointer">
                        <Image
                            src="/fruits_job_board_logo_white.png"
                            alt="harvest jobs logo"
                            width="70"
                            height="70"
                            className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 transform"
                        />
                    </div>
                </Link>
                <div className="text-lg font-bold text-white">
                    Dashboard navigation
                </div>

                {isOpen ? (
                    <CloseIcon
                        onClick={toogleMenu}
                        fontSize="large"
                        sx={{ color: "white", padding: "0" }}
                    />
                ) : (
                    <MenuIcon
                        onClick={toogleMenu}
                        fontSize="large"
                        sx={{ color: "white", padding: "0" }}
                    />
                )}
            </div>
            {isOpen && (
                <Box
                    sx={{
                        backgroundColor: "white",
                        paddingY: "15px",
                        borderRadius: "0 0 4px 4px"
                    }}
                >
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
                </Box>
            )}
        </nav>
    )
}

export default HamburgerMenu
