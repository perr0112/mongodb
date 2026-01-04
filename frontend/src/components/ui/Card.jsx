import Tag from "../tag/Tag"

const Card = ({ isLink, title, slug, categories, views, coverImg }) => {
    return (
        <div className="card__container">

            <div className="card__image">
                <img src={coverImg} alt={title} />

                { isLink && (
                    <a href={`/articles/${slug}`} className="card__overlay-link"></a>
                )}
            </div>

            <div className="card__info">
                <p className="card__title">{title}</p>
                <div className="card__categories">
                    {categories.map(({ label, type }, index) => (
                        <Tag
                            key={index}
                            text={label}
                            type={type}
                            style={{
                                fontSize: "0.75rem",
                                padding: ".25rem .5rem",
                                fontWeight: "500",
                            }}
                        />
                    ))}
                </div>
                <div className="card__views">
                    <p>{views} vues</p>
                </div>
            </div>
        </div>
    )
}

export default Card
