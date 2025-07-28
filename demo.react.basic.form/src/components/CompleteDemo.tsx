"use client"

import { useReducer, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router-dom"

interface FormState {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string

  // Address
  address: string
  city: string
  country: string
  zipCode: string

  // Preferences
  interests: string[]
  newsletter: boolean
  notifications: string

  // Files
  avatar: File | null
  resume: File | null

  // Additional
  bio: string
  experience: string
  skills: string[]

  // Form state
  isSubmitting: boolean
  submittedData: any
  errors: Record<string, string>
  touched: Record<string, boolean>
}

type FormAction =
  | { type: "SET_FIELD"; field: string; value: any }
  | { type: "SET_ERROR"; field: string; error: string }
  | { type: "CLEAR_ERROR"; field: string }
  | { type: "SET_TOUCHED"; field: string }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SUBMIT_SUCCESS"; data: any }
  | { type: "RESET_FORM" }

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  country: "",
  zipCode: "",
  interests: [],
  newsletter: false,
  notifications: "email",
  avatar: null,
  resume: null,
  bio: "",
  experience: "junior",
  skills: [],
  isSubmitting: false,
  submittedData: null,
  errors: {},
  touched: {},
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: "",
        },
      }
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      }
    case "CLEAR_ERROR":
      const newErrors = { ...state.errors }
      delete newErrors[action.field]
      return {
        ...state,
        errors: newErrors,
      }
    case "SET_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      }
    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      }
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        submittedData: action.data,
        isSubmitting: false,
      }
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

const CompleteDemo = () => {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return `${field === "firstName" ? "Tên" : "Họ"} không được để trống`
        if (value.length < 2) return `${field === "firstName" ? "Tên" : "Họ"} phải có ít nhất 2 ký tự`
        return ""

      case "email":
        if (!value.trim()) return "Email không được để trống"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Email không hợp lệ"
        return ""

      case "phone":
        if (!value.trim()) return "Số điện thoại không được để trống"
        const phoneRegex = /^(\+84|0)[0-9]{9,10}$/
        if (!phoneRegex.test(value.replace(/\s/g, ""))) return "Số điện thoại không hợp lệ"
        return ""

      case "dateOfBirth":
        if (!value) return "Ngày sinh không được để trống"
        const birthDate = new Date(value)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        if (age < 13) return "Bạn phải ít nhất 13 tuổi"
        if (age > 120) return "Ngày sinh không hợp lệ"
        return ""

      case "gender":
        if (!value) return "Vui lòng chọn giới tính"
        return ""

      case "address":
        if (!value.trim()) return "Địa chỉ không được để trống"
        return ""

      case "city":
        if (!value.trim()) return "Thành phố không được để trống"
        return ""

      case "country":
        if (!value) return "Vui lòng chọn quốc gia"
        return ""

      case "zipCode":
        if (!value.trim()) return "Mã bưu điện không được để trống"
        if (!/^\d{5,6}$/.test(value)) return "Mã bưu điện không hợp lệ"
        return ""

      case "bio":
        if (!value.trim()) return "Giới thiệu không được để trống"
        if (value.length < 50) return "Giới thiệu phải có ít nhất 50 ký tự"
        return ""

      default:
        return ""
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      if (name === "interests" || name === "skills") {
        const currentArray = state[name as keyof FormState] as string[]
        const newArray = currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value]
        dispatch({ type: "SET_FIELD", field: name, value: newArray })
      } else {
        dispatch({ type: "SET_FIELD", field: name, value: target.checked })
      }
    } else if (type === "file") {
      const target = e.target as HTMLInputElement
      dispatch({ type: "SET_FIELD", field: name, value: target.files?.[0] || null })
    } else {
      dispatch({ type: "SET_FIELD", field: name, value })
    }

    // Real-time validation for touched fields
    if (state.touched[name]) {
      const error = validateField(name, type === "checkbox" ? (e.target as HTMLInputElement).checked : value)
      if (error) {
        dispatch({ type: "SET_ERROR", field: name, error })
      } else {
        dispatch({ type: "CLEAR_ERROR", field: name })
      }
    }
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    dispatch({ type: "SET_TOUCHED", field: name })

    const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    const error = validateField(name, fieldValue)

    if (error) {
      dispatch({ type: "SET_ERROR", field: name, error })
    } else {
      dispatch({ type: "CLEAR_ERROR", field: name })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate all required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "address",
      "city",
      "country",
      "zipCode",
      "bio",
    ]
    let hasErrors = false

    requiredFields.forEach((field) => {
      dispatch({ type: "SET_TOUCHED", field })
      const error = validateField(field, state[field as keyof FormState])
      if (error) {
        dispatch({ type: "SET_ERROR", field, error })
        hasErrors = true
      }
    })

    if (hasErrors) return

    dispatch({ type: "SET_SUBMITTING", isSubmitting: true })

    // Simulate API call
    setTimeout(() => {
      const submissionData = {
        ...state,
        avatar: state.avatar?.name || null,
        resume: state.resume?.name || null,
        submittedAt: new Date().toISOString(),
      }

      dispatch({ type: "SUBMIT_SUCCESS", data: submissionData })
    }, 3000)
  }

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" })
  }

  const getFieldClass = (fieldName: string) => {
    if (!state.touched[fieldName]) return "form-group"
    return state.errors[fieldName] ? "form-group error" : "form-group"
  }

  return (
    <div>
      <Link to="/" className="back-link">
        ← Về trang chủ
      </Link>

      <div className="card">
        <h2>Complete Demo - Form hoàn chỉnh</h2>
        <p>Demo tổng hợp tất cả các tính năng: useState, useReducer, validation, các loại input khác nhau</p>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <h3>Thông tin cá nhân</h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className={getFieldClass("firstName")}>
              <label htmlFor="firstName">Tên:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={state.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Nhập tên"
              />
              {state.touched.firstName && state.errors.firstName && (
                <div className="error-message">{state.errors.firstName}</div>
              )}
            </div>

            <div className={getFieldClass("lastName")}>
              <label htmlFor="lastName">Họ:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={state.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Nhập họ"
              />
              {state.touched.lastName && state.errors.lastName && (
                <div className="error-message">{state.errors.lastName}</div>
              )}
            </div>
          </div>

          <div className={getFieldClass("email")}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Nhập email"
            />
            {state.touched.email && state.errors.email && <div className="error-message">{state.errors.email}</div>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className={getFieldClass("phone")}>
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={state.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="0123456789"
              />
              {state.touched.phone && state.errors.phone && <div className="error-message">{state.errors.phone}</div>}
            </div>

            <div className={getFieldClass("dateOfBirth")}>
              <label htmlFor="dateOfBirth">Ngày sinh:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={state.dateOfBirth}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {state.touched.dateOfBirth && state.errors.dateOfBirth && (
                <div className="error-message">{state.errors.dateOfBirth}</div>
              )}
            </div>
          </div>

          <div className={getFieldClass("gender")}>
            <label>Giới tính:</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={state.gender === "male"}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="male">Nam</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={state.gender === "female"}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="female">Nữ</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  checked={state.gender === "other"}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="other">Khác</label>
              </div>
            </div>
            {state.touched.gender && state.errors.gender && <div className="error-message">{state.errors.gender}</div>}
          </div>

          {/* Address Section */}
          <h3>Địa chỉ</h3>

          <div className={getFieldClass("address")}>
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={state.address}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Nhập địa chỉ"
            />
            {state.touched.address && state.errors.address && (
              <div className="error-message">{state.errors.address}</div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div className={getFieldClass("city")}>
              <label htmlFor="city">Thành phố:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={state.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Nhập thành phố"
              />
              {state.touched.city && state.errors.city && <div className="error-message">{state.errors.city}</div>}
            </div>

            <div className={getFieldClass("country")}>
              <label htmlFor="country">Quốc gia:</label>
              <select
                id="country"
                name="country"
                value={state.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
              >
                <option value="">Chọn quốc gia</option>
                <option value="vietnam">Việt Nam</option>
                <option value="usa">Hoa Kỳ</option>
                <option value="japan">Nhật Bản</option>
                <option value="korea">Hàn Quốc</option>
                <option value="singapore">Singapore</option>
              </select>
              {state.touched.country && state.errors.country && (
                <div className="error-message">{state.errors.country}</div>
              )}
            </div>

            <div className={getFieldClass("zipCode")}>
              <label htmlFor="zipCode">Mã bưu điện:</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={state.zipCode}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="70000"
              />
              {state.touched.zipCode && state.errors.zipCode && (
                <div className="error-message">{state.errors.zipCode}</div>
              )}
            </div>
          </div>

          {/* Preferences Section */}
          <h3>Sở thích & Cài đặt</h3>

          <div className="form-group">
            <label>Sở thích:</label>
            <div className="checkbox-group">
              {["technology", "sports", "music", "travel", "reading", "cooking"].map((interest) => (
                <div key={interest} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={interest}
                    name="interests"
                    value={interest}
                    checked={state.interests.includes(interest)}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={interest}>
                    {interest === "technology" && "Công nghệ"}
                    {interest === "sports" && "Thể thao"}
                    {interest === "music" && "Âm nhạc"}
                    {interest === "travel" && "Du lịch"}
                    {interest === "reading" && "Đọc sách"}
                    {interest === "cooking" && "Nấu ăn"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notifications">Thông báo:</label>
            <select id="notifications" name="notifications" value={state.notifications} onChange={handleInputChange}>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push notification</option>
              <option value="none">Không nhận thông báo</option>
            </select>
          </div>

          <div className="form-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={state.newsletter}
                onChange={handleInputChange}
              />
              <label htmlFor="newsletter">Đăng ký nhận newsletter</label>
            </div>
          </div>

          {/* Files Section */}
          <h3>Tệp đính kèm</h3>

          <div className="form-group">
            <label htmlFor="avatar">Ảnh đại diện:</label>
            <div className="file-input-wrapper">
              <input type="file" id="avatar" name="avatar" onChange={handleInputChange} accept="image/*" />
              <span className="file-input-display">{state.avatar ? state.avatar.name : "Chọn ảnh đại diện..."}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="resume">CV/Resume:</label>
            <div className="file-input-wrapper">
              <input type="file" id="resume" name="resume" onChange={handleInputChange} accept=".pdf,.doc,.docx" />
              <span className="file-input-display">{state.resume ? state.resume.name : "Chọn file CV..."}</span>
            </div>
          </div>

          {/* Professional Info Section */}
          <h3>Thông tin nghề nghiệp</h3>

          <div className="form-group">
            <label htmlFor="experience">Kinh nghiệm:</label>
            <select id="experience" name="experience" value={state.experience} onChange={handleInputChange}>
              <option value="intern">Thực tập sinh</option>
              <option value="junior">Junior (0-2 năm)</option>
              <option value="mid">Mid-level (2-5 năm)</option>
              <option value="senior">Senior (5+ năm)</option>
              <option value="lead">Team Lead</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div className="form-group">
            <label>Kỹ năng:</label>
            <div className="checkbox-group">
              {["javascript", "typescript", "react", "nodejs", "python", "java", "php", "css"].map((skill) => (
                <div key={skill} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={skill}
                    name="skills"
                    value={skill}
                    checked={state.skills.includes(skill)}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={skill}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={getFieldClass("bio")}>
            <label htmlFor="bio">Giới thiệu bản thân:</label>
            <textarea
              id="bio"
              name="bio"
              value={state.bio}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Viết ít nhất 50 ký tự về bản thân, kinh nghiệm và mục tiêu nghề nghiệp..."
              rows={6}
            />
            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              {state.bio.length}/50 ký tự tối thiểu
            </div>
            {state.touched.bio && state.errors.bio && <div className="error-message">{state.errors.bio}</div>}
          </div>

          <div style={{ marginTop: "24px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={state.isSubmitting || Object.keys(state.errors).some((key) => state.errors[key])}
            >
              {state.isSubmitting ? "Đang xử lý..." : "Gửi thông tin"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={state.isSubmitting}>
              Reset tất cả
            </button>
          </div>
        </form>

        {state.submittedData && (
          <div className="form-data">
            <h3>🎉 Thông tin đã được gửi thành công!</h3>
            <p>Cảm ơn bạn đã điền đầy đủ thông tin. Dưới đây là tóm tắt dữ liệu đã gửi:</p>
            <pre>{JSON.stringify(state.submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompleteDemo
