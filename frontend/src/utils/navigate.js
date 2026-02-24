import { runPageTransition } from "./transition"

const handleNavigate = (href, navigate, data) => {
    runPageTransition(href, navigate, data);
}

export {
    handleNavigate,
}
