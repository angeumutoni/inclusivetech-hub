import React, { useState, useEffect, useCallback } from 'react';
import { Users, BookOpen, MessageSquare, UserCheck, Home, LogOut, Bell, Settings, Send, Moon, Sun, User, Mail, Plus, Edit, Trash2, X, Check, AlertCircle, Eye, EyeOff, Play, Lock, Unlock, Search, Filter, ChevronLeft, ChevronRight, Upload, Download, BarChart3, TrendingUp } from 'lucide-react';

// Course Data with YouTube links
const coursesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "Master front-end and back-end development with HTML, CSS, JavaScript, React, Node.js, and databases.",
    duration: "12 weeks",
    level: "Beginner to Advanced",
    videoUrl: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
    content: [
      "HTML5 & CSS3 Fundamentals",
      "JavaScript ES6+ Features",
      "React.js Component Architecture",
      "Node.js & Express Backend",
      "RESTful API Design",
      "MongoDB & PostgreSQL Databases",
      "Authentication & Security",
      "Deployment & DevOps"
    ],
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"],
    modules: 8
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    description: "Learn Python, data analysis, visualization, and machine learning algorithms to extract insights from data.",
    duration: "10 weeks",
    level: "Intermediate",
    videoUrl: "https://www.youtube.com/watch?v=ua-CiDNNj30",
    content: [
      "Python Programming Fundamentals",
      "NumPy & Pandas for Data Analysis",
      "Data Visualization with Matplotlib & Seaborn",
      "Statistical Analysis & Hypothesis Testing",
      "Machine Learning Algorithms",
      "Scikit-learn Library",
      "Deep Learning Basics with TensorFlow",
      "Real-world Data Science Projects"
    ],
    skills: ["Python", "Pandas", "Machine Learning", "Statistics", "TensorFlow"],
    modules: 10
  },
  {
    id: 3,
    title: "Cloud Computing & DevOps",
    description: "Master AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure automation for modern cloud deployments.",
    duration: "8 weeks",
    level: "Intermediate to Advanced",
    videoUrl: "https://www.youtube.com/watch?v=3c-iBn73dDE",
    content: [
      "Cloud Computing Fundamentals",
      "AWS Core Services (EC2, S3, RDS)",
      "Docker Containerization",
      "Kubernetes Orchestration",
      "CI/CD with GitHub Actions",
      "Infrastructure as Code (Terraform)",
      "Monitoring & Logging",
      "Security Best Practices"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    modules: 8
  },
  {
    id: 4,
    title: "Cybersecurity Essentials",
    description: "Protect systems, networks, and data. Learn ethical hacking, penetration testing, and security frameworks.",
    duration: "10 weeks",
    level: "Intermediate",
    videoUrl: "https://www.youtube.com/watch?v=U_P23SqJaDc",
    content: [
      "Information Security Fundamentals",
      "Network Security & Protocols",
      "Cryptography Basics",
      "Ethical Hacking Techniques",
      "Penetration Testing Tools",
      "Web Application Security",
      "Incident Response & Forensics",
      "Security Compliance (GDPR, ISO 27001)"
    ],
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Penetration Testing"],
    modules: 10
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Build native and cross-platform mobile apps for iOS and Android using React Native and Flutter.",
    duration: "10 weeks",
    level: "Beginner to Intermediate",
    videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
    content: [
      "Mobile Development Fundamentals",
      "React Native Basics",
      "Flutter & Dart Programming",
      "UI/UX Design for Mobile",
      "State Management (Redux, Provider)",
      "Mobile APIs & Backend Integration",
      "Push Notifications",
      "App Store Deployment"
    ],
    skills: ["React Native", "Flutter", "Mobile UI/UX", "API Integration"],
    modules: 10
  }
];

const InclusiveTechHub = () => {
  // Load data from localStorage on mount
  const loadFromStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [darkMode, setDarkMode] = useState(loadFromStorage('darkMode', false));
  const [currentUser, setCurrentUser] = useState(loadFromStorage('currentUser', null));
  const [activeView, setActiveView] = useState('login');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'student' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student' });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  
  const [users, setUsers] = useState(loadFromStorage('users', [
    { id: 1, name: 'Admin User', email: 'admin@inclusivetech.com', role: 'admin', password: 'admin123', bio: 'Platform Administrator', avatar: null, theme: 'light', lastProfileEdit: null },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'mentor', password: 'mentor123', expertise: 'Web Development', availability: 'Available', bio: 'Senior Developer', avatar: null, theme: 'light', lastProfileEdit: null },
    { id: 3, name: 'Emma Davis', email: 'emma@example.com', role: 'student', password: 'student123', goals: 'Learn Full-Stack', progress: 30, bio: 'Aspiring developer', avatar: null, theme: 'light', lastProfileEdit: null, enrolledCourses: [1], courseProgress: { 1: { completed: [1, 2], total: 8 } } }
  ]));
  
  const [mentorRequests, setMentorRequests] = useState(loadFromStorage('mentorRequests', []));
  const [matches, setMatches] = useState(loadFromStorage('matches', []));
  const [discussions, setDiscussions] = useState(loadFromStorage('discussions', [
    { id: 1, title: 'Introduction to React Hooks', content: 'Learn about useState and useEffect', createdBy: 1, authorName: 'Admin User', status: 'open', comments: [], tags: ['React', 'JavaScript'] },
    { id: 2, title: 'Building Inclusive Communities', content: 'Best practices for welcoming spaces', createdBy: 1, authorName: 'Admin User', status: 'open', comments: [], tags: ['Community', 'Diversity'] }
  ]));
  const [notifications, setNotifications] = useState(loadFromStorage('notifications', []));
  const [messages, setMessages] = useState(loadFromStorage('messages', []));
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Search and Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('mentorRequests', JSON.stringify(mentorRequests));
  }, [mentorRequests]);

  useEffect(() => {
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('discussions', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const showToastMessage = useCallback((message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendEmail = useCallback((to, subject, body) => {
    // Simulate email sending
    console.log(`📧 EMAIL SENT
To: ${to}
Subject: ${subject}
Body: ${body}
---`);
    showToastMessage('Email notification sent!', 'success');
  }, [showToastMessage]);

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      showToastMessage('Please fill in all fields', 'error');
      return;
    }
    if (!validateEmail(loginData.email)) {
      showToastMessage('Invalid email address', 'error');
      return;
    }
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password && u.role === loginData.role);
    if (user) {
      setCurrentUser(user);
      setDarkMode(user.theme === 'dark');
      setActiveView('dashboard');
      showToastMessage(`Welcome back, ${user.name}!`);
    } else {
      const existingUser = users.find(u => u.email === loginData.email);
      showToastMessage(existingUser ? 'Invalid password' : 'No account found. Please sign up.', 'error');
    }
  };

  const handleSignup = () => {
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      showToastMessage('Please fill in all fields', 'error');
      return;
    }
    if (!validateEmail(signupData.email)) {
      showToastMessage('Invalid email address', 'error');
      return;
    }
    if (signupData.password.length < 8) {
      showToastMessage('Password must be at least 8 characters', 'error');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      showToastMessage('Passwords do not match', 'error');
      return;
    }
    if (users.find(u => u.email === signupData.email)) {
      showToastMessage('Email already registered. Please sign in.', 'error');
      return;
    }

    const newUser = {
      id: users.length + 1,
      ...signupData,
      bio: '',
      avatar: null,
      theme: 'light',
      lastProfileEdit: null,
      enrolledCourses: [],
      courseProgress: {},
      expertise: signupData.role === 'mentor' ? 'Not specified' : undefined,
      availability: signupData.role === 'mentor' ? 'Available' : undefined,
      goals: signupData.role === 'student' ? 'Not specified' : undefined,
      progress: signupData.role === 'student' ? 0 : undefined
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setActiveView('dashboard');
    showToastMessage(`Welcome, ${newUser.name}!`);
    
    // Send welcome email
    sendEmail(newUser.email, 'Welcome to InclusiveTech Hub!', `Hi ${newUser.name}, welcome to our platform!`);
  };

  const handleForgotPassword = () => {
    if (!validateEmail(resetEmail)) {
      showToastMessage('Invalid email address', 'error');
      return;
    }
    const user = users.find(u => u.email === resetEmail);
    if (user) {
      sendEmail(resetEmail, 'Password Reset Request', 'Click here to reset your password: [Reset Link]');
      showToastMessage('Reset link sent to your email!', 'success');
      setShowForgotPassword(false);
      setResetEmail('');
    } else {
      showToastMessage('No account found', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('login');
    setShowNotifications(false);
    setShowProfile(false);
    showToastMessage('Logged out successfully');
  };

  const addNotification = useCallback((message, userId = null) => {
    setNotifications(prev => [{
      id: Date.now(),
      message,
      userId: userId || currentUser?.id,
      read: false,
      timestamp: new Date().toISOString()
    }, ...prev]);
  }, [currentUser]);

  const submitMentorRequest = (interest) => {
    const newRequest = {
      id: mentorRequests.length + 1,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      interest,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setMentorRequests([...mentorRequests, newRequest]);
    showToastMessage('Mentorship request submitted!');
    users.filter(u => u.role === 'admin').forEach(admin => {
      addNotification(`New request from ${currentUser.name}`, admin.id);
    });
  };

  const approveMentorMatch = (requestId, mentorId) => {
    const request = mentorRequests.find(r => r.id === requestId);
    const mentor = users.find(u => u.id === mentorId);
    if (request && mentor) {
      setMatches([...matches, {
        id: matches.length + 1,
        studentId: request.studentId,
        studentName: request.studentName,
        mentorId: mentor.id,
        mentorName: mentor.name,
        status: 'active',
        createdAt: new Date().toISOString()
      }]);
      setMentorRequests(mentorRequests.map(r => r.id === requestId ? { ...r, status: 'approved' } : r));
      addNotification(`Matched with ${mentor.name}!`, request.studentId);
      addNotification(`New mentee: ${request.studentName}!`, mentor.id);
      showToastMessage('Match created!');
      
      // Send emails
      sendEmail(request.studentEmail, 'Mentor Match Created!', `You've been matched with ${mentor.name}`);
      sendEmail(mentor.email, 'New Mentee Assigned!', `You have a new mentee: ${request.studentName}`);
    }
  };

  const enrollInCourse = (courseId) => {
    if (currentUser.role !== 'student') return;
    if (!(currentUser.enrolledCourses || []).includes(courseId)) {
      const course = coursesData.find(c => c.id === courseId);
      const updatedUser = {
        ...currentUser,
        enrolledCourses: [...(currentUser.enrolledCourses || []), courseId],
        courseProgress: {
          ...(currentUser.courseProgress || {}),
          [courseId]: { completed: [], total: course.modules }
        }
      };
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      showToastMessage('Enrolled successfully!');
      sendEmail(currentUser.email, 'Course Enrollment Confirmed', `You've enrolled in ${course.title}`);
    }
  };

  const completeModule = (courseId, moduleId) => {
    const progress = currentUser.courseProgress[courseId];
    if (!progress.completed.includes(moduleId)) {
      const newCompleted = [...progress.completed, moduleId];
      const updatedUser = {
        ...currentUser,
        courseProgress: {
          ...currentUser.courseProgress,
          [courseId]: { ...progress, completed: newCompleted }
        },
        progress: Math.round((newCompleted.length / progress.total) * 100)
      };
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      showToastMessage('Module completed!');
    }
  };

  const addComment = (discussionId, comment) => {
    const discussion = discussions.find(d => d.id === discussionId);
    if (discussion.status === 'locked') {
      showToastMessage('Discussion is locked', 'error');
      return;
    }
    setDiscussions(discussions.map(d => d.id === discussionId ? {
      ...d,
      comments: [...d.comments, {
        id: d.comments.length + 1,
        author: currentUser.name,
        authorId: currentUser.id,
        text: comment,
        timestamp: new Date().toISOString()
      }]
    } : d));
    showToastMessage('Comment added!');
  };

  const toggleDiscussionStatus = (id) => {
    setDiscussions(discussions.map(d => d.id === id ? { ...d, status: d.status === 'open' ? 'locked' : 'open' } : d));
  };

  const sendMessage = (recipientId, content) => {
    const recipient = users.find(u => u.id === recipientId);
    const newMessage = {
      id: messages.length + 1,
      senderId: currentUser.id,
      senderName: currentUser.name,
      recipientId,
      recipientName: recipient.name,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages([...messages, newMessage]);
    addNotification(`New message from ${currentUser.name}`, recipientId);
    showToastMessage('Message sent!');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    showToastMessage('Profile updated!');
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToastMessage('File too large (max 5MB)', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'avatar') {
          updateProfile({ avatar: reader.result });
          showToastMessage('Profile picture updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    updateProfile({ theme: !darkMode ? 'dark' : 'light' });
  };

  // Search and Filter Functions
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = filterLevel === 'all' || course.level.toLowerCase().includes(filterLevel.toLowerCase());
    return matchesSearch && matchesLevel;
  });

  const filteredDiscussions = discussions.filter(disc => {
    const matchesSearch = searchQuery === '' ||
      disc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disc.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || disc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const paginate = (items) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  };

  const totalPages = (items) => Math.ceil(items.length / ITEMS_PER_PAGE);

  // Analytics
  const getAnalytics = () => ({
    totalUsers: users.length,
    totalStudents: users.filter(u => u.role === 'student').length,
    totalMentors: users.filter(u => u.role === 'mentor').length,
    activeMatches: matches.filter(m => m.status === 'active').length,
    pendingRequests: mentorRequests.filter(r => r.status === 'pending').length,
    totalEnrollments: users.reduce((sum, u) => sum + (u.enrolledCourses?.length || 0), 0),
    totalDiscussions: discussions.length,
    totalComments: discussions.reduce((sum, d) => sum + d.comments.length, 0),
    avgCourseProgress: users.filter(u => u.role === 'student').reduce((sum, u) => sum + (u.progress || 0), 0) / users.filter(u => u.role === 'student').length || 0
  });

  const Toast = () => showToast && (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-slide-in`}>
      {toastType === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {toastMessage}
    </div>
  );

  const Pagination = ({ total, current, onChange }) => (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-sm">
        Page {current} of {total}
      </span>
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const LoginSignupView = () => {
    const [authView, setAuthView] = useState('login');
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">InclusiveTech Hub</h1>
            <p className="text-gray-600">Bridging the Gender Gap in Technology</p>
          </div>
          
          {!showForgotPassword ? (
            <>
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button onClick={() => setAuthView('login')} className={`flex-1 py-2 rounded-md transition ${authView === 'login' ? 'bg-white shadow' : ''}`}>Login</button>
                <button onClick={() => setAuthView('signup')} className={`flex-1 py-2 rounded-md transition ${authView === 'signup' ? 'bg-white shadow' : ''}`}>Sign Up</button>
              </div>

              {authView === 'login' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select value={loginData.role} onChange={(e) => setLoginData({ ...loginData, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                      <option value="student">Student</option>
                      <option value="mentor">Mentor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button onClick={() => setShowForgotPassword(true)} className="text-sm text-purple-600 hover:underline">Forgot Password?</button>
                  <button onClick={handleLogin} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Login</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input type="password" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
                    <select value={signupData.role} onChange={(e) => setSignupData({ ...signupData, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                      <option value="student">Student</option>
                      <option value="mentor">Mentor</option>
                    </select>
                  </div>
                  <button onClick={handleSignup} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Sign Up</button>
                </div>
              )}
              <p className="mt-4 text-center text-sm text-gray-600">Demo: admin@inclusivetech.com / admin123</p>
            </>
          ) : (
            <div className="space-y-4">
              <button onClick={() => setShowForgotPassword(false)} className="text-sm text-gray-600">← Back</button>
              <h2 className="text-xl font-bold">Reset Password</h2>
              <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="your@email.com" />
              <button onClick={handleForgotPassword} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Send Reset Link</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CoursesView = () => {
    const paginatedCourses = paginate(filteredCourses);
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Priority Tech Courses
          </h2>
        </div>

        {/* Search and Filter */}
        {!selectedCourse && (
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search courses or skills..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                />
              </div>
            </div>
            <select
              value={filterLevel}
              onChange={(e) => { setFilterLevel(e.target.value); setCurrentPage(1); }}
              className={`px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        )}

        {selectedCourse ? (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <button onClick={() => setSelectedCourse(null)} className="mb-4 text-purple-600 hover:underline">← Back to Courses</button>
            <h3 className="text-2xl font-bold mb-2">{selectedCourse.title}</h3>
            <div className="flex gap-4 text-sm mb-4">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded">{selectedCourse.duration}</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">{selectedCourse.level}</span>
            </div>
            <p className="mb-4">{selectedCourse.description}</p>
            
            <div className="mb-6">
              <h4 className="font-bold mb-2">Video Resource:</h4>
              <a href={selectedCourse.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-600 hover:underline">
                <Play className="w-5 h-5" />
                Watch on YouTube
              </a>
            </div>

            <div className="mb-6">
              <h4 className="font-bold mb-2">Course Content:</h4>
              <ul className="space-y-2">
                {selectedCourse.content.map((item, i) => {
                  const isCompleted = currentUser?.courseProgress?.[selectedCourse.id]?.completed?.includes(i + 1);
                  return (
                    <li key={i} className="flex items-start gap-2">
                      {currentUser?.role === 'student' && (currentUser.enrolledCourses || []).includes(selectedCourse.id) ? (
                        <button
                          onClick={() => completeModule(selectedCourse.id, i + 1)}
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 rounded ${isCompleted ? 'bg-green-500' : 'border-2 border-gray-300'}`}
                        >
                          {isCompleted && <Check className="w-4 h-4 text-white" />}
                        </button>
                      ) : (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={isCompleted ? 'line-through text-gray-500' : ''}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-bold mb-2">Skills You'll Learn:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCourse.skills.map((skill, i) => (
                  <span key={i} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>

            {currentUser?.role === 'student' && (
              <button
                onClick={() => enrollInCourse(selectedCourse.id)}
                disabled={(currentUser.enrolledCourses || []).includes(selectedCourse.id)}
                className={`px-6 py-2 rounded-lg ${
                  (currentUser.enrolledCourses || []).includes(selectedCourse.id)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white`}
              >
                {(currentUser.enrolledCourses || []).includes(selectedCourse.id) ? 'Enrolled' : 'Enroll Now'}
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedCourses.map(course => (
                <div key={course.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 hover:shadow-lg transition`}>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm mb-4">{course.description}</p>
                  <div className="flex gap-2 mb-4">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{course.duration}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{course.level}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{skill}</span>
                    ))}
                  </div>
                  <button onClick={() => setSelectedCourse(course)} className="text-purple-600 hover:underline text-sm font-semibold">
                    View Details →
                  </button>
                  {currentUser?.role === 'student' && (currentUser.enrolledCourses || []).includes(course.id) && (
                    <span className="ml-3 text-xs bg-green-100 text-green-700 px-2 py-1 rounded inline-flex items-center gap-1">
                      <Check className="w-3 h-3" /> Enrolled
                    </span>
                  )}
                </div>
              ))}
            </div>
            {totalPages(filteredCourses) > 1 && (
              <Pagination total={totalPages(filteredCourses)} current={currentPage} onChange={setCurrentPage} />
            )}
          </>
        )}
      </div>
    );
  };

  const AnalyticsDashboard = () => {
    const analytics = getAnalytics();
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="w-8 h-8" />
          Platform Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Users</h3>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold">{analytics.totalUsers}</p>
            <p className="text-xs text-gray-500 mt-1">
              {analytics.totalStudents} students, {analytics.totalMentors} mentors
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Active Matches</h3>
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{analytics.activeMatches}</p>
            <p className="text-xs text-gray-500 mt-1">{analytics.pendingRequests} pending requests</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Course Enrollments</h3>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{analytics.totalEnrollments}</p>
            <p className="text-xs text-gray-500 mt-1">Across {coursesData.length} courses</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Avg. Progress</h3>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{Math.round(analytics.avgCourseProgress)}%</p>
            <p className="text-xs text-gray-500 mt-1">Student completion rate</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <h3 className="font-bold mb-4">Discussion Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Discussions:</span>
                <span className="font-bold">{analytics.totalDiscussions}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Comments:</span>
                <span className="font-bold">{analytics.totalComments}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Comments/Discussion:</span>
                <span className="font-bold">{(analytics.totalComments / analytics.totalDiscussions || 0).toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded hover:bg-purple-200 dark:hover:bg-purple-800">
                <Download className="w-4 h-4 inline mr-2" />
                Export User Data
              </button>
              <button className="w-full text-left px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded hover:bg-blue-200 dark:hover:bg-blue-800">
                <Mail className="w-4 h-4 inline mr-2" />
                Send Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MessagingView = () => {
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [messageContent, setMessageContent] = useState('');
    
    const myMessages = messages.filter(m => 
      m.senderId === currentUser.id || m.recipientId === currentUser.id
    );
    
    const conversations = {};
    myMessages.forEach(msg => {
      const otherId = msg.senderId === currentUser.id ? msg.recipientId : msg.senderId;
      if (!conversations[otherId]) {
        conversations[otherId] = [];
      }
      conversations[otherId].push(msg);
    });

    const potentialRecipients = currentUser.role === 'student' 
      ? matches.filter(m => m.studentId === currentUser.id).map(m => ({ id: m.mentorId, name: m.mentorName }))
      : currentUser.role === 'mentor'
      ? matches.filter(m => m.mentorId === currentUser.id).map(m => ({ id: m.studentId, name: m.studentName }))
      : users.filter(u => u.id !== currentUser.id);

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="w-8 h-8" />
          Messages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
            <h3 className="font-bold mb-4">Conversations</h3>
            <div className="space-y-2">
              {potentialRecipients.map(recipient => (
                <button
                  key={recipient.id}
                  onClick={() => setSelectedRecipient(recipient)}
                  className={`w-full text-left px-3 py-2 rounded ${
                    selectedRecipient?.id === recipient.id 
                      ? 'bg-purple-100 dark:bg-purple-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <p className="font-semibold">{recipient.name}</p>
                  {conversations[recipient.id] && (
                    <p className="text-xs text-gray-500">{conversations[recipient.id].length} messages</p>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className={`md:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
            {selectedRecipient ? (
              <>
                <h3 className="font-bold mb-4 pb-4 border-b dark:border-gray-700">{selectedRecipient.name}</h3>
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {(conversations[selectedRecipient.id] || []).map(msg => (
                    <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.senderId === currentUser.id 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs mt-1 opacity-75">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type a message..."
                    className={`flex-1 px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
                  <button
                    onClick={() => {
                      if (messageContent.trim()) {
                        sendMessage(selectedRecipient.id, messageContent);
                        setMessageContent('');
                      }
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-20">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState('home');
    const [newComment, setNewComment] = useState({});
    const [requestInterest, setRequestInterest] = useState('');
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [profileForm, setProfileForm] = useState({ bio: currentUser?.bio || '', email: currentUser?.email || '' });
    const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '', tags: '', show: false });

    const userNotifications = notifications.filter(n => n.userId === currentUser?.id);
    const studentMatches = matches.filter(m => m.studentId === currentUser?.id);
    const mentorMatches = matches.filter(m => m.mentorId === currentUser?.id);
    const paginatedUsers = paginate(filteredUsers);
    const paginatedDiscussions = paginate(filteredDiscussions);

    useEffect(() => {
      setCurrentPage(1);
      setSearchQuery('');
      setFilterRole('all');
      setFilterLevel('all');
      setFilterStatus('all');
    }, [currentTab]);

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <Toast />
        <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-600">InclusiveTech Hub</h1>
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2">
                <Bell className="w-6 h-6" />
                {userNotifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {userNotifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button onClick={() => setShowProfile(!showProfile)} className="p-2">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </button>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

        {showNotifications && (
          <div className={`fixed right-4 top-20 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-4 z-50 max-h-96 overflow-y-auto`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Notifications</h3>
              <button onClick={() => setShowNotifications(false)}><X className="w-5 h-5" /></button>
            </div>
            {userNotifications.length === 0 ? (
              <p className="text-sm text-gray-500">No notifications</p>
            ) : (
              userNotifications.map(notif => (
                <div key={notif.id} className={`p-2 mb-2 rounded ${notif.read ? 'bg-gray-100 dark:bg-gray-700' : 'bg-purple-50 dark:bg-purple-900'}`}>
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(notif.timestamp).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        )}

        {showProfile && (
          <div className={`fixed right-4 top-20 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-4 z-50`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Profile</h3>
              <button onClick={() => setShowProfile(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <div className="relative inline-block">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-2" />
                  ) : (
                    <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-2">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <label className="absolute bottom-2 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer hover:bg-purple-700">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} className="hidden" />
                  </label>
                </div>
                <h4 className="font-bold">{currentUser.name}</h4>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
                <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">{currentUser.role}</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-3">
                <p className="text-sm mb-2"><strong>Bio:</strong> {currentUser.bio || 'No bio yet'}</p>
                <button onClick={() => { setShowProfileEdit(true); setShowProfile(false); }} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {showProfileEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Edit Profile</h3>
                <button onClick={() => setShowProfileEdit(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
                  <p className="text-xs text-gray-500 mt-1">Email changes require admin approval</p>
                </div>
                <button
                  onClick={() => {
                    if (profileForm.email !== currentUser.email) {
                      showToastMessage('Email change request sent to admin');
                    }
                    updateProfile({ bio: profileForm.bio });
                    setShowProfileEdit(false);
                  }}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
          <aside className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 h-fit`}>
            <nav className="space-y-2">
              <button onClick={() => setCurrentTab('home')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentTab === 'home' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <Home className="w-5 h-5" />
                Dashboard
              </button>
              <button onClick={() => setCurrentTab('courses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentTab === 'courses' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <BookOpen className="w-5 h-5" />
                Courses
              </button>
              <button onClick={() => setCurrentTab('classroom')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentTab === 'classroom' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <MessageSquare className="w-5 h-5" />
                Flip Classroom
              </button>
              <button onClick={() => setCurrentTab('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentTab === 'messages' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <Mail className="w-5 h-5" />
                Messages
              </button>
              {currentUser.role === 'admin' && (
                <button onClick={() => setCurrentTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentTab === 'analytics' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <BarChart3 className="w-5 h-5" />
                  Analytics
                </button>
              )}
            </nav>
          </aside>

          <main className="flex-1">
            {currentTab === 'home' && (
              <>
                {currentUser.role === 'admin' && (
                  <div className="space-y-6">
                    {/* Search Users */}
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                          placeholder="Search users..."
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                        />
                      </div>
                      <select
                        value={filterRole}
                        onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
                        className={`px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                      >
                        <option value="all">All Roles</option>
                        <option value="student">Students</option>
                        <option value="mentor">Mentors</option>
                        <option value="admin">Admins</option>
                      </select>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                      <h2 className="text-2xl font-bold mb-4">User Management</h2>
                      <table className="w-full">
                        <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedUsers.map(user => (
                            <tr key={user.id} className={`border-t ${darkMode ? 'border-gray-700' : ''}`}>
                              <td className="px-4 py-2">{user.name}</td>
                              <td className="px-4 py-2">{user.email}</td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-red-100 text-red-700' : user.role === 'mentor' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                  {user.role}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {totalPages(filteredUsers) > 1 && (
                        <Pagination total={totalPages(filteredUsers)} current={currentPage} onChange={setCurrentPage} />
                      )}
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                      <h2 className="text-2xl font-bold mb-4">Pending Mentorship Requests</h2>
                      {mentorRequests.filter(r => r.status === 'pending').length === 0 ? (
                        <p className="text-gray-500">No pending requests</p>
                      ) : (
                        <div className="space-y-4">
                          {mentorRequests.filter(r => r.status === 'pending').map(request => (
                            <div key={request.id} className={`border ${darkMode ? 'border-gray-700' : ''} rounded-lg p-4`}>
                              <h3 className="font-semibold">{request.studentName}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Interest: {request.interest}</p>
                              <div className="mt-2">
                                <label className="block text-sm font-medium mb-1">Assign Mentor:</label>
                                <select onChange={(e) => e.target.value && approveMentorMatch(request.id, parseInt(e.target.value))} className={`px-3 py-1 border rounded ${darkMode ? 'bg-gray-700' : ''}`}>
                                  <option value="">Select mentor...</option>
                                  {users.filter(u => u.role === 'mentor').map(mentor => (
                                    <option key={mentor.id} value={mentor.id}>{mentor.name} - {mentor.expertise}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentUser.role === 'student' && (
                  <div className="space-y-6">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                      <h2 className="text-2xl font-bold mb-4">My Progress</h2>
                      <div className="mb-4">
                        <p className="text-sm mb-2">Overall Learning Progress</p>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div className="bg-purple-600 h-4 rounded-full transition-all" style={{ width: `${currentUser.progress || 0}%` }}></div>
                        </div>
                        <p className="text-sm mt-1">{currentUser.progress || 0}% Complete</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm mb-2"><strong>Enrolled Courses:</strong> {(currentUser.enrolledCourses || []).length}</p>
                        <p className="text-sm"><strong>Goals:</strong> {currentUser.goals}</p>
                      </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                      <h2 className="text-2xl font-bold mb-4">Request Mentorship</h2>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={requestInterest}
                          onChange={(e) => setRequestInterest(e.target.value)}
                          placeholder="Area of interest (e.g., Web Development)"
                          className={`flex-1 px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                        />
                        <button onClick={() => { if (requestInterest) { submitMentorRequest(requestInterest); setRequestInterest(''); }}} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                          Submit
                        </button>
                      </div>
                    </div>

                    {studentMatches.length > 0 && (
                      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                        <h2 className="text-2xl font-bold mb-4">My Mentors</h2>
                        <div className="space-y-3">
                          {studentMatches.map(match => (
                            <div key={match.id} className={`border ${darkMode ? 'border-gray-700' : ''} rounded-lg p-4`}>
                              <h3 className="font-semibold">{match.mentorName}</h3>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentUser.role === 'mentor' && (
                  <div className="space-y-6">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                      <h2 className="text-2xl font-bold mb-4">Mentor Profile</h2>
                      <p className="mb-2"><strong>Expertise:</strong> {currentUser.expertise}</p>
                      <p><strong>Availability:</strong> {currentUser.availability}</p>
                      <p className="mt-2"><strong>Bio:</strong> {currentUser.bio || 'No bio yet'}</p>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                      <h2 className="text-2xl font-bold mb-4">My Mentees</h2>
                      {mentorMatches.length === 0 ? (
                        <p className="text-gray-500">No active mentees yet</p>
                      ) : (
                        <div className="space-y-3">
                          {mentorMatches.map(match => (
                            <div key={match.id} className={`border ${darkMode ? 'border-gray-700' : ''} rounded-lg p-4`}>
                              <h3 className="font-semibold">{match.studentName}</h3>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {currentTab === 'courses' && <CoursesView />}
            {currentTab === 'messages' && <MessagingView />}
            {currentTab === 'analytics' && currentUser.role === 'admin' && <AnalyticsDashboard />}

            {currentTab === 'classroom' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">Flip the Classroom</h2>
                  {currentUser.role === 'admin' && (
                    <button onClick={() => setNewDiscussion({ ...newDiscussion, show: true })} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      New Discussion
                    </button>
                  )}
                </div>

                {/* Search and Filter */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      placeholder="Search discussions..."
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                    className={`px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="locked">Locked</option>
                  </select>
                </div>

                {newDiscussion.show && (
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                    <h3 className="text-xl font-bold mb-4">Create Discussion</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                        placeholder="Discussion title"
                        className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                      />
                      <textarea
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                        placeholder="Discussion content"
                        className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                        rows="4"
                      />
                      <input
                        type="text"
                        value={newDiscussion.tags}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, tags: e.target.value })}
                        placeholder="Tags (comma-separated)"
                        className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (newDiscussion.title && newDiscussion.content) {
                              const disc = {
                                id: discussions.length + 1,
                                title: newDiscussion.title,
                                content: newDiscussion.content,
                                createdBy: currentUser.id,
                                authorName: currentUser.name,
                                status: 'open',
                                comments: [],
                                tags: newDiscussion.tags.split(',').map(t => t.trim()).filter(t => t)
                              };
                              setDiscussions([disc, ...discussions]);
                              setNewDiscussion({ title: '', content: '', tags: '', show: false });
                              showToastMessage('Discussion created!');
                            }
                          }}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                        >
                          Create
                        </button>
                        <button onClick={() => setNewDiscussion({ title: '', content: '', tags: '', show: false })} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {paginatedDiscussions.map(discussion => (
                  <div key={discussion.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{discussion.title}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>by {discussion.authorName}</p>
                        {discussion.tags && discussion.tags.length > 0 && (
                          <div className="flex gap-2 mb-2">
                            {discussion.tags.map((tag, i) => (
                              <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">{tag}</span>
                            ))}
                          </div>
                        )}
                        <p className="mb-4">{discussion.content}</p>
                      </div>
                      {currentUser.role === 'admin' && (
                        <div className="flex gap-2">
                          <button onClick={() => toggleDiscussionStatus(discussion.id)} className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${discussion.status === 'locked' ? 'text-yellow-500' : ''}`}>
                            {discussion.status === 'open' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                          </button>
                          <button onClick={() => { setDiscussions(discussions.filter(d => d.id !== discussion.id)); showToastMessage('Discussion deleted'); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {discussion.status === 'locked' && (
                      <div className={`${darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-100 border-yellow-300'} border rounded p-2 mb-4 flex items-center gap-2`}>
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">This discussion is locked</span>
                      </div>
                    )}

                    <div className={`border-t ${darkMode ? 'border-gray-700' : ''} pt-4`}>
                      <h4 className="font-semibold mb-3">Comments ({discussion.comments.length})</h4>
                      <div className="space-y-3 mb-4">
                        {discussion.comments.map(comment => (
                          <div key={comment.id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded p-3`}>
                            <p className="font-semibold text-sm">{comment.author}</p>
                            <p className="text-sm">{comment.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(comment.timestamp).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      
                      {discussion.status === 'open' && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newComment[discussion.id] || ''}
                            onChange={(e) => setNewComment({ ...newComment, [discussion.id]: e.target.value })}
                            placeholder="Add a comment..."
                            className={`flex-1 px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                          />
                          <button
                            onClick={() => {
                              if (newComment[discussion.id]) {
                                addComment(discussion.id, newComment[discussion.id]);
                                setNewComment({ ...newComment, [discussion.id]: '' });
                              }
                            }}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Post
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {totalPages(filteredDiscussions) > 1 && (
                  <Pagination total={totalPages(filteredDiscussions)} current={currentPage} onChange={setCurrentPage} />
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };

  return currentUser ? <Dashboard /> : <LoginSignupView />;
};

export default InclusiveTechHub;
