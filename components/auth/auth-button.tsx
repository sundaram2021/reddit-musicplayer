"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getAuthToken, clearAuthToken } from "@/lib/reddit-auth"
import { LogOut, LogIn } from "lucide-react"

export function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const token = getAuthToken()
    setIsAuthenticated(!!token)

    // Fetch current user if authenticated
    if (token) {
      fetchCurrentUser(token.accessToken)
    }
  }, [])

  const fetchCurrentUser = async (accessToken: string) => {
    try {
      const response = await fetch("https://oauth.reddit.com/api/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.ok) {
        const data = (await response.json()) as { name: string }
        setUsername(data.name)
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
    }
  }

  const handleLogout = () => {
    clearAuthToken()
    setIsAuthenticated(false)
    setUsername(null)
  }

  const handleLogin = () => {
    // In production, this would redirect to Reddit OAuth
    // For now, we'll show a placeholder
    alert("Reddit OAuth login would be implemented here")
  }

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated && username ? (
        <>
          <span className="text-sm text-muted-foreground">{username}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-accent"
            title="Log Out"
          >
            <LogOut size={18} />
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogin}
          className="text-muted-foreground hover:text-accent"
          title="Log In with Reddit"
        >
          <LogIn size={18} />
        </Button>
      )}
    </div>
  )
}
