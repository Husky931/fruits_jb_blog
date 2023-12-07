"use client"
import {
    createContext,
    useState,
    useEffect,
    useContext,
    FC,
    ReactNode
} from "react"
import { getTokenFromLocalCookie, unsetToken } from "../app/utils/auth"

const Context = createContext(undefined)

export function Provider({ children }: any) {
    const [userData, setUserData] = useState()

    useEffect(() => {
        const getUserData = async () => {
            const user = !!getTokenFromLocalCookie()
            if (user) {
                const token = getTokenFromLocalCookie()

                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_STRAPI_SERVER}/api/users/me?populate=*`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )

                    const data = await res.json()
                    setUserData(data)
                } catch (error) {
                    unsetToken()
                    return
                }
            }
        }
        getUserData()
    }, [])

    return <Context.Provider value={userData}>{children}</Context.Provider>
}

export const useUser = () => useContext(Context)
