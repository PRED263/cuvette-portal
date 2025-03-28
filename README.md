# Cuvette Job Portal

A job portal application where employers can post jobs and students can apply for them.

## Deployment Instructions

### Frontend Deployment (Netlify)

1. Create a new repository on GitHub and push your code
2. Go to [Netlify](https://www.netlify.com/) and sign up/login
3. Click "New site from Git"
4. Choose GitHub and select your repository
5. Configure the build settings:
   - Build command: (leave empty)
   - Publish directory: `src`
6. Click "Deploy site"

### Backend Deployment (Render)

1. Create a new repository on GitHub and push your code
2. Go to [Render](https://render.com/) and sign up/login
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - Name: cuvette-backend
   - Environment: Node
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
6. Click "Create Web Service"

### Environment Variables

Make sure to set these environment variables in your Render dashboard:

- `NODE_ENV`: production
- `PORT`: 8000

### Post-Deployment Steps

1. After deploying the backend, get your Render URL
2. Update the `apiUrl` in `src/config.js` with your Render URL
3. Redeploy the frontend on Netlify

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. Open `src/index.html` in your browser

## Features

- User authentication (Student/Employer)
- Job posting and management
- Job application system
- Job filtering and search
- Application tracking
