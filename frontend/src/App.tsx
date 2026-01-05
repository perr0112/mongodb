import { Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Header from "./components/navbar/header/Header.jsx"

import Authentication from "./pages/authentication/Authentication"
import Home from "./pages/Home"
import Recipes from "./pages/recipes/Recipes.jsx"
import Details from "./pages/recipes/Details.jsx"
import CreateRecipe from "./pages/recipes/CreateRecipe.jsx"
import EditRecipe from "./pages/recipes/EditRecipe.jsx"
import Profile from "./pages/Profile/Profile.jsx"

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
        <Route path="/recipes/create" element={<CreateRecipe />} />
        <Route path="/recipes/:slug" element={<Details />} />
        <Route path="/recipes/edit/:slug" element={<EditRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </>
  )
}

export default App
