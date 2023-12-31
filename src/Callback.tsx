import { useHandleSignInCallback } from "@logto/react"
import { useNavigate } from "react-router-dom"

const Callback = () => {
  const navigate = useNavigate()
  const { isLoading } = useHandleSignInCallback(() => {
    // Navigate to root path when finished
    console.log("navigating to home")
    navigate("/")
  })
  console.log("callback")
  // When it's working in progress
  if (isLoading) {
    return <div>Redirecting...</div>
  }
}

export { Callback }
