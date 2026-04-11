import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'

/**
 * Login with email + password.
 * @param {{ email: string, password: string }} credentials
 */
export async function loginApi(credentials) {
  return apiClient.post(ENDPOINTS.auth.login, credentials)
}

/**
 * Logout current session.
 */
export async function logoutApi() {
  return apiClient.post(ENDPOINTS.auth.logout)
}

/**
 * Fetch authenticated user profile.
 */
export async function getMeApi() {
  return apiClient.get(ENDPOINTS.auth.me)
}