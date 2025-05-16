import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Navbar from './pages/Navbar'
import Products from './pages/Products'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
         <ToastContainer />
      </div>
    </Router>
  )
}

export default App