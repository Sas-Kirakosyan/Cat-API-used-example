import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      const fetchResult = await fetch(
        `https://api.thecatapi.com/v1/categories`
      );
      const res = await fetchResult.json();
      setCategories(res);
      setLoading(false);
    }
    getCategories();
  }, []);

  return (
    <div className="navbar">
      <h3>Categories</h3>
      <div className="categoriesList">
        {loading ? (
          <div>Loading...</div>
        ) : (
          categories?.map((cat, i) => (
            <NavLink
              activeClassName="active-link"
              className="navlink"
              key={cat.id + i}
              to={`/cats/${cat.id}`}
            >
              {cat.name.toUpperCase()}
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
}
