import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getArticleBySlug, updateArticle } from "../../services/articles.service";

import ArticleForm from "./Form";
import UserContext from "../../contexts/user/UserContext";

const EditRecipe = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { user, loading } = useContext(UserContext)

    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getArticleBySlug(slug).then(res => setArticle(res.data || res))
    }, [slug])

    const handleUpdate = async (updatedData) => {

        const finalCategories = []
        if (updatedData.category) finalCategories.push(updatedData.category)
        if (updatedData.difficulty) finalCategories.push(updatedData.difficulty)

        const finalData = {
            ...updatedData,
            categories: finalCategories
        }

        setIsLoading(true)
        try {
            updateArticle(article._id, finalData).then((res) => {
                toast.success("Recette mise à jour !")
                console.log('res after update', res)
                navigate(`/recipes/${res.data.slug}`)
            })
            
        } catch (error) {
            toast.error("Erreur lors de la mise à jour.")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!loading && article) {
            console.log("role", user?.role, article?.author._id, user?._id)
            if (
                !user || (
                    user.role !== "admin" && article?.author._id !== user._id
                )
            ) {
                toast.error("Vous n'avez pas les droits pour accéder à cette page.")
                navigate("/recipes")
            }
        }
    })

    if (!article) return <p>Chargement...</p>;

    return (
        <div className="create-recipe__layout">
            <header className="create-recipe__header">
                <h1>Modification de votre article.</h1>
            </header>
            <ArticleForm
                initialData={article} 
                onSubmit={handleUpdate} 
                isLoading={isLoading} 
                isEdit={true} 
            />
        </div>
    )
}

export default EditRecipe
