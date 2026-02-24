import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/button"
import LinkComponent from "../components/ui/Link"
import Tag from "../components/tag/Tag";
import Card from "../components/ui/Card";
import { FaceLogoWithBook, LoopIcon, WhipIcon } from "../components/icons";

import { CATEGORY_TYPES } from "../constants/categories.js";
import { FAKE_CARDS_DATA } from "../constants/cards.js";

import Recipes from "./recipes/Recipes.jsx";

import { $, getCoordinates } from "../utils/dom.js";
import { runPageTransition } from "../utils/transition.js";
import { initMomentumHoverEffect } from "../utils/momentumHoverEffect.js";

const Home = () => {
    const navigate = useNavigate()
    const svgToCopy = useRef(null)
    const svgCopied = useRef(null)
    const [stylesToApply, setStylesToApply] = useState({})

    const handleClickDiscover = () => {
        runPageTransition("/recipes", navigate);
    }

    useEffect(() => {
        initMomentumHoverEffect()
    })

    useEffect(() => {
        if (!svgToCopy.current) return;

        const update = () => {
            // const svgEl = svgToCopy.current.querySelector("svg");
            // const res = getCoordinates(svgEl);
            const res = getCoordinates(svgToCopy.current);

            const svgEl2 = svgCopied.current.querySelector("svg");
            const res2 = getCoordinates(svgEl2);

            setStylesToApply({
                position: "absolute",
                left: `${res.left}px`,
                top: `${res.top}px`,
                width: `${res.width}px`,
                height: `${res.height}px`,
            });
        };

        update();
    }, []);

    return (
        <>
            <div className="home__layout" data-momentum-hover-init>
                <div className="home__content">

                    <div className="home__content-intro">
                        <LoopIcon className="loop-icon" />

                        <div className="intro__text">
                            <div className="intro__titles">
                                <h1 className="main-title">Des recettes à aimer.</h1>
                                <h1 className="main-title">Des idées à partager.</h1>
                            </div>

                            <p className="intro__description">
                                Inspirez-vous, régalez-vous, <br />
                                partagez votre passion en recettes.
                            </p>

                            <div className="intro__actions">
                                <Button
                                    label="Découvrir nos recettes"
                                    type="button"
                                    variant="secondary"
                                    onClick={handleClickDiscover}
                                />
                            </div>
                        </div>

                        <WhipIcon className="whip-icon" />

                    </div>

                    <div className="home__content-images">
                        <div className="slider">
                            <div data-momentum-hover-element>
                                <img data-momentum-hover-target src="./assets/img/home/slider/1.png" alt="Slider 1" className="slider-image image-1" />
                            </div>

                            <div data-momentum-hover-element>
                                {/* <img data-momentum-hover-target src="./assets/img/home/slider/3.png" alt="Slider 3" className="slider-image image-3" /> */}
                                <div data-momentum-hover-target>
                                    <Card
                                        className={"card-recipe"}
                                        style={{ minWidth: "300px" }}
                                        isLink={false}
                                        title={FAKE_CARDS_DATA[0].title}
                                        author={FAKE_CARDS_DATA[0].author}
                                        categories={FAKE_CARDS_DATA[0].categories}
                                        views={FAKE_CARDS_DATA[0].views}
                                        coverImg={FAKE_CARDS_DATA[0].coverImg}
                                    />
                                </div>
                            </div>

                            <div data-momentum-hover-element>
                                <img data-momentum-hover-target src="./assets/img/home/slider/4.png" alt="Slider 4" className="slider-image image-4" />
                            </div>

                            <div data-momentum-hover-element>
                                <img data-momentum-hover-target src="./assets/img/home/slider/2.png" alt="Slider 2" className="slider-image image-2" />
                            </div>
                            
                            <div data-momentum-hover-element>
                                <img data-momentum-hover-target src="./assets/img/home/slider/3.png" alt="Slider 3" className="slider-image image-3" />
                            </div>
                        </div>
                    </div>

                    <div
                        ref={svgToCopy}
                        className="home__layout__copy-svg home__layout__copy-svg--primary"
                    >
                        <FaceLogoWithBook color="#F3EDE5" />
                    </div>

                </div>

                {/* <div className="home__layout-svg">
                    <FaceLogoWithBook />
                </div> */}
            </div>

            <Recipes />

            {/* <div ref={svgCopied} className="copy-svg">
                <FaceLogoWithBook color="#D53232" style={{...stylesToApply}} />
            </div> */}
            <div
                ref={svgCopied}
                className="copy-svg"
                style={stylesToApply}
            >
                <FaceLogoWithBook color="#D53232" />
            </div>
        </>
    )
}

export default Home
