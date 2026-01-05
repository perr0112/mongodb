import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createArticle } from "../../services/articles.service";
import ArticleForm from "./Form";
import UserContext from "../../contexts/user/UserContext";

const CreateRecipe = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const { user } = useContext(UserContext)

    const handleCreate = async (formData) => {
        if (!user && !loading) {
            toast.error("Utilisateur non identifié.")
            return
        }

        const finalCategories = []
        if (formData.category) finalCategories.push(formData.category)
        if (formData.difficulty) finalCategories.push(formData.difficulty)

        const formDataWithAuthor = {
            ...formData,
            author: user._id,
            categories: finalCategories,
        }

        setIsLoading(true)

        try {
            const res = await createArticle(formDataWithAuthor)
            toast.success("Recette créée avec succès !")
            navigate("/recipes")
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la création de la recette."
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="create-recipe__layout">
            <header className="create-recipe__header">
                <div className="create-recipe__header-content">
                    <h1>Ajouter votre recette !</h1>
                    <p>Remplissez les informations ci-dessous pour publier votre création culinaire.</p>
                </div>
            </header>

            <ArticleForm
                onSubmit={handleCreate} 
                isLoading={isLoading} 
                isEdit={false}
            />
        </div>
    )
}

export default CreateRecipe
