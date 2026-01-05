/**
 * @file articles.service.js
 * Gère les opérations liées aux articles.
 */

import axios from 'axios'
import { API_URL } from './api'

export const getArticles = (filters) => {
    return axios.get(`${API_URL}/articles`, { params: filters })
}

export const getArticleBySlug = (slug) => {
    return axios.get(`${API_URL}/articles/slug/${slug}`)
}

export const createArticle = (articleData) => {
    return axios.post(`${API_URL}/articles`, articleData, { withCredentials: true })
}

export const updateArticle = (articleId, articleData) => {
    return axios.put(`${API_URL}/articles/${articleId}`, articleData, { withCredentials: true })
}

export const deleteArticle = (articleId) => {
    return axios.delete(`${API_URL}/articles/${articleId}`, { withCredentials: true })
}

export const getArticlesFromUser = (userId) => {
    return axios.get(`${API_URL}/articles/user/${userId}`, { withCredentials: true })
}
