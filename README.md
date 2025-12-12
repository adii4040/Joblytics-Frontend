# Joblytic - Job Application Analytics Platform

A complete job application tracking and analytics platform built with React, Vite, Tailwind CSS, and modern web technologies. Designed to help job seekers organize applications, track progress, and gain actionable insights through intelligent analytics.

## 🎯 Features

### Landing Page
- **Hero Section**: Compelling value proposition with animated gradients
- **Features Showcase**: 6 key features with icons and descriptions
- **How It Works**: Simple 3-step process visualization
- **Social Proof**: Stats and testimonials
- **Responsive Design**: Mobile-friendly navigation

### Authentication
- **Signup Page**: Create account with full name, username, email, password
- **Login Page**: Email/password authentication
- **Mock Auth**: Demo mode allows testing without backend

### Dashboard
- **Overview Stats**: Total applications, interviewing, offers, rejected
- **Recent Applications**: Quick view of latest submissions
- **Quick Actions**: Links to analytics, map view, and add application
- **Responsive Grid Layout**: Works on all screen sizes

### Applications Management
- **Applications List**: Grid view of all applications (3 columns on desktop)
- **Application Cards**: 
  - Company logo/badge
  - Role and company name
  - Status badges (Applied, Interviewing, Offered, Rejected, etc.)
  - Work type (Remote/Hybrid/On-site)
  - Job type (Full-time/Internship)
  - Salary range
  - Location
  - Applied date
  - Action buttons (Edit, View PDF, Delete)
- **Filter Tabs**: Filter by status (All, Applied, Interviewing, Offered, Rejected)
- **Responsive Design**: Adapts to mobile, tablet, and desktop

### Add Application Form
- **Company Details**: Company name, role
- **Application Type**: Job or Internship
- **Work Type**: Remote, Hybrid, or On-site
- **Salary Tracking**: Currency selector with min/max range
- **Status Selection**: Track current application status
- **Location Tracking**: With map icon
- **Applied Date**: Calendar picker
- **Job Description Upload**: PDF file upload
- **Notes Section**: Additional notes and details
- **Form Validation**: Required fields validation

### Analytics Dashboard
- **Key Metrics**: Total applications, success rate, interview rate, offer rate
- **Status Distribution**: Donut chart showing application statuses
- **Timeline**: Bar chart of applications by month
- **Work Location**: Pie chart (Remote/Hybrid/On-site distribution)
- **Job Type**: Pie chart (Full-time vs Internship)
- **Conversion Rates**: Visual progress bars for:
  - Applied → Interview Conversion
  - Interview → Offer Conversion
  - Offer Acceptance Rate
  - Overall Success Rate
- **Source Performance Table**: Detailed metrics for each job source
  - Total applications per source
  - Offers by source
  - Interview rates
  - Success rate percentage
- **Quick Insights**: Key takeaways and recommendations

### Map View
- **Location Visualization**: See all applications on a map
- **Location List**: Sidebar showing applications by city
- **Status Indicators**: Visual status on location cards
- **Expandable**: Ready for Leaflet/Google Maps integration

### Navigation
- **Responsive Sidebar**: Desktop navigation sidebar with mobile toggle
- **User Profile**: Shows logged-in user info
- **Quick Links**: Dashboard, Applications, Add Application, Map View, Analytics
- **Logout Button**: Easy account logout

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **UI Components**: Custom components + Radix UI integration ready
- **Charts**: Recharts for data visualization
- **State Management**: React Context + React Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **HTTP Client**: Axios (ready for API integration)
- **Dark Theme**: Full dark mode by default

## 📁 Project Structure

```
src/
├── App.jsx                 # Main app component with routing
├── main.jsx               # Entry point
├── index.css              # Global styles with Tailwind
├── components/
│   ├── Navbar.jsx         # Top navigation
│   ├── Sidebar.jsx        # Dashboard sidebar
│   ├── Button.jsx         # Reusable button component
│   ├── Input.jsx          # Reusable input component
│   ├── Card.jsx           # Card components
│   └── UI.jsx             # Additional UI components
├── context/
│   └── AuthContext.jsx    # Authentication context
├── lib/
│   └── utils.js           # Utility functions
├── pages/
│   ├── Landing.jsx        # Landing page
│   ├── Login.jsx          # Login page
│   ├── Signup.jsx         # Signup page
│   ├── Dashboard.jsx      # Main dashboard
│   ├── Applications.jsx   # Applications list
│   ├── AddApplication.jsx # Add new application form
│   ├── Analytics.jsx      # Analytics dashboard
│   └── MapView.jsx        # Map view
├── config/
│   └── api.js            # API configuration (ready for setup)
└── styles/
    └── variables.css      # CSS variables (ready for setup)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to project directory**:
   ```bash
   cd c:\Users\redHair\Desktop\Jobylitcs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   - Navigate to `http://localhost:3000`
   - The app will automatically reload on file changes

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
