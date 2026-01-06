/**
 * @file comments.service.js
 * Service pour la gestion des commentaires.
 */

import axios from "axios";
import { API_URL } from "./api";

const BASE_URL = `${API_URL}/comments`;

export const getCommentsByArticle = async (articleId) => {
    try {
        const response = await axios.get(`${BASE_URL}/article/${articleId}`)
        return response.data
    } catch (error) {
        if (error.response?.status === 404) return []
        throw error
    }
}

export const createComment = async (content, authorId, articleId) => {
    const response = await axios.post(BASE_URL, {
        content,
        author: authorId,
        article: articleId
    })
    return response.data
}

export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${BASE_URL}/${commentId}`, {
        withCredentials: true
    })
    return response.data
}
