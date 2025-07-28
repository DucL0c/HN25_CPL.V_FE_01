"use client"

import type React from "react"
import { useState } from "react"

interface FormErrors {
  name?: string
  email?: string
}

function MyValidateForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!name.trim()) {
      newErrors.name = "Name is required."
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters."
    }

    if (!email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Invalid email format."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validate()) {
      console.log("Name:", name, "Email:", email)
      setSubmitted(true)

      setTimeout(() => {
        setName("")
        setEmail("")
        setErrors({})
        setSubmitted(false)
      }, 3000)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }))
    }
  }

  return (
    <div>
      <h2 className="form-title">Validation Form</h2>
      <p className="form-description">Form with real-time validation and error handling</p>

      <form onSubmit={handleSubmit} noValidate className="form">
        <div className={`form-group ${errors.name ? "error" : ""}`}>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="form-input"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className={`form-group ${errors.email ? "error" : ""}`}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="form-input"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
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

export default MyValidateForm
