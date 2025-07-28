"use client"

import type React from "react"
import { useReducer, useState } from "react"

interface FormState {
  name: string
  email: string
}

interface FormAction {
  type: "UPDATE_FIELD" | "RESET_FORM"
  field?: string
  value?: string
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field!]: action.value }
    case "RESET_FORM":
      return { name: "", email: "" }
    default:
      return state
  }
}

function MyComplexForm() {
  const [formState, dispatch] = useReducer(formReducer, { name: "", email: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form State:", formState)
    setSubmitted(true)

    setTimeout(() => {
      dispatch({ type: "RESET_FORM" })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div>
      <h2 className="form-title">useReducer Form</h2>
      <p className="form-description">Complex form using useReducer hook for advanced state management</p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Form
        </button>

        {submitted && (
          <div className="success-message">
            Form submitted successfully! Name: {formState.name}, Email: {formState.email}
          </div>
        )}
      </form>
    </div>
  )
}

export default MyComplexForm
