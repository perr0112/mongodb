import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { 
    createComment, 
    deleteComment, 
    getCommentsByArticle 
} from "../../services/comments.service";

import Button from "../../components/ui/button";
import Modal from "./Modal";

import { getIdentity } from "../../utils/user";

const Comments = ({ articleId, recipeAuthorId, user }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null)

    const isAdmin = user?.role === "admin" || user?.isAdmin === true

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getCommentsByArticle(articleId)
                setComments(data)
            } catch (error) {
                console.error("Erreur chargement commentaires:", error)
            } finally {
                setLoading(false)
            }
        }

        if (articleId) fetchComments()
    }, [articleId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        setIsSubmitting(true)
        try {
            const createdData = await createComment(newComment, user._id, articleId)

            const commentToDisplay = {
                ...createdData,
                createdAt: new Date().toISOString(),
                author: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    avatarUrl: user.avatarUrl,
                    role: user.role
                }
            }

            setComments([commentToDisplay, ...comments])
            setNewComment("")
            toast.success("Votre avis a été publié !")
        } catch (error) {
            toast.error("Erreur lors de la publication.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const confirmDelete = async () => {
        if (!commentToDelete) return

        try {
            await deleteComment(commentToDelete)
            setComments(comments.filter(c => c._id !== commentToDelete))
            toast.success("Commentaire supprimé")
        } catch (error) {
            toast.error("Erreur lors de la suppression")
        } finally {
            setIsModalOpen(false)
            setCommentToDelete(null)
        }
    }

    const openDeleteModal = (commentId) => {
        setCommentToDelete(commentId)
        setIsModalOpen(true)
    }

    if (loading) return <div className="comments-loading">Chargement des avis...</div>

    return (
        <section className="comments-section">
            <div className="comments-header">
                <h3>Avis ({comments.length})</h3>
            </div>

            <div className="comment-form">
                {user ? (
                    <form onSubmit={handleSubmit}>
                        <textarea
                            placeholder="Partagez votre avis sur cette recette..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            name="comment"
                            required
                        />
                        <div className="comment-form__footer">
                            <Button 
                                label={isSubmitting ? "Publication..." : "Publier mon avis"} 
                                type="submit" 
                                variant="primary" 
                                disabled={isSubmitting}
                            />
                        </div>
                    </form>
                ) : (
                    <div className="comment-form__login-prompt">
                        <p>Vous devez être connecté pour laisser un commentaire.</p>
                    </div>
                )}
            </div>

            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map((comment) => {
                        const isAuthorOfRecipe = comment.author?._id === recipeAuthorId;
                        const isCommentOwner = user?._id === comment.author?._id;
                        const canDelete = isCommentOwner || isAdmin;

                        return (
                            <div key={comment._id} className="comment-item">
                                <div className="comment-item__avatar">
                                    <img src={comment.author?.avatarUrl} alt={comment.author?.username} />
                                </div>
                                
                                <div className="comment-item__body">
                                    <div className="comment-item__meta">
                                        <div className="comment-item__info">
                                            <div className="comment-item__author-row">
                                                <span className="comment-item__author">
                                                    {getIdentity(comment.author)}
                                                </span>
                                                {isAuthorOfRecipe && <span className="badge badge--author">Auteur</span>}
                                                {comment.author?.role === "admin" && <span className="badge badge--admin">Admin</span>}
                                            </div>
                                            <span className="comment-item__date">
                                                • {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "À l'instant"}
                                            </span>
                                        </div>

                                        {canDelete && (
                                            <button
                                                onClick={() => openDeleteModal(comment._id)}
                                                type="button"
                                                className="comment-item__delete"
                                            >
                                                Supprimer
                                            </button>
                                        )}
                                    </div>
                                    <p className="comment-item__content">{comment.content}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="no-comments">Pas encore d'avis. Soyez le premier à commenter !</p>
                )}
            </div>

            <Modal
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Supprimer le commentaire ?"
            >
                <p>Voulez-vous vraiment supprimer ce commentaire ? Cette action est définitive.</p>
                <div className="modal__footer" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        style={{ background: '#eee', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        Annuler
                    </button>
                    <button 
                        onClick={confirmDelete}
                        style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        Confirmer
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default Comments;
