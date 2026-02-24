// App.js
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import PageSingle from './pages/PageSingle';
import PostSingle from './pages/PostSingle';


function App() {
  return (
    <Router>
      <Header />
      
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/page/:slug" element={<PageSingle />} />
          <Route path="/post/:slug" element={<PostSingle />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
