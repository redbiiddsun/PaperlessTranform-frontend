export const authErrorMessages: Record<number, string> = {
  422: 'Invalid email format',
  409: 'Invalid email or password',
}

export const getAuthErrorMessage = (status: number): string => {
  return authErrorMessages[status] || 'An unknown error occurred'
}


export const builderErrorMessages: Record<number, string> = {
  422: 'Validation Error',
}

export const getBuilderErrorMessage = (status: number): string => {
  return builderErrorMessages[status] || 'An unknown error occurred'
}