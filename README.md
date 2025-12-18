# Joblytics – Frontend

Joblytics is a job application tracking and analytics web application that helps users go beyond maintaining spreadsheets and instead understand how their job search is actually performing. The frontend is responsible for application management, visual analytics, and presenting human-readable performance insights based on user data.

This repository contains the **frontend implementation** of Joblytics.

---

## Why Joblytics (Problem Statement)

Most candidates track job applications using Excel, Google Sheets, or Notion. While these tools store data, they do not explain performance. Users are left guessing why they are not getting interviews, offers, or acceptances.

Joblytics addresses this gap by:
- Structuring job application data
- Automatically calculating conversion metrics
- Categorizing performance levels
- Presenting actionable, readable insights instead of raw numbers

This frontend focuses on **clarity, decision support, and usability**, not just CRUD operations.

---

## Current Scope (What This Frontend Does Today)

This frontend currently supports:
- Secure authentication flow
- Job application CRUD operations
- Analytics dashboards
- Performance reports with explanations

It does **not** yet include automation like browser extensions or external job imports.

---

## Tech Stack

### Core
- **React (Vite)**
- **JavaScript (ES6+)**
- **Tailwind CSS**
- **Shadcn UI**
- **React Router DOM**
- **React Query (TanStack Query)**

### Visualization
- **Recharts**

### Auth & API
- Cookie-based authentication (handled by backend)
- Protected routes on the frontend
- Axios / Fetch for API communication

---

## Application Architecture (Frontend)

The frontend follows a **page + component driven architecture**:

- `Pages/` – Route-level pages (Dashboard, Applications, Analytics, Reports)
- `components/` – Reusable UI components
- `hooks/` – Tanstack query handler as custom hooks
- `services/` – API interaction logic
- `helper/` – Protected Routes and Auth loader

The architecture keeps UI, data fetching, and state management clearly separated.

---

## Authentication Flow (Frontend Perspective)

1. User logs in or registers
2. Backend sets a secure HttpOnly cookie
3. Frontend checks authentication status on app load
4. Protected routes are conditionally rendered
5. Session persists across refreshes without storing tokens in localStorage

This approach avoids exposing sensitive tokens to XSS attacks.

---

## Core Features

### 1. Application Management

- Add, edit, delete job applications
- Track:
  - Company
  - Role
  - Job type (Job / Internship)
  - Work location (Remote / Hybrid / On-site)
  - Salary
  - Application source (LinkedIn, Referral, Company Website, etc.)
  - Application status
- Card-based layout for better readability compared to spreadsheets or tables

---

### 2. Analytics Dashboard

The analytics dashboard automatically computes and displays:

- Total applications
- Application status distribution
- Conversion funnel:
  - Applied → Interview
  - Interview → Offer
  - Offer → Acceptance
- Job type distribution
- Work location distribution
- Application source performance

Both visual charts and raw counts are shown to maintain transparency.

---

### 3. Performance Metrics

The frontend presents computed metrics such as:

- Performance Rate
- Success Rate
- Interview Rate
- Offer Rate
- Offer Acceptance Rate
- Rejection Rate

Each metric includes:
- A performance category (Very Weak → Excellent)
- A brief explanation of what it indicates
- Contextual feedback to guide improvement

All values are rendered dynamically based on user data.

---

### 4. Source Effectiveness Analysis

Users can analyze application performance across sources such as:
- LinkedIn
- Referrals
- Company Websites
- AngelList
- Other platforms

For each source, the frontend displays:
- Interview rate
- Offer rate
- Acceptance rate
- Data sufficiency indicators
- Human-readable insights and recommendations

This helps users decide where to focus their effort.

---

### 5. Job Type & Location Analysis

Analytics are broken down by:
- Job vs Internship
- Remote vs Hybrid vs On-site

This reveals patterns such as:
- Resume effectiveness by category
- Interview conversion differences
- Acceptance behavior by work location

---

### 6. Performance Report Page

The report page provides a **narrative summary** of the job search, including:
- Overall performance snapshot
- Funnel effectiveness
- Strengths and weaknesses
- Clear explanations instead of raw charts

The goal is to answer:
**What is happening, why it is happening, and what should be improved next.**

---

## Design Philosophy

- Clarity over complexity
- Insights over charts
- Honest data representation
- No black-box decisions

If a metric is shown, it is explainable.

---

## Limitations (Current)

- Manual job application entry is required
- No browser extension or auto-import yet
- Insights improve with higher data volume
- Analytics correctness depends on backend computations

These are planned areas for improvement.

---

## Why This Is Better Than Excel or Sheets

Excel and Google Sheets store data. Joblytics explains data.

The frontend:
- Enforces structured input
- Automatically computes funnels
- Categorizes performance meaningfully
- Removes the need for manual analysis

---

## Project Status

This project represents an **MVP-level frontend**, built with a focus on correctness, clarity, and real-world job search use cases. It is actively being improved.

---

## Author

**Aditya Kumar Singh**  
Frontend Developer  

Built as a real-world project to explore analytics-driven UI, decision-oriented dashboards, and structured frontend architecture.
