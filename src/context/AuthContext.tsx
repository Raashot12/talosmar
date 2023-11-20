"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useLayoutEffect,
} from "react"
import Cookies from "js-cookie"
import {useRouter} from "next/navigation"
interface AuthContextProps {
  children: ReactNode
}

interface AuthContextType {
  isLoggedIn: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthContextProps> = ({children}) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
  const router = useRouter()
  useLayoutEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
    if (storedIsLoggedIn) {
      setLoggedIn(JSON.parse(storedIsLoggedIn))
    }
  }, [])

  const logout = () => {
    Cookies.remove("loggedin")
    router.push("/log-in")
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
