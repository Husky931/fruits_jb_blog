import React from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { Box, TextField, Button } from "@mui/material"
// import { setToken } from "../../pages/api/auth/js-cookie"
// import { showForgotPassModal } from "../../signals/showForgotPassModal"
// import { showAuthModal } from "../../signals/showAuthModal"

type Inputs = {
    username: string
    password: string
}

const Login: React.FC<{ setDisplayRegister: (display: boolean) => void }> = ({
    setDisplayRegister
}) => {
    const [show, setShow] = useState(false)
    const [serverError, setServerError] = useState("")

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const loginUser: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const submitData = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/auth/local`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        password: data.password,
                        identifier: data.username
                    })
                }
            )
            const res = await submitData.json()

            if (res.error) {
                if (
                    res.error.message === "Your account email is not confirmed"
                ) {
                    return window.location.assign(
                        `${process.env.NEXT_PUBLIC_LINGO_HOMEPAGE}/verify-email`
                    )
                }

                setShow(true)
                setServerError(res.error.message)
                return
            }

            // setToken(res)
        } catch (error) {
            alert(
                "There was an error connecting to the server. Please try again later."
            )
            console.log(error)
        }
    }

    return (
        <Box className="flex flex-col items-center justify-center w-full max-w-md p-4 mx-auto">
            <div className="flex flex-col items-center justify-center mb-8">
                <div className="text-[22px] ">Welcome</div>
                <div className="">Log in to your dashboard</div>
            </div>

            <Controller
                control={control}
                name="username"
                rules={{ required: true }}
                render={({ field: { onChange, value, ref } }) => (
                    <TextField
                        fullWidth
                        inputRef={ref}
                        value={value}
                        onChange={onChange}
                        label="Username or Email"
                        error={!!errors.username}
                        variant="standard"
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: "#f4f4f9 !important"
                            },
                            "&:hover .MuiInput-underline:before": {
                                borderBottomColor: "#f4f4f9 !important"
                            },
                            "&.Mui-focused .MuiInput-underline:before": {
                                borderBottomColor: "#f4f4f9 !important"
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
            {errors.username && (
                <span className="text-[#d32f2f]">
                    {errors.username.message}
                </span>
            )}
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
                                borderBottomColor: "#f4f4f9 !important"
                            },
                            "&:hover .MuiInput-underline:before": {
                                borderBottomColor: "#f4f4f9 !important"
                            },
                            "&.Mui-focused .MuiInput-underline:before": {
                                borderBottomColor: "#f4f4f9 !important"
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
            {errors.password && errors.password.type === "minLength" && (
                <span className="text-[#d32f2f]">
                    Minimum password length is 6 charachters
                </span>
            )}
            {show ? (
                <span className="w-full text-center text-red-900 border-[1px] border-red-900 rounded py-2">
                    {serverError}
                </span>
            ) : null}

            <Button
                variant="contained"
                fullWidth
                sx={{
                    paddingY: "10px !important",
                    marginTop: "30px !important",
                    background: "#86a1d8 !important",
                    color: "#f4f4f9"
                }}
                onClick={handleSubmit(loginUser)}
            >
                Log in
            </Button>
            <div
                className="w-full  cursor-pointer text-center mt-2"
                // onClick={() => {
                //     showAuthModal.value = false
                //     showForgotPassModal.value = true
                // }}
            >
                Forgot password?
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-8">
                <div className="">Don't have an account yet?</div>
                <div
                    onClick={() => setDisplayRegister(true)}
                    className=" font-semibold underline cursor-pointer text-xl"
                >
                    Sign up
                </div>
            </div>
        </Box>
    )
}

export default Login
