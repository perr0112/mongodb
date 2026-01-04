import { Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Authentication from "./pages/authentication/Authentication"
import Home from "./pages/Home"

import Header from "./components/navbar/header/Header.jsx"
import Recipes from "./pages/recipes/Recipes.jsx"

function App() {
  const location = useLocation()

  return (
    <>
      <Toaster />

      {/* According to the design, the header has to be hidden on the authentication page */}
      {location.pathname !== "/auth" && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </>
  )
}

export default App
