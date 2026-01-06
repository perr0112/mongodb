import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { deleteArticle, getArticleBySlug } from "../../services";

import Tag from "../../components/tag/Tag";
import { MainLogo } from "../../components/icons";
import LinkComponent from "../../components/ui/Link";
import Comments from "../../components/ui/Comments";
import Button from "../../components/ui/button";

import UserContext from "../../contexts/user/UserContext";
import { isAdmin } from "../../utils/user";
import Modal from "../../components/ui/Modal";

const Details = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useContext(UserContext)

    useEffect(() => {
        getArticleBySlug(slug)
            .then(response => {
                setArticle(response.data || response)
            })
            .catch(error => {
                console.error(error)
                navigate("/recipes")
                toast.error("Recette introuvable.")
            });
    }, [slug, navigate])

    const handleDelete = async () => {
        try {
            await deleteArticle(article._id)
            toast.success("Recette supprimée.")
            navigate("/recipes")
        } catch (error) {
            toast.error("Erreur lors de la suppression.")
        }
    }

    if (!article) {
        return <div>Chargement...</div>
    }

    return (
        <main className="recipe-details">
            <div className="details-floating__content">
                <MainLogo />
            </div>

            <header className="recipe-details__hero">
                <div className="recipe-details__hero-image">
                    <img src={article.coverImage} alt={article.title} />
                    <div className="recipe-details__hero-overlay"></div>
                </div>
                <div className="recipe-details__hero-content">
                    <div>
                        <LinkComponent
                            href="/recipes"
                            className="back-link"
                            label="← Retour aux recettes"
                            type="link"
                        />
                        <div className="recipe-details__tags">
                            {article.categories?.map(cat => (
                                <Tag key={cat._id} text={cat.label} />
                            ))}
                        </div>

                        <h1>{article.title}</h1>

                        <div className="recipe-details__infos">
                            <span>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path></svg>
                                {article.rating.average} ({article.rating.count} avis)</span>
                            <span>{article.views} vues</span>
                        </div>
                    </div>

                    <div className="recipe-actions">
                        {
                           user && (isAdmin(user) || article.author._id === user._id) && (
                                <>
                                    <Button
                                        onClick={() => navigate(`/recipes/edit/${article.slug}`)}
                                        label="Modifier"
                                        variant="secondary"
                                        type="button"
                                    />

                                    <Button
                                        onClick={() => setIsModalOpen(true)}
                                        label="Supprimer la recette"
                                        variant="primary"
                                        type="button"
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            </header>

            <div className="recipe-details__container">
                <section className="recipe-details__main">
                    <div className="recipe-details__content">
                        {article.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    {/* <Comments
                        comments={article.comments} 
                        articleId={article._id} 
                        user={user}
                    /> */}

                    <Comments 
                        articleId={article._id} 
                        recipeAuthorId={article.author._id}
                        user={user} 
                    />
                </section>

                <aside className="recipe-details__sidebar">
                    <div className="author-card">

                        <p className="author-card__label">Proposé par</p>

                        <div className="author-card__info">
                            <div className="author-card__avatar">
                                <img src={article.author.avatarUrl} alt={article.author.username} />
                            </div>

                            <div>
                                <p className="author-card__name">
                                    {article.author.firstName} {article.author.lastName}
                                </p>
                                <p className="author-card__username">@{article.author.username}</p>
                            </div>
                        </div>

                    </div>

                    <div className="recipe-info-box">
                        <h3>Informations</h3>
                        <ul>
                            <li>Publié le : <strong>{new Date(article.createdAt).toLocaleDateString()}</strong></li>
                            <li>Difficulté : <strong>{article.categories?.find(c => ["Facile", "Intermédiaire", "Difficile"].includes(c.label))?.label || "N/C"}</strong></li>
                            <li>Temps de préparation : <strong>{article.duration} minutes</strong></li>
                        </ul>
                    </div>
                </aside>
            </div>

            <Modal
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Supprimer la recette ?"
            >
                <p>Êtes-vous sûr de vouloir supprimer <strong>{article.title}</strong> ? Cette action est irréversible.</p>
                <div className="modal__footer">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        style={{ background: '#eee', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        Annuler
                    </button>
                    <button 
                        onClick={handleDelete}
                        style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        Confirmer la suppression
                    </button>
                </div>
            </Modal>

        </main>
    )
}

export default Details
