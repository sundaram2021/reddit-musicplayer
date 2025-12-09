"use client"

/**
 * Reddit OAuth Authentication
 * Handles OAuth2 flow for Reddit API access
 */

const REDDIT_AUTH_URL = "https://www.reddit.com/api/v1/authorize"
const REDDIT_TOKEN_URL = "https://www.reddit.com/api/v1/access_token"

export interface AuthConfig {
  clientId: string
  redirectUri: string
  scope: string[]
}

export interface AuthToken {
  accessToken: string
  tokenType: string
  expiresIn: number
  scope: string
  refreshToken?: string
}

export function getAuthorizationUrl(clientId: string, redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    state: generateRandomString(32),
    redirect_uri: redirectUri,
    duration: "permanent",
    scope: ["identity", "read", "submit"].join(" "),
  })

  return `${REDDIT_AUTH_URL}?${params.toString()}`
}

export function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function saveAuthToken(token: AuthToken): void {
  localStorage.setItem("reddit_auth_token", JSON.stringify(token))
  localStorage.setItem("reddit_auth_timestamp", Date.now().toString())
}

export function getAuthToken(): AuthToken | null {
  const token = localStorage.getItem("reddit_auth_token")
  const timestamp = localStorage.getItem("reddit_auth_timestamp")

  if (!token || !timestamp) return null

  const parsedToken = JSON.parse(token) as AuthToken
  const age = (Date.now() - Number.parseInt(timestamp)) / 1000

  // Check if token is expired
  if (age > parsedToken.expiresIn) {
    localStorage.removeItem("reddit_auth_token")
    localStorage.removeItem("reddit_auth_timestamp")
    return null
  }

  return parsedToken
}

export function clearAuthToken(): void {
  localStorage.removeItem("reddit_auth_token")
  localStorage.removeItem("reddit_auth_timestamp")
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}
