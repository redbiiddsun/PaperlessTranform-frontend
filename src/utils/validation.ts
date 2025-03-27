export interface User {
  email: string
  password: string
  confirmPassword: string
}

export const validatePasswords = (user: User): string | null => {
  const passwordLengthRegex = /^.{8,}$/ // At least 8 characters
  const passwordFormatRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/ // Uppercase, lowercase, and number

  if (user.password !== user.confirmPassword) {
    return 'Passwords do not match'
  } else if (!passwordLengthRegex.test(user.password)) {
    return 'Password must be at least 8 characters'
  } else if (!passwordFormatRegex.test(user.password)) {
    return 'Password must include uppercase, lowercase, and numbers'
  }
  return null
}

export const validateEmail = (user: User): string | null => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // example@email.com
  if (!regex.test(user.email)) {
    return 'Please enter a valid email address.'
  }
  return null
}
