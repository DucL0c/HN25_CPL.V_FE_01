import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="card">
      <h1>React Form Demo - Vite + TypeScript</h1>


      <ul className="nav-list">
        <li>
          <Link to="/usestate">1. useState Demo</Link>
        </li>
        <li>
          <Link to="/usereducer">2. useReducer Demo</Link>
        </li>
        <li>
          <Link to="/validation">3. Validation Demo</Link>
        </li>
        <li>
          <Link to="/complete">4. Demo All (Tất cả tính năng)</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
