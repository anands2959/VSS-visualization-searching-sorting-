import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/pages/LandingPage'
import SearchingPage from './components/pages/SearchingPage'
import SortingPage from './components/pages/SortingPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/searching" element={<SearchingPage />} />
        <Route path="/sorting" element={<SortingPage />} />
      </Routes>
    </Router>
  )
}

export default App
