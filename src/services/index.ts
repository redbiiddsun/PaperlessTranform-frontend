import authController from './authentication'
import formController from './form'
import userController from './user'

export const API = {
  auth: authController,
  user: userController,
  form: formController
}
