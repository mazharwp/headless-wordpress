// App.js
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
//import Menu from './components/Menu';
import Blog from './pages/Blog';
import PageSingle from './pages/PageSingle';
import PostSingle from './pages/PostSingle';

function App() {
  return (
    <Router>
      <Header />
      
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<PageSingle slug="home" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<PageSingle slug="about" />} />
          <Route path="/contact" element={<PageSingle slug="contact" />} />

          <Route path="/page/:slug" element={<PageSingle />} />
          <Route path="/post/:slug" element={<PostSingle />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
