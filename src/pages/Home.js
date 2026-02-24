// src/pages/Home.js

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await axios.get(
          "https://landofpeace.wp.urdemo.website/wp-json/wp/v2/pages?slug=home&_embed"
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

    fetchHomePage();
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