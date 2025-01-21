import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      singe profile {id}
    </div>
  );
}
