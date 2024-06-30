"use client"
import React, { useState, useEffect, useRef } from "react"
import { useUser } from "@/context/AuthUserContext"
import { User } from "@/types"
import { unsetToken as signout } from "@/app/utils/auth"
import { Button, Menu, MenuItem } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import Avatar from "@mui/material/Avatar"
import PersonIcon from "@mui/icons-material/Person"

export default function Nav() {
    const user: User | undefined = useUser()

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

    const [isScrolling, setIsScrolling] = useState(false)
    let scrollTimeout: number | null = null

    const handleScroll = () => {
        if (!isScrolling) setIsScrolling(true)

        if (scrollTimeout !== null) {
            clearTimeout(scrollTimeout)
        }

        scrollTimeout = window.setTimeout(() => {
            setIsScrolling(false)
        }, 200) // Adjust the time to control the delay
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (scrollTimeout !== null) {
                clearTimeout(scrollTimeout)
            }
        }
    }, [])

    return (
        <div
            className={`fixed top-0 z-50 mx-auto flex w-full transform items-center justify-between px-12 py-3 transition-all duration-700 ${
                isScrolling ? "opacity-0" : "border-0 bg-blue-600 opacity-100"
            }`}
        >
            <Link
                prefetch={false}
                // className="h-[35px] w-[60px]"
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
            >
                <div className="relative h-[35px] w-[65px] cursor-pointer">
                    <img
                        src="/fruits_job_board_logo.png"
                        alt="harvest jobs logo"
                        className="h-full w-full"
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
                            {" "}
                            <Link href="/dashboard">
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
                            </Link>
                            {/* <Divider /> */}
                            <MenuItem
                                sx={{
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    fontSize: "15px",
                                    fontFamily: "__Manrope_452239"
                                }}
                                onClick={() => signout()}
                            >
                                Sign Out
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
        </div>
    )
}
