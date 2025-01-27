import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY =
  "live_xSJse1L779LQBlpNBwKyUwjWzp7DZSVt9HrTT4wb7GcYsO9ieOFB72mmwo1qUWJP";

// eslint-disable-next-line react/prop-types
const CatDetails = ({ categoryId }) => {
  const { id } = useParams(); // Access both categoryId and id
  const [catDetails, setCatDetails] = useState(null);

  useEffect(() => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    });

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    // Fetch details using the id
    // fetch(`https://api.thecatapi.com/v1/images/${id}`)
    fetch(`https://api.thecatapi.com/v1/images/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => setCatDetails(data))
      .catch((error) => console.error("Error fetching cat details:", error));
  }, [id]);

  if (!catDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{catDetails.breeds[0]?.name || "Unknown Breed"}</h1>
      <p>Category: {categoryId}</p>
      <img src={catDetails.url} alt={catDetails.breeds[0]?.name || "Cat"} />
      <p>{catDetails.breeds[0]?.description}</p>
      <p>Origin: {catDetails.breeds[0]?.origin}</p>
      <p>Life Span: {catDetails.breeds[0]?.life_span} years</p>
    </div>
  );
};

export default CatDetails;
