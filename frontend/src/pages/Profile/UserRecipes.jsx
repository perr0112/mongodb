import { useEffect, useState } from "react";
import { getArticlesFromUser } from "../../services/articles.service";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import LinkComponent from "../../components/ui/Link";

const UserRecipes = ({ userId }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            getArticlesFromUser(userId)
                .then(res => {
                    setRecipes(res.data.articles || res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [userId]);

    if (loading) return <p>Chargement de vos délices...</p>;

    return (
        <div className="user-recipes-layout">
            <h3>Vos recettes culinaires ({recipes.length})</h3>

            {recipes.length === 0 ? (
                <div className="user-recipes__no-results">
                    <p>Vous n'avez pas encore publié de recettes.</p>
                    <LinkComponent
                        type="text"
                        href="/recipes/create"
                        variant="primary"
                        label="Ajouter une nouvelle recette !"
                    />
                </div>
            ) : (
                <div className="user-recipes__grid">
                    {recipes.map(item => (
                        <Card
                            key={item._id}
                            className={"card-recipe"}
                            isLink={true}
                            author={item.author}
                            title={item.title}
                            slug={item.slug}
                            categories={item.categories ?? []}
                            views={item.views}
                            coverImg={item.coverImage}
                            rating={item.rating.average}
                            countRatings={item.rating.count}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserRecipes;