import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

export default function CatAppContent() {
  const { id } = useParams();

  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${id}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Images</h2>
      <div className="imagesList">
        {images?.map((image) => (
          <Card key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
