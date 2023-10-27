import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import Cta from "./components/Cta"
import Footer from "./components/Footer"
import Features from "./components/Features"
import MyStories from "./components/MyStories"
import GenerateStory from "./components/GenerateStory"
import SingleBookView from "./components/SingleBookView"
import AdminDashboard from "./components/AdminDashboard"

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-stories" element={<MyStories />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/create" element={<GenerateStory />} />
          <Route path="/book/:index" element={<SingleBookView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

function NotFound() {
  return (
    <section className="flex justify-center font-bold text-accent">
      <h1>404 - Page Not Found</h1>
    </section>
  )
}

function Home() {
  return (
    <>
      <Hero></Hero>
      <Features></Features>
      <Cta></Cta>
      <Footer></Footer>
    </>
  )
}

export default App
