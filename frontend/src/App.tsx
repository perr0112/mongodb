import { Route, Routes } from "react-router-dom"

import Authentication from "./pages/authentication/Authentication"

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  )
}

export default App
