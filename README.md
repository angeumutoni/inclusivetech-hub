# InclusiveTech Hub
# About The Project
InclusiveTech Hub is a comprehensive platform designed to empower women and underrepresented groups in the technology industry. By providing access to quality education, expert mentorship, and a supportive community, we aim to create an inclusive ecosystem where everyone can thrive.

The platform is live [https://angeumutoni.github.io/inclusivetech-hub/](url)
**NB: If you would like to access the platform, you are required to copy the above link and paste it in your preferred browser search engine instead of clicking on it right away**

# Problem Statement
Despite growing awareness, women remain significantly underrepresented in technology fields. Access to mentorship, quality education, and supportive communities remains limited, particularly in developing regions.
Our Solution

InclusiveTech Hub provides:
Free, high-quality tech courses covering in-demand skills
Intelligent mentorship matching connecting students with industry experts
Community-driven learning through collaborative discussions
Progress tracking to keep learners motivated
Direct messaging for personalized guidance


# Core Features

User Authentication - Secure signup/login with role-based access (Student, Mentor, Admin)
Course Catalogue - 5 comprehensive tech courses with detailed curricula
Mentorship Matching - Students can connect with experienced mentors
Discussion Forums - Community-driven Q&A and knowledge sharing
Progress Tracking - Track learning progress across enrolled courses
Profile Management - Customizable user profiles with avatar upload
Dark Mode - Full dark theme support with user preference saving
Responsive Design - Works seamlessly on desktop, tablet, and mobile

# Security Features

Password hashing with SHA-256
Role-based access control
Firebase Authentication integration
Secure data validation

# Data Management

Auto-save every 30 seconds (localStorage mode)
Manual data backup/export
Firebase Firestore integration for multi-user support
Real-time notifications


# Tech Stack
Frontend: HTML5, CSS3 (Custom styles + Tailwind CSS), Vanilla JavaScript (ES6+), and Lucide Icons

Backend: Firebase Authentication, Firebase Firestore Database, Firebase Hosting

Deployment: GitHub Pages (Static hosting), Firebase Hosting (Alternative)


# Prerequisites
Required (for basic setup):

1. A modern web browser (Chrome, Firefox, Safari, Edge)
2. A text editor (VS Code, Sublime Text, or Notepad++)
3. A GitHub account (for deployment)

Optional (for Firebase integration):

1. A Google account (for Firebase)
2. Node.js (only if using Firebase CLI)

# Running the platform:
This will get the platform running locally without Firebase.
Step 1: Download the Files
Step 2: Open in Browser and Navigate to your inclusivetech-hub folder, double-click index.html to open it in your browser. You should see the login page!
Step 3: Test the Platform by create a new account or use demo credentials:
Student: student@test.com / password123
Mentor: mentor@test.com / password123

That's it! The platform is now running locally using localStorage.


# Full Setup with Firebase
This enables multi-user support, real-time updates, and cloud storage.
Step 1: Create Firebase Project (5 minutes)

Go to Firebase Console:

Visit: https://console.firebase.google.com/
Click "Add project"


Name Your Project:

Enter: inclusivetech-hub
Click "Continue"


Disable Google Analytics (optional)

Toggle off (not needed for this project)
Click "Create project"


Wait for Setup

Wait 30-60 seconds for project creation
Click "Continue"



Step 2: Register Your Web App

Add a Web App:

Click the </> (web) icon on the project homepage
App nickname: InclusiveTech Hub
Don't check "Firebase Hosting" (we'll use GitHub Pages)
Click "Register app"


Copy Your Config:

You'll see a firebaseConfig object
Copy the entire config - you'll need it!
Click "Continue to console"


Update script.js:

Open your script.js file
Find the firebaseConfig object at the top
Replace it with YOUR config from Firebase
Save the file



Step 3: Enable Authentication (3 minutes)

Open Authentication:

In Firebase Console sidebar, click "Build" → "Authentication"
Click "Get started"


Enable Email/Password:

Click "Sign-in method" tab
Click "Email/Password"
Toggle "Enable" to ON
Click "Save"



Step 4: Enable Firestore Database (3 minutes)

Create Database:

Click "Build" → "Firestore Database"
Click "Create database"


Choose Mode:

Select "Start in test mode"
Click "Next"


Select Location:

Choose the region closest to you
Click "Enable"


Set Security Rules:

Wait for database creation
Click "Rules" tab
Replace the rules with:



javascriptrules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Discussions - all authenticated users can read/write
    match /discussions/{discussionId} {
      allow read, write: if request.auth != null;
    }
    
    // Mentor requests
    match /mentorRequests/{requestId} {
      allow read, write: if request.auth != null;
    }
    
    // Matches
    match /matches/{matchId} {
      allow read, write: if request.auth != null;
    }
    
    // Messages
    match /messages/{messageId} {
      allow read, write: if request.auth != null;
    }
    
    // Notifications
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null;
    }
    
    // Email queue
    match /emails/{emailId} {
      allow write: if request.auth != null;
      allow read: if false;
    }
  }
}

Click "Publish"

Step 5: Test Firebase Integration

Open your app in the browser
Check browser console (Press F12)
You should see: "✅ Firebase initialized"
Create a new account to test Firebase authentication
Check Firestore in Firebase Console - you should see a new user document!


# Deployment to GitHub Pages using GitHub Web Interface 
Step 1: Create a Repository

Go to GitHub:

Visit: https://github.com/
Click the "+" icon (top right) → "New repository"


Configure Repository:

Repository name: inclusivetech-hub
Visibility: Public
✅ Check "Add a README file"
Click "Create repository"



Step 2: Upload Files

Upload Your Files:

Click "Add file" → "Upload files"
Drag and drop your 3 files:

index.html
style.css
script.js


Scroll down and click "Commit changes"



Step 3: Enable GitHub Pages

Go to Settings:

Click "Settings" tab (in your repository)


Enable Pages:

Scroll down and click "Pages" (in left sidebar)
Under "Source", select "Deploy from a branch"
Select branch: "main"
Select folder: "/ (root)"
Click "Save"


Wait for Deployment:

Wait 2-3 minutes
Refresh the page
You'll see: "Your site is live at..."
Your URL: https://YOUR-USERNAME.github.io/inclusivetech-hub



Step 4: Test Your Live Site

Visit your URL
Test all features:

Sign up with a new account
Browse courses
Toggle dark mode
Update profile
Create a discussion

# Demo Accounts
For Testing (localStorage mode):
When you first sign up, you'll be creating real accounts. Here are some test accounts you can create:
Student Account:

Name: Test Student
Email: student@test.com
Password: password123
Role: Student

Mentor Account:

Name: Test Mentor
Email: mentor@test.com
Password: password123
Role: Mentor

Admin Account:

Name: Test Admin
Email: admin@test.com
Password: password123
Role: Admin (you'll need to manually set this in the code)


📁 Project Structure
inclusivetech-hub/
├── index.html              # Main HTML file
├── style.css              # All custom styles
├── script.js              # Complete application logic
└── README.md              # This file
File Sizes:

index.html: ~2 KB
style.css: ~8 KB
script.js: ~50 KB (complete application)


# Features Walkthrough
1. Authentication System

Secure signup with email validation
Password strength requirements (8+ characters)
Role-based access (Student, Mentor, Admin)
Password hashing with SHA-256
Session management

2. Course Catalog
Available Courses:

Full-Stack Web Development (12 weeks)
Data Science & Machine Learning (10 weeks)
Cloud Computing & DevOps (8 weeks)
Cybersecurity Essentials (10 weeks)
Mobile App Development (10 weeks)

Features:

Course search and filtering
Detailed course descriptions
Skill tags
Enrollment system
Progress tracking

3. Mentorship System
For Students:

Browse available mentors
Filter by expertise
Send mentorship requests
View matched mentors

For Mentors:

Manage mentorship requests
Accept/decline requests
View student profiles
Set availability status

4. Discussion Forums

Create discussion threads
Add tags for categorization
Comment on discussions
Mark as open/closed
Search discussions

5. User Profiles

Edit personal information
Upload profile picture (up to 5MB)
Set learning goals (students)
Set expertise and availability (mentors)
Theme preference (light/dark)

6. Admin Dashboard

View all users
Platform statistics
User management
Activity monitoring

7. Notifications

Real-time notifications
Unread notification counter
Notification history
Mark as read functionality

8. Dark Mode

Full dark theme
Automatic icon switching
User preference saving
Smooth transitions
