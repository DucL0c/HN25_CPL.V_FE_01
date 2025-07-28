"use client"

import type React from "react"
import { useState } from "react"

function MyForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Name:", name, "Email:", email)
    setSubmitted(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setName("")
      setEmail("")
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div>
      <h2 className="form-title">useState Form</h2>
      <p className="form-description">Simple form using useState hook for state management</p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Form submitted successfully! Name: {name}, Email: {email}
          </div>
        )}
      </form>
    </div>
  )
}

export default MyForm
