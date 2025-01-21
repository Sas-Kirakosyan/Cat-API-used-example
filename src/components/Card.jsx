/* eslint-disable react/prop-types */

export default function Card({ image }) {
  const { url } = image;
  return <img src={url} width={"auto"} height="200px" />;
}
