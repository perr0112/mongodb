import Button from "./button"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="pagination">
            <button
                style={{
                    textDecoration: 'underline',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.2 : 1,
                }}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Précédent
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    style={{
                        fontWeight: currentPage === p ? 'bold' : 'normal',
                        fontSize: '1rem',
                    }}
                    type="button"
                    className={`pagination__page-button ${currentPage === p ? 'pagination__page-button--active' : ''}`}
                >
                    {p}
                </button>
            ))}

            <button
                style={{
                    textDecoration: 'underline',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.2 : 1,
                }}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Suivant
            </button>
        </div>
    )
}

export default Pagination
