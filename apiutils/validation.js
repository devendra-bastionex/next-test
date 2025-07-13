const validateUser = (userData) => {
  const { name, email, role, password } = userData;
  
  // Check required fields
  if (!name || !email || !password) {
    return { isValid: false, error: 'Name, email and password are required' };
  }
  
  // Validate password length
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters' };
  }
  
  // Validate email format
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please provide a valid email' };
  }
  
  // Validate role if provided
  if (role && !['user', 'admin', 'customer'].includes(role)) {
    return { isValid: false, error: 'Role must be user, admin or customer' };
  }
  
  return { isValid: true };
};

const validateLogin = (loginData) => {
  const { email, password } = loginData;
  
  // Check required fields
  if (!email || !password) {
    return { isValid: false, error: 'Email and password are required' };
  }
  
  // Validate email format
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please provide a valid email' };
  }
  
  return { isValid: true };
};

module.exports = { validateUser, validateLogin };