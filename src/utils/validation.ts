export const validatePasswords = (password: string, confirmPassword: string): string | null => {
  const passwordLengthRegex = /^.{8,}$/ // At least 8 characters
  const passwordFormatRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?`~;,'./\\[\]\\/])[\w!@#$%^&*()_+{}|:"<>?`~;,'./\\[\]\\/]+$/ // Uppercase, lowercase, number, and special character

  if (password !== confirmPassword) {
    return 'Passwords do not match'
  } else if (!passwordLengthRegex.test(password)) {
    return 'Password must be at least 8 characters'
  } else if (!passwordFormatRegex.test(password)) {
    return 'Password must include uppercase, lowercase, numbers, and at least one special character'
  }
  return null
}

export const validateEmail = (email: string): string | null => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // example@email.com
  if (!regex.test(email)) {
    return 'Please enter a valid email address.'
  }
  return null
}
