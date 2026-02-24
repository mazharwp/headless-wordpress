import axios from "axios";
import { useEffect, useState } from "react";

function About() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const res = await axios.get(
          "https://landofpeace.wp.urdemo.website/wp-json/wp/v2/pages?slug=about-us&_embed"
        );

        if (res.data.length > 0) {
          setPage(res.data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  if (loading) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  if (!page) return <h2 style={{ padding: "40px" }}>Page Not Found</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1
        dangerouslySetInnerHTML={{
          __html: page.title.rendered,
        }}
      />

      <div
        dangerouslySetInnerHTML={{
          __html: page.content.rendered,
        }}
      />
    </div>
  );
}

export default  About ;