const Tag = ({ text, type }) => {
    return (
        <div className={`tag tag-${type}`}>
            {text}
        </div>
    )
}

export default Tag
