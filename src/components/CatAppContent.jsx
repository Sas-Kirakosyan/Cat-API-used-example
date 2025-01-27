import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
const API_KEY =
  "live_xSJse1L779LQBlpNBwKyUwjWzp7DZSVt9HrTT4wb7GcYsO9ieOFB72mmwo1qUWJP";
// const page = 1;
// const limit = 5;
export default function CatAppContent() {
  const { categoryId } = useParams();

  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      });

      var requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };
      setLoading(true);
      try {
        setLoading(true);
        const response = await fetch(
          // `https://api.thecatapi.com/v1/images/search?limit=5&order=ASC&page=1&category_ids=${categoryId}`,
          `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&has_breeds=true&order=ASC&page=${categoryId}&limit=${5}`,
          requestOptions
        );

        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  //   fetch(`https://api.thecatapi.com/v1/images/${id}`)
  return (
    <div>
      <h2>Images</h2>
      <div className="imagesList">
        {images?.map((image) => (
          <Card key={image.id} image={image} categoryId={categoryId} />
        ))}
      </div>
    </div>
  );
}
