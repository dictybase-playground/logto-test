import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>User is unauthorized.</p>
      <button onClick={() => navigate("/")}> Return to home </button>
    </div>
  );
};

export default Forbidden;
