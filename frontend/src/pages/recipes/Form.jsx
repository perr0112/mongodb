import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

import Input from "../../components/form/Input";
import GroupRadio from "../../components/form/GroupRadio";

import UserContext from "../../contexts/user/UserContext";
import Button from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const ArticleForm = ({ initialData, onSubmit, isLoading, isEdit = false }) => {
    const [formData, setFormData] = useState({
        title: "Titre",
        content: "Contenu",
        duration: "10",
        coverImage: "",
        category: "entrees",
        difficulty: "facile",
        isPublished: true,
    })

    const { user, loading } = useContext(UserContext)
    const navigate = useNavigate()

    const categoriesOptions = [
        { label: "Entrées", value: "entrees" },
        { label: "Plats", value: "plats" },
        { label: "Desserts", value: "desserts" },
        { label: "Cocktails", value: "cocktails" },
    ]
    
    const difficultyOptions = [
        { label: "Facile", value: "facile" },
        { label: "Intermédiaire", value: "intermediaire" },
        { label: "Difficile", value: "difficile" },
    ]

    const publishOptions = [
        { label: "Publier maintenant", value: true },
        { label: "Garder en brouillon", value: false },
    ]

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                content: initialData.content || "",
                duration: initialData.duration || "",
                coverImage: initialData.coverImage || "",
                category: initialData.categories?.find(c => c.slug && categoriesOptions.some(opt => opt.value === c.slug))?.slug || null,
                difficulty: initialData.categories?.find(c => c.slug && difficultyOptions.some(opt => opt.value === c.slug))?.slug || null,
                author: initialData.author || {},
                isPublished: initialData.isPublished ?? true,
            })
        }
    }, [initialData])

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        console.log("inside handleformsubmit", formData)

        onSubmit(formData)
    }

    useEffect(() => {
        if (!user && !loading) {
            toast.error("Vous devez être connecté pour créer ou modifier une recette.")

            navigate("/auth")
        }
    }, [user, loading, navigate])

    return (
        <form onSubmit={handleFormSubmit} className="create-recipe__container">
            <div className="create-recipe__main">
                <section className="create-recipe__section">
                    <Input
                        label="Titre de la recette"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        required
                    />
                    <div className="create-recipe__textarea-group">
                        <label>Instructions & Ingrédients</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => handleChange("content", e.target.value)}
                            required
                        />
                    </div>
                    <Input
                        label="URL de l'image de couverture"
                        value={formData.coverImage}
                        onChange={(e) => handleChange("coverImage", e.target.value)}
                    />
                </section>
            </div>

            <aside className="create-recipe__sidebar">
                <div className="create-recipe__sidebar-box">
                    <GroupRadio
                        name="Statut de publication"
                        options={publishOptions}
                        selectedOption={formData.isPublished}
                        onChange={(val) => handleChange("isPublished", val)}
                    />

                    <Input
                        label="Durée (min)"
                        type="number"
                        value={formData.duration}
                        onChange={(e) => handleChange("duration", e.target.value)}
                        required
                    />
                    <GroupRadio
                        name="Catégorie"
                        options={[
                            { label: "Entrées", value: "entrees" },
                            { label: "Plats", value: "plats" },
                            { label: "Desserts", value: "desserts" },
                            { label: "Cocktails", value: "cocktails" },
                        ]}
                        selectedOption={formData.category}
                        onChange={(val) => handleChange("category", val)}
                    />
                    <GroupRadio
                        name="Difficulté"
                        options={[
                            { label: "Facile", value: "facile" },
                            { label: "Intermédiaire", value: "intermediaire" },
                            { label: "Difficile", value: "difficile" },
                        ]}
                        selectedOption={formData.difficulty}
                        onChange={(val) => handleChange("difficulty", val)}
                    />
                    <div className="create-recipe__actions">
                        <Button
                            label={isLoading ? "Envoi..." : (isEdit ? "Enregistrer les modifications" : "Publier la recette")}
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </aside>
        </form>
    );
};

export default ArticleForm
