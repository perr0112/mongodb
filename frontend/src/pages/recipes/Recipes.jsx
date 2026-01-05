import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { getArticles } from "../../services"

import Input from "../../components/form/Input"
import Tag from "../../components/tag/Tag"
import GroupRadio from "../../components/form/GroupRadio"
import Button from "../../components/ui/button"
import Card from "../../components/ui/Card"

import { FAKE_CARDS_DATA } from "../../constants/cards"
import Pagination from "../../components/ui/Pagination"

const Recipes = () => {
    const location = useLocation()

    const [filters, setFilters] = useState({
        search: "",
        category: null,
        popularity: null,
        difficulty: null,
        page: 1,
    })
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)
    const [data, setData] = useState({ articles: [], total: 0, page: 1, pages: 1 })
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        if (location.state?.filterBy) {
            setFilters((prev) => ({
                ...prev,
                ...location.state.filterBy,
            }))
        }
    }, [location.state])

    useEffect(() => {
        const fetchArticles = async () => {
            const cleanedFilters = Object.fromEntries(
                Object.entries(filters).filter(
                    ([, value]) => value !== null && value !== ""
                )
            )

            try {
                const response = await getArticles(cleanedFilters)
                setData(response.data || response) 
            } catch (error) {
                console.error("--- Erreur fetch:", error)
            }
        }

        fetchArticles()
    }, [filters])

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateFilter("search", searchInput)
        }, 400)
    }, [searchInput])


    const updateFilter = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1 // reinitialise la page à 1 à chaque changement de filtre
        }))
    }

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }))
    }

    const resetFilters = () => {
        setFilters({
            search: "",
            category: null,
            popularity: null,
            difficulty: null,
        })
    }

    return (
        <>
            <div className="recipes__layout">
                <div className="recipes__container">

                    {/* <Pagination
                        currentPage={data.page} 
                        totalPages={data.pages} 
                        onPageChange={handlePageChange} 
                    /> */}

                    <div
                        className={`recipes-filters-wrapper ${
                            isFiltersOpen ? "is-open" : ""
                        }`}
                    >
                        <div className="recipes-filters">

                            <div className="recipes-filters-mobile-header">
                                <p>Filtres</p>
                                <button onClick={() => setIsFiltersOpen(false)}>✕</button>
                            </div>

                            <div className="recipes-actions">
                                <Button
                                    label="Ajouter ma recette"
                                    type="button"
                                    variant="primary"
                                />

                                <Button
                                    label="Accéder à mes recettes"
                                    type="button"
                                    variant="secondary"
                                />
                            </div>

                            <div className="recipes-filters-header">
                                <p onClick={resetFilters}>Réinitialiser les filtres</p>
                                <Input
                                    placeholder={"Rechercher une recette..."}
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value)
                                        // updateFilter("search", e.target.value)
                                    }}
                                />
                            </div>

                            <GroupRadio
                                name="Catégories"
                                options={[
                                    { label: "Entrées", value: "entrees" },
                                    { label: "Plats", value: "plats" },
                                    { label: "Desserts", value: "desserts" },
                                    { label: "Cocktails", value: "cocktails" },
                                ]}
                                selectedOption={filters.category}
                                onChange={(value) => updateFilter("category", value)}
                            />

                            <GroupRadio
                                name="Difficulté"
                                options={[
                                    { label: "Facile", value: "facile" },
                                    { label: "Intermédiaire", value: "intermediaire" },
                                    { label: "Difficile", value: "difficile" },
                                ]}
                                selectedOption={filters.difficulty}
                                onChange={(value) => updateFilter("difficulty", value)}
                            />

                            <GroupRadio
                                name="Popularité"
                                options={[
                                    { label: "Les plus vues", value: "plus_vues" },
                                    { label: "Les plus commentées", value: "plus_commentees" },
                                    { label: "Les plus récentes", value: "plus_recentes" },
                                    { label: "Les plus appréciées", value: "plus_appreciees" },
                                ]}
                                selectedOption={filters.popularity}
                                onChange={(value) => updateFilter("popularity", value)}
                            />

                            
                        </div>
                    </div>

                    <div className="recipes-list">

                        <div className="recipes-list__container">
                            <div className="recipes-list__header">
                                <div>
                                <p>Nos recettes gourmandes</p>
                                    <span>
                                        {data.total > 0 && (
                                            <>
                                                {data.total}
                                                {" "}
                                                {data.total <= 1 ? "recette trouvée" : "recettes trouvées"}
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="recipes-list__cards">
                                {
                                    data.total === 0 && (
                                        <p className="recipes-list__no-results">
                                            Aucune recette trouvée
                                            <span>Veuillez ajuster vos critères de recherche.</span>
                                        </p>
                                    )
                                }

                                {data.articles.map((item) => (
                                    <Card
                                        key={item._id}
                                        isLink={true}
                                        title={item.title}
                                        slug={item.slug}
                                        categories={item.categories ?? []}
                                        views={item.views}
                                        coverImg={item.coverImage}
                                        rating={item.rating.average}
                                        countRatings={item.rating.count}
                                        style={{ flex: "1 1 calc(33.333% - 1.33rem)" }}
                                    />
                                ))}
                            </div>

                            <Pagination
                                currentPage={data.page}
                                totalPages={data.pages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Button
                className="mobile-filters-button"
                onClick={() => setIsFiltersOpen(true)}
                label="Filtres"
                type="button"
                variant="primary"
            />
        </>
    )
}

export default Recipes
