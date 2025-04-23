export const authErrorMessages: Record<number, string> = {
  422: 'Invalid email format',
  409: 'Invalid email or password',
}

export const getAuthErrorMessage = (status: number): string => {
  return authErrorMessages[status] || 'An unknown error occurred'
}
