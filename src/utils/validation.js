// validation.js
export const validatePasswords = (user) => {
    const passwordLengthRegex = /^.{8,}$/; // Check for at least 8 characters
    const passwordFormatRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/; // Check for uppercase, lowercase, and number
  
    if (user.password !== user.confirmPassword) {
      return 'Passwords do not match';
    } else if (!passwordLengthRegex.test(user.password)) {
      return 'Password must be at least 8 characters';
    } else if (!passwordFormatRegex.test(user.password)) {
      return 'Password must include uppercase, lowercase, and numbers';
    }
    return null;
  };
  
  export const validateEmail = (user) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // example@email.com
    if (!regex.test(user.email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };
  