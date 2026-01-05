const Tag = ({ text, style, onClick }) => {
  const getTagType = (label) => {
        if (!label) return "default"

        let type = label.toLowerCase()
        type = type.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        type = type.replace(/\s+/g, "-")

        return type || "default"
    }
    return (
        <div
            className={`tag tag-${getTagType(text)}`}
            style={style}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

export default Tag
