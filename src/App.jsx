import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Package from "./pages/Package";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Chatwoot from "./components/Chatwoot";
import PantonePage from "./pages/PantonePage";
import PaymentPage from './pages/PaymentPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderFailurePage from './pages/OrderFailurePage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Chatwoot />
      <Header />
      <main className="min-h-screen px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/catalog/:categoryName" element={<Catalog />} />
          <Route path="/catalog/:categoryName/:subCategoryName" element={<Catalog />} />
          <Route path="/package/:category/:id" element={<Package />} />

          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/pantone" element={<PantonePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/order-failure" element={<OrderFailurePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={< NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
