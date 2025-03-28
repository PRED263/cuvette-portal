const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8000'  // Development URL
  : 'https://cuvette-portal.onrender.com';  // Production URL

export { apiUrl }; 