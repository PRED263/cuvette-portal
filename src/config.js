const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://cuvette-portal.onrender.com'  // Production URL
  : 'http://localhost:8000';  // Development URL

export { apiUrl }; 