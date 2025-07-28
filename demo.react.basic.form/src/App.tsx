import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import CompleteDemo from "./components/CompleteDemo"
import MyComplexForm from "./components/useReducerForm"
import MyValidateForm from "./components/validateForm"
import MyForm from "./components/useStateForm"

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usestate" element={<MyForm />} />
        <Route path="/usereducer" element={<MyComplexForm />} />
        <Route path="/validation" element={<MyValidateForm />} />
        <Route path="/complete" element={<CompleteDemo />} />
      </Routes>
    </div>
  )
}

export default App