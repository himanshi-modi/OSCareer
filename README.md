# CareerOS 

> **A personalized Career Operating System for students and aspiring developers.**

CareerOS is a full-stack web application designed to help students turn their career goals into an actionable, structured journey.

Instead of using separate tools for resumes, learning plans, projects, progress tracking, and career development, CareerOS brings these workflows together into one platform.

The application combines **career profiling, resume analysis, personalized roadmaps, daily missions, learning progress, projects, certificates, achievements, weekly reviews, notifications, and AI-powered insights**.

---

## Project Overview

Students often know the career they want but struggle to understand:

* What skills they currently have
* Which skills they are missing
* What they should learn next
* Which projects they should build
* Whether they are making meaningful progress
* How prepared they are for their target career

CareerOS addresses this by transforming a career goal into a structured progression:

```text
Career Goal
    ↓
Career Profile
    ↓
Resume Upload
    ↓
Resume Analysis
    ↓
Skill Identification
    ↓
Personalized Roadmap
    ↓
Roadmap Stages
    ↓
Daily Missions
    ↓
Learning Progress
    ↓
Projects & Certificates
    ↓
Weekly Reviews
    ↓
Achievements
    ↓
Career Readiness
```

---

## Problem Statement

Career preparation is often fragmented across multiple platforms.

A student may use:

* One platform for learning
* Another for projects
* Another for resumes
* Spreadsheets for tracking progress
* Separate tools for certificates
* Notes for career planning

CareerOS aims to provide a centralized system where students can **plan, execute, track, and evaluate their career development journey**.

---

#  Features

##  Authentication & User Management

* User registration and login
* JWT-based authentication
* Access and refresh tokens
* Email verification
* Password reset
* Change password
* Google OAuth
* LinkedIn OAuth
* Protected routes
* Role-based authorization
* Rate limiting

---

##  Career Profile
Users can create a career profile containing their career preferences and goals.

The profile is used as a foundation for generating and managing the user's career roadmap.

---

## Resume Management

CareerOS provides resume management and analysis functionality.

Features include:

* Resume upload
* Resume versioning
* Resume text extraction
* Resume analysis
* Skill extraction
* Resume scoring
* AI-powered resume insights

Supported resume processing can work with uploaded document files such as PDF and DOCX.

---

##  AI Integration

CareerOS integrates **Google Gemini** for AI-powered functionality.

AI is used for features such as:

* Resume analysis
* Skill extraction
* Career analysis
* Career insights
* Roadmap generation
* Roadmap-related recommendations

AI functionality is integrated into the backend through dedicated service modules rather than being directly coupled to the frontend.

---

##  Personalized Roadmaps

CareerOS provides structured career roadmaps based on a user's selected career path.

Roadmaps are organized into:

```text
Roadmap
   ↓
Stages
   ↓
Missions
   ↓
Learning Progress
```

The application includes roadmap templates for multiple career paths, including:

* MERN Stack Development
* Full Stack Development
* Frontend Development
* Backend Development
* Java Backend Development
* Python Development
* Data Analyst
* Data Scientist
* DevOps
* Cybersecurity

---
##  Daily Missions

Roadmap stages are broken into actionable missions.

Users can:

* View missions
* Start missions
* Continue missions
* Track mission progress
* Complete missions
* Submit proof where applicable

This turns a large career goal into smaller, manageable tasks.

---

##  Learning Progress

CareerOS tracks progress across roadmap stages and missions.

Users can monitor:

* Current stage
* Mission progress
* Completed missions
* Learning activity
* Overall roadmap progress

---

##  Projects

Users can manage projects related to their career journey.

Project functionality includes:

* Project creation
* Project details
* Project tracking
* Project skills
* Project reviews
* Project statistics

Projects are treated as part of the overall career development workflow rather than as isolated portfolio entries.

---

##  Certificates

Users can manage certificates and associate relevant skills with them.

The system supports:

* Certificate creation
* Certificate updates
* Certificate deletion
* Certificate skills
* Certificate statistics
* Certificate-related analysis functionality

---

##  Achievements

CareerOS includes an achievement system that rewards users for making progress.

Achievement rules can be triggered by activities such as:

* Completing missions
* Completing projects
* Building skills
* Adding certificates
* Resume-related progress
* Roadmap progress
* Completing weekly reviews

---

##  Weekly Reviews

CareerOS provides weekly reviews to help users evaluate their progress.

Weekly reviews can aggregate information such as:

* Learning activity
* Mission completion
* Project activity
* Career progress
* Achievements

The system can also generate insights based on the user's activity.

---

## Notifications

The notification system keeps users informed about relevant activity.

Supported functionality includes:

* Notification listing
* Notification details
* Unread notification count
* Mark notification as read
* Mark all notifications as read

---

## Dashboard

The dashboard acts as a centralized overview of the user's career journey.

It brings together information from multiple modules, including:

* Career profile
* Roadmap
* Today's mission
* Resume
* Weekly review
* Achievements
* Notifications
* Projects
* Certificates
* Career progress
* Career insights

---

# System Architecture

CareerOS follows a layered full-stack architecture.

```text
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │                      │
                    │  Pages / Components  │
                    │  React Router        │
                    │  Axios API Layer     │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    Express Backend   │
                    │                      │
                    │ Routes               │
                    │ Middleware           │
                    │ Controllers          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Services       │
                    │                      │
                    │ Business Logic       │
                    │ AI Integration       │
                    │ Authentication       │
                    │ Career Logic          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Mongoose Models      │
                    │                      │
                    │ Data Validation       │
                    │ Database Operations   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    MongoDB Atlas      │
                    └──────────────────────┘


              External Services
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼
    Gemini AI    Google OAuth  LinkedIn OAuth
```

---

#  Backend Architecture

The backend follows a modular structure:

```text
backend/
└── src/
    ├── config/
    ├── constants/
    ├── controllers/
    ├── errors/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── seed/
    ├── services/
    ├── storage/
    ├── templates/
    └── utils/
```

### Controllers

Handle incoming HTTP requests and responses.

### Services

Contain the application's core business logic.

### Models

Define MongoDB/Mongoose data structures.

### Routes

Define REST API endpoints.

### Middleware

Handle concerns such as:

* Authentication
* Authorization
* Validation
* Rate limiting
* File uploads

### Seed

Contains roadmap and skill data used to initialize the application.

---

#  Project Structure

```text
OSCarrer/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── errors/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   ├── services/
│   │   ├── storage/
│   │   ├── templates/
│   │   └── utils/
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   └── pages/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── shared/
│   └── validators/
│
├── package.json
├── package-lock.json
└── README.md
```

---

#  Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Passport.js
* Nodemailer
* Multer

## AI

* Google Gemini

## Database

* MongoDB Atlas

## Authentication

* JWT
* Google OAuth
* LinkedIn OAuth

## Development

* Git
* GitHub
* npm

---

#  API Modules

The backend is organized around modular REST API routes.

```text
/api/v1/auth
/api/v1/career-profile
/api/v1/resumes
/api/v1/roadmaps
/api/v1/learning-progress
/api/v1/projects
/api/v1/certificates
/api/v1/achievements
/api/v1/weekly-review
/api/v1/notifications
/api/v1/dashboard
```

Each module separates its:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

---

# Database Design

CareerOS uses MongoDB with Mongoose.

Major entities include:

```text
User
 │
 ├── CareerProfile
 ├── Resume
 │     └── ResumeAnalysis
 │
 ├── UserRoadmap
 │     └── UserStage
 │           └── UserMissionProgress
 │
 ├── UserSkill
 │
 ├── Project
 │     ├── ProjectSkill
 │     └── ProjectReview
 │
 ├── Certificate
 │     ├── CertificateSkill
 │     └── CertificateAnalysis
 │
 ├── Achievement
 ├── WeeklyReview
 └── Notification
```

Template/reference entities include:

```text
RoadmapTemplate
StageTemplate
MissionTemplate
Skill
StageChallengeTemplate
```

---

#  AI Architecture

AI functionality is kept inside dedicated backend services.

```text
Frontend
   ↓
Backend API
   ↓
AI Service
   ↓
Google Gemini
   ↓
Structured Result
   ↓
Application Database
   ↓
Frontend
```

This approach keeps AI-related logic separated from controllers and allows AI features to evolve independently.

---

#  Security

CareerOS implements several security-related mechanisms, including:

* JWT authentication
* Access and refresh token architecture
* Protected API routes
* Role-based authorization
* Password hashing
* Email verification
* Password reset flow
* Rate limiting
* Request validation
* Environment-based secret management
* CORS configuration

Sensitive credentials are intentionally excluded from version control.

---

#  Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/himanshi-modi/OSCareer.git
cd OSCarrer
```

## 2. Install root dependencies

```bash
npm install
```

## 3. Install backend dependencies

```bash
cd backend
npm install
```

## 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

#  Environment Variables

Create a `.env` file inside the `backend` directory.

You can use the provided example:

```text
backend/.env.example
```

Example structure:

```env
PORT=8080
NODE_ENV=development

CLIENT_URL=http://localhost:5173

MONGO_URL=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

SESSION_SECRET=your_session_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/v1/auth/google/callback

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:8080/api/v1/auth/linkedin/callback

GEMINI_API_KEY=your_gemini_api_key
```

> **Never commit your actual `.env` file or API keys to GitHub.**

---

# Running the Application

CareerOS uses two development servers.

### Backend

From:

```text
OSCarrer/backend
```

run:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:8080
```

### Frontend

From:

```text
OSCarrer/frontend
```

run:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# Development Ports

| Application |          Port |
| ----------- | ------------: |
| Frontend    |        `5173` |
| Backend     |        `8080` |
| MongoDB     | Cloud / Atlas |

The frontend communicates with the backend through REST APIs.

---



# Deployment

The project is structured for deployment with:

* **Frontend:** Vite/React application
* **Backend:** Node.js/Express application
* **Database:** MongoDB Atlas

Production environment variables should be configured through the hosting provider rather than committed to the repository.

---

# Future Improvements

The following features are planned or could be added in future iterations:

* Advanced AI career recommendations
* Automated GitHub project analysis
* Job recommendation system
* Interview preparation
* Portfolio optimization
* Job application tracking
* More advanced career-readiness scoring
* Improved roadmap personalization
* Real-time learning recommendations
* Additional career paths

These are **future improvements and should not be considered part of the current implementation unless explicitly completed.**

---

# Learning Outcomes

Building CareerOS involved working across multiple areas of full-stack development, including:

* React application architecture
* REST API design
* Express.js backend development
* MongoDB data modeling
* Mongoose relationships
* JWT authentication
* OAuth integration
* Email verification
* Password recovery
* File uploads
* AI API integration
* Service-layer architecture
* Request validation
* Middleware design
* Frontend-backend integration
* State management
* Database seeding
* Git and GitHub workflows
* Deployment architecture

---

# Author

**Himanshi Modi**

BSc Computer Science

CareerOS was developed as a full-stack portfolio project focused on solving a practical problem in student career development.

---

## Project Vision

CareerOS is built around a simple idea:

> **Don't just tell students what career to pursue — give them a structured system to get there.**

From defining a career goal to completing daily missions and reviewing progress, CareerOS aims to turn career preparation into a measurable and actionable journey.

---

## License

This project is currently intended for educational and portfolio purposes.
