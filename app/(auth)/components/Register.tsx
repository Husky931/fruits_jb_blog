"use client"
import React, { useState, useRef } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { TextField, Button, Box } from "@mui/material"
import { usePathname } from "next/navigation"
import { setToken } from "../../utils/auth"
import { ColorRing } from "react-loader-spinner"

type Inputs = {
    email: string
    username: string
    password: string
    passwordConfirm: string
}

const Register: React.FC<{
    setDisplayRegister: (display: boolean) => void
}> = ({ setDisplayRegister }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [serverError, setServerError] = useState("")
    const pathname = usePathname()

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            username: "",
            password: "",
            passwordConfirm: ""
        }
    })

    const password = useRef({})
    password.current = watch("password", "")

    const registerUser: SubmitHandler<Inputs> = async (data: Inputs) => {
        setIsLoading(true)
        try {
            const submitData = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/auth/local/register`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        password: data.password,
                        email: data.email,
                        username: data.email,
                        userType:
                            pathname.includes("employer") === true
                                ? "employer"
                                : "jobseeker"
                    })
                }
            )

            const res = await (submitData as Response).json()

            if (res.error) {
                setShow(true)
                setServerError(res.error.message)
                return
            }
            setToken(res)
        } catch (error) {
            console.log(error)
            alert(
                "There was an error connecting to the server. Please try again later."
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "md",
                padding: 4,
                marginX: "auto"
            }}
        >
            {isLoading ? (
                <div style={{ pointerEvents: "none" }}>
                    <ColorRing
                        visible={true}
                        height="140"
                        width="140"
                        ariaLabel="loading-indicator"
                        colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87"
                        ]}
                    />
                </div>
            ) : (
                <>
                    <div className="mb-[20px] flex flex-col items-center justify-center">
                        <div className="text-2xl">Welcome employer</div>
                        <div className="">Create your account</div>
                    </div>
                    <Box>
                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: true }}
                            render={({ field: { onChange, value, ref } }) => (
                                <TextField
                                    fullWidth
                                    inputRef={ref}
                                    label="Email"
                                    type="email"
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.email}
                                    variant="standard"
                                    sx={{
                                        "& .MuiInput-underline:before": {
                                            borderBottomColor:
                                                "#f4f4f9 !important"
                                        },
                                        "&:hover .MuiInput-underline:before": {
                                            borderBottomColor:
                                                "#f4f4f9 !important"
                                        },
                                        "&.Mui-focused .MuiInput-underline:before":
                                            {
                                                borderBottomColor:
                                                    "#f4f4f9 !important"
                                            },
                                        "& .MuiInputBase-input": {
                                            paddingBottom: "8px !important"
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#86a1d8"
                                        }
                                    }}
                                    InputProps={{
                                        sx: {
                                            color: "#86a1d8"
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: true, minLength: 6 }}
                            render={({ field: { onChange, value, ref } }) => (
                                <TextField
                                    fullWidth
                                    inputRef={ref}
                                    label="Password"
                                    type="password"
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.password}
                                    variant="standard"
                                    sx={{
                                        "& .MuiInput-underline:before": {
                                            borderBottomColor:
                                                "#f4f4f9 !important"
                                        },
                                        "&:hover .MuiInput-underline:before": {
                                            borderBottomColor:
                                                "#f4f4f9 !important"
                                        },
                                        "&.Mui-focused .MuiInput-underline:before":
                                            {
                                                borderBottomColor:
                                                    "#f4f4f9 !important"
                                            },
                                        "& .MuiInputBase-input": {
                                            paddingBottom: "8px !important"
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#86a1d8"
                                        }
                                    }}
                                    InputProps={{
                                        sx: {
                                            color: "#86a1d8"
                                        }
                                    }}
                                />
                            )}
                        />
                        {errors.password &&
                            errors.password.type === "minLength" && (
                                <span className="text-[#d32f2f]">
                                    Minimum password length is 6 charachters
                                </span>
                            )}
                        <Controller
                            control={control}
                            name="passwordConfirm"
                            rules={{
                                required: true,
                                minLength: 6,
                                validate: (val: string) => {
                                    if (watch("password") != val) {
                                        return (
                                            val === password.current ||
                                            "Passwords do not match"
                                        )
                                    }
                                }
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                                <TextField
                                    fullWidth
                                    inputRef={ref}
                                    label="Confirm password"
                                    type="password"
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.passwordConfirm}
                                    variant="standard"
                                    sx={{
                                        "& .MuiInput-underline:before": {
                                            borderBottomColor:
                                                "#f4f4f9 !important"
                                        },
                                        "&:hover .MuiInput-underline:before": {
                                            borderBottomColor:
                                                "#f4f4f9 !important"
                                        },
                                        "&.Mui-focused .MuiInput-underline:before":
                                            {
                                                borderBottomColor:
                                                    "#f4f4f9 !important"
                                            },
                                        "& .MuiInputBase-input": {
                                            paddingBottom: "8px !important"
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#86a1d8"
                                        }
                                    }}
                                    InputProps={{
                                        sx: {
                                            color: "#86a1d8"
                                        }
                                    }}
                                />
                            )}
                        />
                        {errors.passwordConfirm && (
                            <p className="text-[#d32f2f]">
                                {errors.passwordConfirm.message}
                            </p>
                        )}

                        {show ? (
                            <span className="w-full text-center text-red-900 border-[1px] border-red-900 rounded py-2">
                                {serverError}
                            </span>
                        ) : null}
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            paddingY: "10px !important",
                            marginTop: "30px !important",
                            background: "#86a1d8 !important",
                            color: "#f4f4f9"
                        }}
                        onClick={handleSubmit(registerUser)}
                    >
                        Sign Up
                    </Button>
                    <div className="w-full flex flex-col justify-center items-center mt-8">
                        <div className="">Already have an account?</div>
                        <div
                            onClick={() => setDisplayRegister(false)}
                            className="font-semibold underline cursor-pointer text-xl"
                        >
                            Log in
                        </div>
                    </div>
                </>
            )}
        </Box>
    )
}

export default Register
