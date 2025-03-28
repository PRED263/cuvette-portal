# Job Search Website (Inspired by Cuvette)

## 📌 Project Overview

This is a job-searching platform similar to **Cuvette**, designed as part of the **Liftoff Club** project. The platform connects job seekers with employers, offering a seamless experience to apply for jobs and internships. It features advanced job filtering and sorting mechanisms to help users find the best opportunities.

## 🌟 Features

### For Job Seekers

- **User Authentication**: Secure sign-up and login system (Email/Password & OAuth).
- **Profile Management**: Create and manage professional profiles with skills, experience, and resume upload.
- **Job Search & Filters**:
  - Search by title, company, or keywords
  - Filter by location (remote/on-site/hybrid)
  - Sort by salary range, job type (internship/full-time), and application deadline
  - Skill-based job recommendations
- **Application Tracking**: View applied jobs, track status (applied, shortlisted, rejected).
- **Notifications**: Real-time job alerts and application status updates.

### For Employers

- **Company Dashboard**: Manage job postings and view candidate applications.
- **Job Posting**: Create job listings with custom requirements.
- **Candidate Management**: Filter, shortlist, and contact applicants.

### Admin Panel

- Manage users, job listings, and site analytics.

## 📊 Sorting & Filtering System

1. **Sort By:**
   - Relevance (Based on skills and job description match)
   - Date (Newest listings first)
   - Salary (Highest to lowest)
   - Application Deadline (Closest first)
2. **Filters:**
   - Job Type (Full-time, Internship, Contract)
   - Location (Remote, On-site, Hybrid)
   - Experience Level (Fresher, Mid-level, Senior)
   - Salary Range

## 🛠️ Tech Stack

- **Frontend:** React.js (with Tailwind CSS for styling)
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB (or PostgreSQL)
- **Authentication:** JWT (JSON Web Tokens) & OAuth (Google Sign-In)
- **Deployment:** Vercel (Frontend) & Render (Backend)

## 🚀 Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/job-search-platform.git
   cd job-search-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (e.g., `.env` file):

   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## 📄 Future Enhancements

- Resume Parsing for automated job recommendations
- AI-based candidate-job matching
- Employer analytics dashboard

## 📬 Contributing

Contributions are welcome! Fork the repository and submit a pull request to propose changes.

## 📜 License

This project is licensed under the MIT License.
