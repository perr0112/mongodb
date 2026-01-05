import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/button"
import LinkComponent from "../components/ui/Link"
import Tag from "../components/tag/Tag";
import Card from "../components/ui/Card";

import { CATEGORY_TYPES } from "../constants/categories.js";
import { FAKE_CARDS_DATA } from "../constants/cards.js";
import MainLogo from "../components/icons/main-logo.jsx";

const Home = () => {
    const navigate = useNavigate()

    const [floatingBarOpen, setFloatingBarOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const toggleFloatingBar = () => {
        setLoading(true)
        setFloatingBarOpen(!floatingBarOpen)

        setTimeout(() => {
            setLoading(false)
        }, 400)
    }

    return (
        <div className="home__layout">

            <div
                className="floating__content"
                style={{
                    pointerEvents: floatingBarOpen ? "auto" : "none",
                }}
            >

                {floatingBarOpen && (
                    <div
                        className="floating__background-overlay"
                        style={{
                            backgroundColor: "rgba(0,0,0,0.25)",
                        }}
                    />
                )}

                <div className="fake__cards">
                    {
                        FAKE_CARDS_DATA.map((card, index) => (
                            <Card
                                key={index}
                                isLink={true}
                                author={card.author}
                                title={card.title}
                                slug={card.slug}
                                categories={card.categories}
                                views={card.views}
                                coverImg={card.coverImg}
                            />
                        ))
                    }
                </div>

                <div className="home__svg">
                    <svg width="1085" height="100%" viewBox="0 0 1085 1117" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.49463 1117C15.1044 925.4 326.54 729.787 793.693 729.787C1260.85 729.787 1040.79 180.733 957.084 0" stroke="#D53232" strokeWidth="5"/>
                    </svg>
                </div>

                <div className="floating__bar">
                    <div
                        className={`floating__bar-trigger ${floatingBarOpen ? 'open' : ''}`}
                        onClick={toggleFloatingBar}
                        style={{
                            pointerEvents: loading ? "none" : "auto",
                            borderTopLeftRadius: floatingBarOpen ? '0px' : '40px',
                            borderTopRightRadius: floatingBarOpen ? '0px' : '40px',
                            borderBottomLeftRadius: '40px',
                            borderBottomRightRadius: '40px',
                        }}
                    >
                        <p>De quoi avez vous-envie ?</p>

                        <div className="floating__bar-icon">
                            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </div>
                    </div>

                    <div className={`floating__bar-content ${floatingBarOpen ? 'open' : ''}`} style={{
                        height: floatingBarOpen ? '300px' : '0px',
                        padding: floatingBarOpen ? '2rem' : '0',
                    }}>
                        <div
                            className="floating__bar-content-inner"
                            style={{
                                opacity: floatingBarOpen ? 1 : 0,
                                pointerEvents: floatingBarOpen ? 'auto' : 'none',
                            }}
                        >
                            <p>Catégories disponibles</p>

                            <div className="tags__group">
                                {CATEGORY_TYPES.map((category) => (
                                    <Tag
                                        key={category}
                                        text={category}
                                        style={{ fontSize: ".75rem", cursor: "pointer" }}
                                        onClick={() => {
                                            navigate('/recipes', { state: { filterBy: category } })
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home__container">

                <div className="home__text">

                    <p className="home__text--highlight">Trouvez votre prochaine recette <span className="keyword">coup de cœur</span>... ou partagez la <span className="keyword">votre</span>.</p>

                    <p className="home__text--description">Une cuisine gourmande, faite par et pour <br />les <span className="keyword">passionnés</span>.</p>

                    <LinkComponent
                        type="link"
                        href="/recipes"
                        label="Voir les recettes disponibles"
                        variant="primary"
                        active
                        style={{ 
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                        }}
                    />
                </div>

            </div>

            <div className="floating-logo">
                <MainLogo />
            </div>
        </div>
    )
}

export default Home
