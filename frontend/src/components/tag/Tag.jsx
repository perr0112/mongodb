export const CATEGORY_TYPES = {
  entree: "blue",
  plat: "orange",
  dessert: "green",
  cocktail: "brown",
  facile: "green-light",
  intermediaire: "orange-light",
}

const Tag = ({ text, type, style, onClick }) => {
    return (
        <div
            className={`tag tag-${type}`}
            style={style}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

export default Tag
