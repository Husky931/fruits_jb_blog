"use client"
import React, { useState, useEffect, useRef } from "react"
import { useUser } from "@/context/AuthUser"
import { User } from "@/types"
import { unsetToken as logout } from "@/app/utils/auth"
import { Button, Menu, MenuItem } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import Avatar from "@mui/material/Avatar"
import PersonIcon from "@mui/icons-material/Person"

export default function Nav() {
    const user: User | undefined = useUser()
    // console.log(user, "i am user")

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

            <div className="flex items-center">
                {" "}
                {/* Added flex wrapper */}
                <Link
                    prefetch={false}
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/employer`}
                >
                    <Button
                        sx={{
                            color: "white",
                            pr: { xs: 0, md: 1 },
                            fontSize: "small",
                            fontFamily: "__Manrope_452239"
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
                            fontSize: "small",
                            fontFamily: "__Manrope_452239"
                        }}
                    >
                        Blog
                    </Button>
                </Link>
                {user && (
                    <div className="flex items-center">
                        <Avatar
                            onClick={(e) => handleClick(e)}
                            sx={{
                                cursor: "pointer",
                                pr: { xs: 0, md: 1 },
                                backgroundColor: "blue.300",
                                width: "30px",
                                height: "30px"
                            }}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            autoFocus={false}
                            MenuListProps={{
                                "aria-labelledby": "basic-button"
                            }}
                            sx={{
                                fontSize: "12px",
                                fontFamily: "__Manrope_452239"
                            }}
                        >
                            <MenuItem
                                sx={{
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    fontSize: "15px",
                                    fontFamily: "__Manrope_452239"
                                }}
                            >
                                New
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    fontSize: "15px",
                                    fontFamily: "__Manrope_452239"
                                }}
                            >
                                Dashboard
                            </MenuItem>
                            {/* <Divider /> */}
                            <MenuItem
                                sx={{
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    fontSize: "15px",
                                    fontFamily: "__Manrope_452239"
                                }}
                                onClick={() => logout()}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        </div>
    )
}
