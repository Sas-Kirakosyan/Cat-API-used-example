import { Outlet } from "react-router-dom";
// import CatAppContent from "../components/CatAppContent";
import Navbar from "../components/Navbar";

export default function CatAppContainer() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
