import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Package from "./pages/Package";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Chatwoot from "./components/Chatwoot";
import PantonePage from "./pages/PantonePage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Chatwoot />
      <Header />
      <main className="min-h-screen px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:categoryName" element={<Catalog />} />
          <Route path="/package/:category/:id" element={<Package />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/pantone" element={<PantonePage />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={< NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
