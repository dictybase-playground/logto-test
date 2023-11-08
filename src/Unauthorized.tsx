import { useNavigate } from 'react-router-dom';
import { useEffect } from "react"

const Unauthorized = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    setTimeout(() => navigate("/"), 2000)
  })

  return <div> Unauthorized. </div>
  
}

export { Unauthorized }