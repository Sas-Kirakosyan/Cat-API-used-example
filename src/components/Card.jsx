/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Card({ image, categoryId }) {
  const { url, id } = image;
  console.log({ image, id });
  return (
    <Link to={`/cats/${categoryId}/${id}`}>
      <img src={url} width={"auto"} height="200px" />;
    </Link>
  );
}
