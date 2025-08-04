import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Package from "./pages/Package"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ContactUs from "./pages/ContactUs"

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/package/:id" element={<Package />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
