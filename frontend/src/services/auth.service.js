/**
 * @file auth.service.js
 * Gère les opérations d'authentification des utilisateurs.
 */

import axios from 'axios'
import { API_URL } from './api'

export const login = (email, password) => {
  return axios.post(`${API_URL}/auth/login`,
    { email, password },
    { withCredentials: true }
  )
}

export const logout = () => {
  return axios.post(`${API_URL}/auth/logout`)
}

export const register = (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData)
}

export const getMe = () => {
  return axios.get(`${API_URL}/users/me`, { withCredentials: true })
}
