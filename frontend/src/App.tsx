import { Route, Routes } from "react-router-dom"

// @ts-ignore
import Authentication from "./pages/authentication/Authentication"
// @ts-ignore
import { UserProvider } from "./contexts/user/Provider.jsx"

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </UserProvider>
  )
}

export default App
