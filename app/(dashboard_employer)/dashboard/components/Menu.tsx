"use client"
import React, { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import WorkIcon from "@mui/icons-material/Work"
import PostAddIcon from "@mui/icons-material/PostAdd"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import CloseIcon from "@mui/icons-material/Close"
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

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
        <nav>
            <Box
                className="flex items-center px-4 py-4  bg-black "
                sx={{ borderRadius: isOpen ? "4px 4px 0 0" : "4px" }}
            >
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

                <div className="text-white text-lg ml-4 font-bold">
                    Dashboard navigation
                </div>
            </Box>
            {isOpen && (
                <Box
                    sx={{
                        backgroundColor: "white",
                        paddingY: "15px",
                        borderRadius: "0 0 4px 4px"
                    }}
                >
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
            )}
        </nav>
    )
}

export default HamburgerMenu
