import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PageSingle({ slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params.slug;

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost/landofpeace/wp-json/wp/v2/pages?slug=${slug}`)
      .then((res) => {
        if (res.data.length > 0) {
          setPage(res.data[0]);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div style={{ padding: 40 }}>Loading page...</div>;
  if (error || !page) return <div style={{ padding: 40 }}>Page not found</div>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
