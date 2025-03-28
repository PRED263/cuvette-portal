const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-backend-url.onrender.com'  // Replace with your Render backend URL
  : 'http://localhost:8000';

export { apiUrl }; 