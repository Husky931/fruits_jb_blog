"use client"
import React, { useState, useEffect, useRef } from "react"
// import { useUser } from "../../../context/user"
import { unsetToken as logout } from "../../../auth/authFunctions"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Link from "next/link"
import Image from "next/image"
import { User } from "../../../../types"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Tooltip from "@mui/material/Tooltip"

// const navItems = ["Home", "Forum", "Contact"]

export default function Nav() {
    // const user: User | undefined = useUser()
    const user = undefined

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className="w-full flex justify-between items-center px-4 py-3 bg-blue-600 rounded-lg">
            <Link
                prefetch={false}
                className="w-[50px] h-[40px]"
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
            >
                <div className="w-[50px] h-[40px] relative cursor-pointer">
                    <Image
                        src="/fruits_job_board_logo.png"
                        alt="harvest jobs logo"
                        width="70"
                        height="70"
                        className="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4"
                    />
                </div>
            </Link>

            <div>
                {/* <Tooltip title="Coming soon" sx={{ cursor: "default" }}>
                    <Button
                        sx={{
                            color: "white",
                            pr: { xs: 0, md: 1 },
                            pl: 0,
                            fontSize: "small"
                        }}
                    >
                        Forum
                    </Button>
                </Tooltip> */}

                <Link
                    prefetch={false}
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/employer`}
                >
                    <Button
                        sx={{
                            color: "white",
                            pr: { xs: 0, md: 1 },
                            fontSize: "small"
                        }}
                    >
                        Employer
                    </Button>
                </Link>
                <Link
                    prefetch={false}
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog`}
                >
                    <Button
                        sx={{
                            color: "white",
                            pr: { xs: 0, md: 1 },
                            fontSize: "small"
                        }}
                    >
                        Blog
                    </Button>
                </Link>

                {/* {!user && (
                    <>
                        <Tooltip title="Coming soon" sx={{ cursor: "default" }}>
                            <Button
                                // onClick={() => (showAuthModal.value = true)}
                                sx={{
                                    color: "white",
                                    pr: { xs: 0, md: 1 },
                                    fontSize: "small"
                                }}
                            >
                                Employer
                            </Button>
                        </Tooltip>
                    </>
                )} */}
                {user && (
                    <>
                        <Avatar
                            // onClick={(e) => handleClick(e)}
                            sx={{
                                cursor: "pointer",
                                width: { xs: "7.5", sm: "8.75" },
                                height: { xs: "7.5", sm: "8.75" },
                                backgroundColor: "blue.300",
                                display: "inline-flex"
                            }}
                        />

                        {/* <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button"
                            }}
                        >
                            <MenuItem className="py-0" onClick={() => logout()}>
                                Logout
                            </MenuItem>
                        </Menu> */}
                    </>
                )}
            </div>
        </div>
    )
}
