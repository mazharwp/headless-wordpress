import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost/landofpeace/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then(res => {
        if (res.data.length > 0) {
          setPost(res.data[0]);
        }
      })
      .catch(err => console.error(err));
  }, [slug]);

  if (!post) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = post._embedded?.author?.[0]?.name;
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const tags = post._embedded?.['wp:term']?.[1] || [];
  const dateFormatted = new Date(post.date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      {/* Featured Image */}
      {featuredImage && (
        <img
          src={featuredImage}
          alt={post.title.rendered}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        />
      )}

      {/* Title */}
      <h1
        style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {/* Meta: Author, Date, Category */}
      <div style={{ fontSize: '14px', color: '#777', marginBottom: '20px' }}>
        By <strong>{author}</strong> on {dateFormatted}
        {categories.length > 0 && (
          <>
            {' · '}
            {categories.map(cat => (
              <span key={cat.id}>{cat.name} </span>
            ))}
          </>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          lineHeight: '1.7',
          color: '#333',
          fontSize: '16px',
          marginBottom: '30px',
        }}
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <strong>Tags: </strong>
          {tags.map(tag => (
            <span
              key={tag.id}
              style={{
                display: 'inline-block',
                backgroundColor: '#f1f1f1',
                padding: '5px 10px',
                borderRadius: '20px',
                marginRight: '8px',
                fontSize: '13px',
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
