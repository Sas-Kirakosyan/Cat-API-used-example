import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./App.css";
// import App from "./App.jsx";
import Todos from "./pages/Home";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Profiles from "./pages/Profiles";
import ProfilePage from "./pages/ProfilePage";
import CatAppContainer from "./pages/CatAppContainer";
import CatAppContent from "./components/CatAppContent";
import CatDetails from "./components/CatDetails";
import FishApp from "./pages/FishApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos />,
    errorElement: <NotFound />,
  },
  {
    path: "/fish-app",
    element: <FishApp />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "cats",
    element: <CatAppContainer />,
    children: [
      { path: ":categoryId", element: <CatAppContent /> },
      { path: ":categoryId/:id", element: <CatDetails /> },
    ],
  },
  {
    path: "/profiles",
    element: <Profiles />,
    children: [
      {
        path: ":id",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
