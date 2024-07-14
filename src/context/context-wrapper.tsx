import React, { createContext, useEffect, useState } from "react"

import { User } from "@/types/user"
import fetchApi from "@/lib/api-handler"

type WrapperProps = {
  children: React.ReactNode
}

interface IAuthContext {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  handleLogout: () => void
  authenticateUser: () => void
}

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  authenticateUser: () => {},
} as IAuthContext)

const AuthContextWrapper = ({ children }: WrapperProps) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function authenticateUser() {
    const token = localStorage.getItem("token")
    try {
      if (token) {
        const response = await fetchApi("/api/auth/verify")
        setUser(response)
        setIsLoggedIn(true)
      } else {
        setIsLoading(false)
        setIsLoggedIn(false)
        setUser(null)
      }
    } catch (error) {
      console.error(error)
      setIsLoggedIn(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, authenticateUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }

export default AuthContextWrapper
