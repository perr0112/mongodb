import { formatValue } from "../../utils/string"

const Tag = ({ text, style, onClick }) => {
  const getTagType = (label) => {
        if (!label) return "default"

        let type = label.toLowerCase()
        type = formatValue(type)
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
