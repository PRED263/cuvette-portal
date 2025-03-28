# Cuvette Job Portal

A full-stack job portal application built with Node.js, Express, SQLite, and vanilla JavaScript.

## Features

- User Authentication (Sign up/Login)
- Employer Authentication (Sign up/Login)
- Job Posting
- Job Search and Filtering
- Job Applications
- Responsive UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
cuvette-v2/
├── src/                    # Frontend files
│   ├── index.html         # Landing page
│   ├── login.html         # User login
│   ├── signup.html        # User signup
│   ├── dashboard.html     # User dashboard
│   ├── job.html          # Job posting page
│   ├── post-job.html     # Job creation page
│   └── config.js         # API configuration
├── public/                # Static assets
│   └── img/              # Images
├── server/               # Backend files
│   ├── controller/       # Route controllers
│   ├── model/           # Database models
│   ├── routes/          # API routes
│   ├── db/              # Database configuration
│   ├── index.js         # Server entry point
│   └── package.json     # Backend dependencies
└── README.md            # This file
```

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/PRED263/cuvette-portal.git
   cd cuvette-portal
   ```

2. Install backend dependencies:

   ```bash
   cd server
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Test Accounts

### User Account

- Email: rahul.sharma@gmail.com
- Password: password123

### Employer Account

- Email: careers@infosys.com
- Password: password123

## API Endpoints

### Authentication

- POST `/api/signup` - User registration
- POST `/api/login` - User login
- POST `/api/employer/signup` - Employer registration
- POST `/api/employer/login` - Employer login

### Jobs

- GET `/jobs` - Get all jobs
- POST `/jobs/createjob` - Create a new job
- POST `/jobs/apply` - Apply for a job
- GET `/jobs/applied` - Get applied jobs
- GET `/jobs/employer/jobs` - Get employer's posted jobs

## Technologies Used

- Frontend:

  - HTML5
  - CSS3 (Tailwind CSS)
  - Vanilla JavaScript (ES6+)

- Backend:
  - Node.js
  - Express.js
  - SQLite (with Sequelize ORM)
  - JWT for authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
