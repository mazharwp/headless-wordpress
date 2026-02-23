import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost/landofpeace/wp-json/wp/v2/posts?_embed&per_page=6&page=${currentPage}`)
      .then(res => {
        setPosts(res.data);
        const total = parseInt(res.headers['x-wp-totalpages']);
        setTotalPages(total);
      })
      .catch(err => {
        if (err.response?.status === 400) {
          setPosts([]);
        } else {
          console.error(err);
        }
      });
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Latest Posts</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // fixed 3-column layout
          gap: '20px',
        }}
      >
        {posts.map(post => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          const author = post._embedded?.author?.[0]?.name;
          const categories = post._embedded?.['wp:term']?.[0] || [];

          return (
            <div
              key={post.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Image */}
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={post.title.rendered}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
              )}

              {/* Content */}
              <div style={{ padding: '15px', flex: '1' }}>
                {/* Author and Categories */}
                <div style={{ fontSize: '12px', color: '#777', marginBottom: '5px' }}>
                    By <strong>{author}</strong>
                    {categories.length > 0 && (
                      <>
                        {' '}in{' '}
                        {categories.map(cat => (
                          <span key={cat.id} style={{ marginRight: '6px' }}>
                            {cat.name}
                          </span>
                        ))}
                      </>
                    )}
                    {' · '}
                    {new Date(post.date).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>


                {/* Title */}
                <h3 style={{ fontSize: '18px', margin: '10px 0' }}>
                  <Link
                    to={`/post/${post.slug}`}
                    style={{ textDecoration: 'none', color: '#333' }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </Link>
                </h3>

                {/* Excerpt */}
                <div
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}
                />

                {/* Read More */}
                <Link
                  to={`/post/${post.slug}`}
                  style={{
                    display: 'inline-block',
                    marginTop: 'auto',
                    color: '#0073aa',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                  }}
                >
                  Read More →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Prev
        </button>

        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            backgroundColor: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
