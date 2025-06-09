import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>Go back to <Link to="/">home</Link> </p>
    </div>
    
  )
}

export default NotFound