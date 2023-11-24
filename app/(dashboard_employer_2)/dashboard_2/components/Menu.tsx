// Import necessary components and hooks
import React, { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import WorkIcon from "@mui/icons-material/Work"
import PostAddIcon from "@mui/icons-material/PostAdd"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import CloseIcon from "@mui/icons-material/Close"
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toogleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav>
            <Box
                className="flex items-center px-4 py-4  bg-black"
                sx={{ borderRadius: isOpen ? "4px 4px 0 0" : "4px" }}
            >
                <MenuIcon
                    onClick={toogleMenu}
                    fontSize="large"
                    sx={{ color: "white", padding: "0" }}
                />
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
                    <ListItemButton className="hover:bg-white/20">
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

                    <ListItemButton className="hover:bg-white/20">
                        <ListItemIcon>
                            <WorkIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Jobs" />
                    </ListItemButton>

                    <ListItemButton className="hover:bg-white/20">
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
