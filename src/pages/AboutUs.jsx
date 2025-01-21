import { createPortal } from "react-dom";
import Todos from "./Home";

export default function AboutUs() {
  createPortal(Todos, document.body);
  return (
    <div>
      <AboutUs />
      <div> {createPortal(Todos, document.body)}</div>
    </div>
  );
}
