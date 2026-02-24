// src/pages/Blog.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://landofpeace.wp.urdemo.website/wp-json/wp/v2/posts?_embed&per_page=8&page=${currentPage}`
        );

        setPosts(res.data);
        setTotalPages(parseInt(res.headers["x-wp-totalpages"]) || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages)
      setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h3>Loading posts...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px" }}>
      <h2 style={{ marginBottom: "30px" }}>All Blog Posts</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          );

          // ✅ Featured Image
          const featuredImage =
            post._embedded?.["wp:featuredmedia"]?.[0]
              ?.media_details?.sizes?.medium?.source_url ||
            post._embedded?.["wp:featuredmedia"]?.[0]
              ?.source_url;

          return (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08)",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ padding: "20px", flex: 1 }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#777",
                    marginBottom: "10px",
                  }}
                >
                  {formattedDate}
                </div>

                <h3 style={{ marginBottom: "15px" }}>
                  <Link
                    to={`/post/${post.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "#222",
                    }}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />
                  </Link>
                </h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "15px",
                  }}
                />

                <Link
                  to={`/post/${post.slug}`}
                  style={{
                    marginTop: "auto",
                    fontWeight: "bold",
                    color: "#0073aa",
                    textDecoration: "none",
                  }}
                >
                  Read More →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination (same as yours) */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={paginationButtonStyle(
            currentPage === 1
          )}
        >
          Prev
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={paginationButtonStyle(
            currentPage === totalPages
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const paginationButtonStyle = (disabled) => ({
  padding: "10px 20px",
  margin: "0 5px",
  backgroundColor: disabled ? "#ccc" : "#444",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: disabled ? "not-allowed" : "pointer",
});