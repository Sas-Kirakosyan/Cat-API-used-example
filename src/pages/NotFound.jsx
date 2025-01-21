import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      NotFound
      <Link to="/">go to Home Link</Link>
      <a href="/">go to home a</a>
    </div>
  );
}
