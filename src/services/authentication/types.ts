export type authMessage = {
  status: string
  message: string
}

export type InputSignUp = {
  firstname: string
  lastname: string
  email: string
  password: string
}

export type InputSignIn = {
  email: string
  password: string
}

export type forgotMessage = {
  status: string
  message: string
  refCode: string
  token: string
}

export type InputRequestForgot = {
  email: string
}

export type InputOTP = {
  token: string
  otp: string
}

export type InputResetPassword = {
  token: string
  password: string
}
