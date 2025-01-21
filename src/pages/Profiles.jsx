import { NavLink, Outlet } from "react-router-dom";

export default function Profiles() {
  const profileData = [1, 2, 3, 4];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>profiles</h1>
      {profileData.map((elem) => (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          key={elem}
          to={`/profiles/${elem}`}
        >
          Profile {elem}
        </NavLink>
      ))}
      <Outlet />
    </div>
  );
}
