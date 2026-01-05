/**
 * @file user.service.js
 * Gère les opérations liées à la modification d'un utilisateur.
 */

import axios from 'axios'
import { API_URL } from './api'

export const updateUser = (data) => {
    return axios.put(`${API_URL}/users/update`, data, { withCredentials: true })
}
