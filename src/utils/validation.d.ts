interface User {
    fname: string;
    lname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  declare module '@/utils/validation.js' {
    export const validatePasswords: (user: User) => string | null;
    export const validateEmail: (user: User) => string | null;
  }