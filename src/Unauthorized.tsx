import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return <div> Unauthorized. Returning to Home page. </div>;
};

export { Unauthorized };
