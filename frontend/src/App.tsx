import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ReactLenis, { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

import Header from "./components/navbar/header/Header.jsx";

import Authentication from "./pages/authentication/Authentication";
import Home from "./pages/Home";
import Recipes from "./pages/recipes/Recipes.jsx";
import Details from "./pages/recipes/Details.jsx";
import CreateRecipe from "./pages/recipes/CreateRecipe.jsx";
import EditRecipe from "./pages/recipes/EditRecipe.jsx";
import Profile from "./pages/Profile/Profile.jsx";

import Loader from "./components/loader/Loader.jsx";

function App() {
  // const location = useLocation();
  // const [isLoading, setIsLoading] = useState(true);

  // const lenis = useLenis((lenis) => {
  //   // console.log(lenis)
  // });

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      lenis?.start();
    }

  }, [isLoading, lenis]);

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    <>
      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}

      {/* Related to transitions between page */}
      <div data-transition-wrap className="transition">
        <div className="transition__shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 1000 1000"
            fill="none"
            preserveAspectRatio="none"
            className="transition__svg"
          >
            <path
              d="M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001"
              stroke="currentColor"
              strokeWidth="0"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>

      {/* {!isLoading && ( */}
        <div className="app-content" style={{ opacity: 0, visibility: "hidden" }}>
          <ReactLenis root />
          <Toaster />
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
        </div>
      {/* )} */}
    </>
  );
}

export default App;
