// ==========================================
// INCLUSIVETECH HUB - COMPLETE APPLICATION
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyBGXF0tyrpCUm3-Lcd4S5VBzZxqeO1KaIk",
  authDomain: "inclusivetech-hub.firebaseapp.com",
  projectId: "inclusivetech-hub",
  storageBucket: "inclusivetech-hub.firebasestorage.app",
  messagingSenderId: "538323398714",
  appId: "1:538323398714:web:0d664ebd49b201d0f74503"
};

let db, auth;
let useFirebase = false;

function initializeFirebase() {
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      db = firebase.firestore();
      auth = firebase.auth();
      useFirebase = true;
      console.log('✅ Firebase initialized');
    } else {
      console.log('⚠️ Using localStorage');
      useFirebase = false;
    }
  } catch (error) {
    console.error('Firebase error:', error);
    useFirebase = false;
  }
}

const AppState = {
  currentUser: null,
  darkMode: false,
  users: [
  {
    id: 1,
    name: 'Test Admin',
    email: 'admin@test.com',
    password: '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e', // 'password123' hashed
    role: 'admin',
    bio: 'Platform Administrator',
    avatar: null,
    theme: 'light',
    lastProfileEdit: null,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
],
  courses: [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description: "Master front-end and back-end development with HTML, CSS, JavaScript, React, Node.js, and databases.",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      videoUrl: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
      content: ["HTML5 & CSS3 Fundamentals", "JavaScript ES6+ Features", "React.js Component Architecture", "Node.js & Express Backend", "RESTful API Design", "MongoDB & PostgreSQL Databases", "Authentication & Security", "Deployment & DevOps"],
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
      content: ["Python Programming Fundamentals", "NumPy & Pandas for Data Analysis", "Data Visualization with Matplotlib & Seaborn", "Statistical Analysis & Hypothesis Testing", "Machine Learning Algorithms", "Scikit-learn Library", "Deep Learning Basics with TensorFlow", "Real-world Data Science Projects"],
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
      content: ["Cloud Computing Fundamentals", "AWS Core Services (EC2, S3, RDS)", "Docker Containerization", "Kubernetes Orchestration", "CI/CD with GitHub Actions", "Infrastructure as Code (Terraform)", "Monitoring & Logging", "Security Best Practices"],
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
      content: ["Information Security Fundamentals", "Network Security & Protocols", "Cryptography Basics", "Ethical Hacking Techniques", "Penetration Testing Tools", "Web Application Security", "Incident Response & Forensics", "Security Compliance (GDPR, ISO 27001)"],
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
      content: ["Mobile Development Fundamentals", "React Native Basics", "Flutter & Dart Programming", "UI/UX Design for Mobile", "State Management (Redux, Provider)", "Mobile APIs & Backend Integration", "Push Notifications", "App Store Deployment"],
      skills: ["React Native", "Flutter", "Mobile UI/UX", "API Integration"],
      modules: 10
    }
  ],
  mentorRequests: [],
  matches: [],
  discussions: [],
  notifications: [],
  messages: [],
  currentView: 'login',
  currentTab: 'home',
  selectedCourse: null,
  searchQuery: '',
  filterLevel: 'all',
  filterRole: 'all',
  filterStatus: 'all'
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password && password.length >= 8;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span style="font-size: 1.25rem;">${type === 'success' ? '✓' : '✗'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => container.removeChild(toast), 300);
  }, 3000);
}

async function sendEmail(to, subject, body) {
  console.log(`📧 EMAIL: ${to}\nSubject: ${subject}\nBody: ${body}`);
  if (useFirebase) {
    try {
      await db.collection('emails').add({to, subject, body, timestamp: firebase.firestore.FieldValue.serverTimestamp(), status: 'queued'});
    } catch (error) {
      console.error('Email error:', error);
    }
  }
  showToast('Email sent!');
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString(undefined, {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'});
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function loadFromStorage() {
  if (useFirebase) return;
  try {
    const data = ['users', 'currentUser', 'darkMode', 'mentorRequests', 'matches', 'discussions', 'notifications', 'messages'];
    data.forEach(key => {
      const saved = localStorage.getItem(key);
      if (saved) AppState[key] = JSON.parse(saved);
    });
  } catch (error) {
    console.error('Load error:', error);
  }
}

function saveToStorage() {
  if (useFirebase) return;
  try {
    const data = ['users', 'currentUser', 'darkMode', 'mentorRequests', 'matches', 'discussions', 'notifications', 'messages'];
    data.forEach(key => localStorage.setItem(key, JSON.stringify(AppState[key])));
  } catch (error) {
    console.error('Save error:', error);
  }
}

setInterval(() => !useFirebase && saveToStorage(), 30000);

function backupData() {
  const data = {users: AppState.users, discussions: AppState.discussions, matches: AppState.matches, mentorRequests: AppState.mentorRequests, messages: AppState.messages, notifications: AppState.notifications, exportDate: new Date().toISOString()};
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Backup downloaded!');
}

async function handleLogin(email, password, role) {
  if (!email || !password) {
    showToast('Fill all fields', 'error');
    return false;
  }
  if (!validateEmail(email)) {
    showToast('Invalid email', 'error');
    return false;
  }
  try {
    let user;
    if (useFirebase) {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const userDoc = await db.collection('users').doc(userCredential.user.uid).get();
      if (userDoc.exists) {
        user = {id: userDoc.id, ...userDoc.data()};
        if (user.role !== role) {
          await auth.signOut();
          showToast('Invalid role', 'error');
          return false;
        }
      }
    } else {
      const hashedPassword = await hashPassword(password);
      user = AppState.users.find(u => u.email === email && u.password === hashedPassword && u.role === role);
    }
    if (user) {
      AppState.currentUser = user;
      AppState.darkMode = user.theme === 'dark';
      AppState.currentView = 'dashboard';
      await addNotification(`Welcome back, ${user.name}!`, user.id);
      showToast(`Welcome, ${user.name}!`);
      saveToStorage();
      renderApp();
      return true;
    } else {
      showToast('Invalid credentials', 'error');
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    showToast('Login failed', 'error');
    return false;
  }
}

async function handleSignup(name, email, password, confirmPassword, role) {
  if (!name || !email || !password || !confirmPassword) {
    showToast('Fill all fields', 'error');
    return false;
  }
  if (!validateEmail(email)) {
    showToast('Invalid email', 'error');
    return false;
  }
  if (!validatePassword(password)) {
    showToast('Password must be 8+ characters', 'error');
    return false;
  }
  if (password !== confirmPassword) {
    showToast('Passwords do not match', 'error');
    return false;
  }
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = {
      name, email, password: hashedPassword, role, bio: '', avatar: null, theme: 'light', lastProfileEdit: null,
      enrolledCourses: [], courseProgress: {}, createdAt: new Date().toISOString()
    };
    if (role === 'student') {
      newUser.goals = 'Not specified';
      newUser.progress = 0;
    } else if (role === 'mentor') {
      newUser.expertise = 'Not specified';
      newUser.availability = 'Available';
    }
    if (useFirebase) {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      newUser.id = userCredential.user.uid;
      await db.collection('users').doc(newUser.id).set(newUser);
    } else {
      if (AppState.users.find(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return false;
      }
      newUser.id = Date.now();
      AppState.users.push(newUser);
    }
    AppState.currentUser = newUser;
    AppState.currentView = 'dashboard';
    await addNotification(`Welcome to InclusiveTech Hub, ${newUser.name}!`, newUser.id);
    showToast(`Welcome, ${newUser.name}!`);
    await sendEmail(newUser.email, 'Welcome!', `Hi ${newUser.name}, welcome!`);
    saveToStorage();
    renderApp();
    return true;
  } catch (error) {
    console.error('Signup error:', error);
    showToast(error.code === 'auth/email-already-in-use' ? 'Email already registered' : 'Signup failed', 'error');
    return false;
  }
}

async function handleLogout() {
  try {
    if (useFirebase) await auth.signOut();
    AppState.currentUser = null;
    AppState.currentView = 'login';
    AppState.currentTab = 'home';
    showToast('Logged out');
    saveToStorage();
    renderApp();
  } catch (error) {
    console.error('Logout error:', error);
  }
}

async function addNotification(message, userId = null) {
  const notification = {id: Date.now(), message, userId: userId || AppState.currentUser?.id, read: false, timestamp: new Date().toISOString()};
  AppState.notifications.unshift(notification);
  if (useFirebase) {
    try {
      await db.collection('notifications').add(notification);
    } catch (error) {
      console.error('Notification error:', error);
    }
  }
  saveToStorage();
}

async function enrollInCourse(courseId) {
  if (AppState.currentUser.role !== 'student') return;
  if (!AppState.currentUser.enrolledCourses) AppState.currentUser.enrolledCourses = [];
  if (!AppState.currentUser.enrolledCourses.includes(courseId)) {
    const course = AppState.courses.find(c => c.id === courseId);
    AppState.currentUser.enrolledCourses.push(courseId);
    AppState.currentUser.courseProgress[courseId] = {completed: [], total: course.modules};
    const userIndex = AppState.users.findIndex(u => u.id === AppState.currentUser.id);
    AppState.users[userIndex] = AppState.currentUser;
    if (useFirebase) await db.collection('users').doc(AppState.currentUser.id).set(AppState.currentUser);
    showToast('Enrolled!');
    await sendEmail(AppState.currentUser.email, 'Enrollment Confirmed', `You enrolled in ${course.title}`);
    saveToStorage();
    renderApp();
  }
}

async function sendMentorRequest(mentorId, message) {
  const request = {
    id: Date.now(), studentId: AppState.currentUser.id, studentName: AppState.currentUser.name,
    mentorId, mentorName: AppState.users.find(u => u.id === mentorId)?.name,
    message, status: 'pending', createdAt: new Date().toISOString()
  };
  AppState.mentorRequests.push(request);
  if (useFirebase) await db.collection('mentorRequests').add(request);
  const mentor = AppState.users.find(u => u.id === mentorId);
  await addNotification(`New request from ${AppState.currentUser.name}`, mentorId);
  await sendEmail(mentor.email, 'New Mentorship Request', `${AppState.currentUser.name}: ${message}`);
  showToast('Request sent!');
  saveToStorage();
  renderApp();
}

async function handleMentorRequest(requestId, action) {
  const request = AppState.mentorRequests.find(r => r.id === requestId);
  if (!request) return;
  request.status = action;
  if (action === 'accepted') {
    const match = {id: Date.now(), studentId: request.studentId, mentorId: request.mentorId, studentName: request.studentName, mentorName: request.mentorName, matchedAt: new Date().toISOString(), status: 'active'};
    AppState.matches.push(match);
    if (useFirebase) {
      await db.collection('matches').add(match);
      await db.collection('mentorRequests').doc(requestId.toString()).update({status: action});
    }
    await addNotification(`${request.mentorName} accepted your request!`, request.studentId);
    await sendEmail(AppState.users.find(u => u.id === request.studentId)?.email, 'Request Accepted', `${request.mentorName} accepted!`);
    showToast('Request accepted!');
  } else {
    if (useFirebase) await db.collection('mentorRequests').doc(requestId.toString()).update({status: action});
    await addNotification(`${request.mentorName} declined your request.`, request.studentId);
    showToast('Request declined');
  }
  saveToStorage();
  renderApp();
}

async function createDiscussion(title, content, tags) {
  if (!title || !content) {
    showToast('Fill all fields', 'error');
    return;
  }
  const discussion = {id: Date.now(), title, content, createdBy: AppState.currentUser.id, authorName: AppState.currentUser.name, status: 'open', comments: [], tags: tags || [], createdAt: new Date().toISOString()};
  AppState.discussions.unshift(discussion);
  if (useFirebase) await db.collection('discussions').add(discussion);
  showToast('Discussion created!');
  saveToStorage();
  renderApp();
}

async function updateProfile(updates) {
  Object.assign(AppState.currentUser, updates);
  AppState.currentUser.lastProfileEdit = new Date().toISOString();
  const userIndex = AppState.users.findIndex(u => u.id === AppState.currentUser.id);
  AppState.users[userIndex] = AppState.currentUser;
  if (useFirebase) await db.collection('users').doc(AppState.currentUser.id).set(AppState.currentUser);
  showToast('Profile updated!');
  saveToStorage();
  renderApp();
}

async function uploadAvatar(file) {
  if (!file || file.size > 5 * 1024 * 1024) {
    showToast('File must be < 5MB', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = async (e) => {
    await updateProfile({avatar: e.target.result});
  };
  reader.readAsDataURL(file);
}

function searchUsers(query, role = 'all') {
  let users = AppState.users.filter(u => u.id !== AppState.currentUser?.id);
  if (role !== 'all') users = users.filter(u => u.role === role);
  if (query) {
    const lowerQuery = query.toLowerCase();
    users = users.filter(u => u.name.toLowerCase().includes(lowerQuery) || u.email.toLowerCase().includes(lowerQuery) || u.bio?.toLowerCase().includes(lowerQuery) || u.expertise?.toLowerCase().includes(lowerQuery));
  }
  return users;
}

function searchCourses(query, level = 'all') {
  let courses = AppState.courses;
  if (level !== 'all') courses = courses.filter(c => c.level.includes(level));
  if (query) {
    const lowerQuery = query.toLowerCase();
    courses = courses.filter(c => c.title.toLowerCase().includes(lowerQuery) || c.description.toLowerCase().includes(lowerQuery) || c.skills.some(s => s.toLowerCase().includes(lowerQuery)));
  }
  return courses;
}

function searchDiscussions(query, status = 'all') {
  let discussions = AppState.discussions;
  if (status !== 'all') discussions = discussions.filter(d => d.status === status);
  if (query) {
    const lowerQuery = query.toLowerCase();
    discussions = discussions.filter(d => d.title.toLowerCase().includes(lowerQuery) || d.content.toLowerCase().includes(lowerQuery) || d.tags.some(t => t.toLowerCase().includes(lowerQuery)));
  }
  return discussions;
}

async function toggleDarkMode() {
  AppState.darkMode = !AppState.darkMode;
  if (AppState.currentUser) {
    AppState.currentUser.theme = AppState.darkMode ? 'dark' : 'light';
    const userIndex = AppState.users.findIndex(u => u.id === AppState.currentUser.id);
    AppState.users[userIndex] = AppState.currentUser;
    if (useFirebase) await db.collection('users').doc(AppState.currentUser.id).set(AppState.currentUser);
  }
  document.documentElement.classList.toggle('dark', AppState.darkMode);
  saveToStorage();
}
// ==========================================
// UI RENDERING FUNCTIONS
// ==========================================

function renderApp() {
  const app = document.getElementById('app');
  if (AppState.currentView === 'login') {
    app.innerHTML = renderLoginPage();
  } else if (AppState.currentView === 'signup') {
    app.innerHTML = renderSignupPage();
  } else if (AppState.currentView === 'dashboard') {
    app.innerHTML = renderDashboard();
  }
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  document.documentElement.classList.toggle('dark', AppState.darkMode);
}

function renderLoginPage() {
  return `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 animate-fade-in">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">InclusiveTech Hub</h1>
          <p class="text-gray-600 dark:text-gray-400">Bridging the Gender Gap in Technology</p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Login As</label>
          <select id="login-role" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input type="email" id="login-email" placeholder="your@email.com" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input type="password" id="login-password" placeholder="••••••••" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
        </div>
        <button onclick="loginSubmit()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all mb-4">Sign In</button>
        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-400">Don't have an account? <button onclick="switchToSignup()" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">Sign Up</button></p>
        </div>
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">Demo Accounts:</p>
          <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>Admin:</strong> admin@test.com / password123</p>
            <p><strong>Student:</strong> student@test.com / password123</p>
            <p><strong>Mentor:</strong> mentor@test.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSignupPage() {
  return `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 animate-fade-in">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Join InclusiveTech Hub</h1>
          <p class="text-gray-600 dark:text-gray-400">Create your account</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
          <input type="text" id="signup-name" placeholder="John Doe" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input type="email" id="signup-email" placeholder="your@email.com" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input type="password" id="signup-password" placeholder="••••••••" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum 8 characters</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
          <input type="password" id="signup-confirm" placeholder="••••••••" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a</label>
          <select id="signup-role" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
        <button onclick="signupSubmit()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all mb-4">Create Account</button>
        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-400">Already have an account? <button onclick="switchToLogin()" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">Sign In</button></p>
        </div>
      </div>
    </div>
  `;
}

function renderDashboard() {
  return `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      ${renderNavbar()}
      <div class="max-w-7xl mx-auto px-4 py-6">
        ${renderTabContent()}
      </div>
    </div>
  `;
}

function renderNavbar() {
  const unreadNotifications = AppState.notifications.filter(n => n.userId === AppState.currentUser.id && !n.read).length;
  return `
    <nav class="bg-white dark:bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <h1 class="text-2xl font-bold text-purple-600 dark:text-purple-400">InclusiveTech Hub</h1>
            <div class="hidden md:flex space-x-4">
              ${renderNavTabs()}
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button onclick="toggleDarkMode()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <i data-lucide="${AppState.darkMode ? 'sun' : 'moon'}" class="w-5 h-5"></i>
            </button>
            <button onclick="AppState.currentTab = 'notifications'; renderApp();" class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <i data-lucide="bell" class="w-5 h-5"></i>
              ${unreadNotifications > 0 ? `<span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">${unreadNotifications}</span>` : ''}
            </button>
            <button onclick="AppState.currentTab = 'profile'; renderApp();" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              ${AppState.currentUser.avatar ? `<img src="${AppState.currentUser.avatar}" class="w-8 h-8 rounded-full">` : `<div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">${AppState.currentUser.name.charAt(0)}</div>`}
              <span class="hidden md:block text-sm font-medium dark:text-white">${AppState.currentUser.name}</span>
            </button>
            <button onclick="handleLogout()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600">
              <i data-lucide="log-out" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
        <div class="md:hidden pb-4">
          <div class="flex space-x-2 overflow-x-auto">${renderNavTabs()}</div>
        </div>
      </div>
    </nav>
  `;
}

function renderNavTabs() {
  const tabs = [
    {id: 'home', label: 'Home', icon: 'home'},
    {id: 'courses', label: 'Courses', icon: 'book-open'},
    {id: 'mentorship', label: 'Mentorship', icon: 'users'},
    {id: 'discussions', label: 'Discussions', icon: 'message-circle'}
  ];
  if (AppState.currentUser.role === 'admin') {
    tabs.push({id: 'admin', label: 'Admin', icon: 'shield'});
  }
  return tabs.map(tab => `
    <button onclick="AppState.currentTab = '${tab.id}'; renderApp();" class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${AppState.currentTab === tab.id ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'}">
      <i data-lucide="${tab.icon}" class="w-4 h-4"></i>
      <span class="text-sm font-medium">${tab.label}</span>
    </button>
  `).join('');
}

function renderTabContent() {
  switch (AppState.currentTab) {
    case 'home': return renderHome();
    case 'courses': return renderCourses();
    case 'mentorship': return renderMentorship();
    case 'discussions': return renderDiscussions();
    case 'notifications': return renderNotifications();
    case 'profile': return renderProfile();
    case 'admin': return renderAdmin();
    default: return renderHome();
  }
}

function renderHome() {
  const stats = {
    totalCourses: AppState.courses.length,
    enrolledCourses: AppState.currentUser.enrolledCourses?.length || 0,
    totalMentors: AppState.users.filter(u => u.role === 'mentor').length,
    activeMatches: AppState.matches.filter(m => m.status === 'active').length,
    totalDiscussions: AppState.discussions.length
  };
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome back, ${AppState.currentUser.name}! 👋</h2>
        <p class="text-gray-600 dark:text-gray-400">${AppState.currentUser.role === 'student' ? 'Continue your learning journey' : AppState.currentUser.role === 'mentor' ? 'Help students achieve their goals' : 'Manage the platform'}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-purple-600 text-white rounded-lg shadow-lg p-6">
          <i data-lucide="book-open" class="w-8 h-8 mb-2"></i>
          <h3 class="text-3xl font-bold">${stats.totalCourses}</h3>
          <p class="text-purple-100">Total Courses</p>
        </div>
        <div class="bg-blue-600 text-white rounded-lg shadow-lg p-6">
          <i data-lucide="users" class="w-8 h-8 mb-2"></i>
          <h3 class="text-3xl font-bold">${stats.totalMentors}</h3>
          <p class="text-blue-100">Available Mentors</p>
        </div>
        <div class="bg-green-600 text-white rounded-lg shadow-lg p-6">
          <i data-lucide="user-check" class="w-8 h-8 mb-2"></i>
          <h3 class="text-3xl font-bold">${stats.activeMatches}</h3>
          <p class="text-green-100">Active Matches</p>
        </div>
        <div class="bg-orange-600 text-white rounded-lg shadow-lg p-6">
          <i data-lucide="message-circle" class="w-8 h-8 mb-2"></i>
          <h3 class="text-3xl font-bold">${stats.totalDiscussions}</h3>
          <p class="text-orange-100">Discussions</p>
        </div>
      </div>
      ${AppState.currentUser.role === 'student' ? renderStudentDashboard() : ''}
      ${AppState.currentUser.role === 'mentor' ? renderMentorDashboard() : ''}
    </div>
  `;
}

function renderStudentDashboard() {
  const enrolledCourses = AppState.courses.filter(c => AppState.currentUser.enrolledCourses?.includes(c.id));
  return `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">My Learning Progress</h3>
      <div class="mb-4">
        <div class="flex justify-between mb-2">
          <span class="text-sm font-medium dark:text-gray-300">Overall Progress</span>
          <span class="text-sm font-medium text-purple-600 dark:text-purple-400">${AppState.currentUser.progress || 0}%</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div class="bg-purple-600 h-3 rounded-full transition-all" style="width: ${AppState.currentUser.progress || 0}%"></div>
        </div>
      </div>
      ${enrolledCourses.length > 0 ? `
        <h4 class="font-semibold text-gray-800 dark:text-white mb-3">Enrolled Courses</h4>
        <div class="space-y-3">
          ${enrolledCourses.map(c => `
            <div class="border dark:border-gray-700 rounded-lg p-3">
              <h5 class="font-semibold text-gray-800 dark:text-white">${c.title}</h5>
              <div class="flex justify-between items-center mt-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">${AppState.currentUser.courseProgress[c.id]?.completed.length || 0}/${c.modules} modules</span>
                <button onclick="viewCourse(${c.id})" class="text-purple-600 dark:text-purple-400 hover:underline text-sm">Continue</button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <p class="text-gray-600 dark:text-gray-400 text-center py-4">You haven't enrolled in any courses yet. <button onclick="AppState.currentTab = 'courses'; renderApp();" class="text-purple-600 dark:text-purple-400 hover:underline ml-1">Browse courses</button></p>
      `}
    </div>
  `;
}

function renderMentorDashboard() {
  const pendingRequests = AppState.mentorRequests.filter(r => r.mentorId === AppState.currentUser.id && r.status === 'pending');
  const myMatches = AppState.matches.filter(m => m.mentorId === AppState.currentUser.id && m.status === 'active');
  return `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Mentorship Overview</h3>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">${pendingRequests.length}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Pending Requests</p>
        </div>
        <div class="bg-green-50 dark:bg-green-900 rounded-lg p-4">
          <p class="text-2xl font-bold text-green-600 dark:text-green-400">${myMatches.length}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
        </div>
      </div>
      ${pendingRequests.length > 0 ? `<button onclick="AppState.currentTab = 'mentorship'; renderApp();" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all">View Pending Requests</button>` : ''}
    </div>
  `;
}

function renderCourses() {
  const filteredCourses = searchCourses(AppState.searchQuery, AppState.filterLevel);
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Course Catalog</h2>
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <input type="text" placeholder="Search courses..." value="${AppState.searchQuery}" onchange="AppState.searchQuery = this.value; renderApp();" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
          <select onchange="AppState.filterLevel = this.value; renderApp();" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
            <option value="all" ${AppState.filterLevel === 'all' ? 'selected' : ''}>All Levels</option>
            <option value="Beginner" ${AppState.filterLevel === 'Beginner' ? 'selected' : ''}>Beginner</option>
            <option value="Intermediate" ${AppState.filterLevel === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
            <option value="Advanced" ${AppState.filterLevel === 'Advanced' ? 'selected' : ''}>Advanced</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filteredCourses.map(course => `
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="badge badge-purple">${course.level}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400"><i data-lucide="clock" class="w-4 h-4 inline"></i> ${course.duration}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${course.title}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${course.description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                ${course.skills.slice(0, 3).map(skill => `<span class="badge badge-blue text-xs">${skill}</span>`).join('')}
                ${course.skills.length > 3 ? `<span class="badge badge-blue text-xs">+${course.skills.length - 3}</span>` : ''}
              </div>
              <button onclick="${AppState.currentUser.role === 'student' ? `enrollInCourse(${course.id})` : `viewCourse(${course.id})`}" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all">
                ${AppState.currentUser.enrolledCourses?.includes(course.id) ? 'Continue Learning' : 'View Details'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      ${filteredCourses.length === 0 ? `<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center"><i data-lucide="search" class="w-16 h-16 mx-auto text-gray-400 mb-4"></i><p class="text-gray-600 dark:text-gray-400">No courses found</p></div>` : ''}
    </div>
  `;
}
function renderMentorship() {
  if (AppState.currentUser.role === 'student') {
    return renderStudentMentorship();
  } else if (AppState.currentUser.role === 'mentor') {
    return renderMentorMentorship();
  }
  return '<p class="text-gray-600 dark:text-gray-400">Mentorship feature available for students and mentors only.</p>';
}

function renderStudentMentorship() {
  const mentors = searchUsers(AppState.searchQuery, 'mentor');
  const myMatches = AppState.matches.filter(m => m.studentId === AppState.currentUser.id);
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Find a Mentor</h2>
        <input type="text" placeholder="Search mentors..." value="${AppState.searchQuery}" onchange="AppState.searchQuery = this.value; renderApp();" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
      </div>
      ${myMatches.length > 0 ? `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">My Mentors</h3>
          <div class="space-y-3">
            ${myMatches.map(match => {
              const mentor = AppState.users.find(u => u.id === match.mentorId);
              return `
                <div class="flex items-center justify-between border dark:border-gray-700 rounded-lg p-4">
                  <div class="flex items-center space-x-4">
                    ${mentor?.avatar ? `<img src="${mentor.avatar}" class="w-12 h-12 rounded-full">` : `<div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">${mentor?.name.charAt(0)}</div>`}
                    <div>
                      <h4 class="font-semibold text-gray-800 dark:text-white">${mentor?.name}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">${mentor?.expertise}</p>
                    </div>
                  </div>
                  <button onclick="showToast('Messaging feature coming soon!')" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">Message</button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${mentors.map(mentor => `
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex items-start space-x-4">
              ${mentor.avatar ? `<img src="${mentor.avatar}" class="w-16 h-16 rounded-full">` : `<div class="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-2xl">${mentor.name.charAt(0)}</div>`}
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white">${mentor.name}</h3>
                <p class="text-sm text-purple-600 dark:text-purple-400 mb-2">${mentor.expertise}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${mentor.bio || 'No bio available'}</p>
                <span class="badge ${mentor.availability === 'Available' ? 'badge-green' : 'badge-red'}">${mentor.availability}</span>
              </div>
            </div>
            <button onclick="requestMentor(${mentor.id})" class="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all" ${mentor.availability !== 'Available' ? 'disabled' : ''}>Request Mentorship</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMentorMentorship() {
  const requests = AppState.mentorRequests.filter(r => r.mentorId === AppState.currentUser.id && r.status === 'pending');
  const myStudents = AppState.matches.filter(m => m.mentorId === AppState.currentUser.id && m.status === 'active');
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Mentorship Dashboard</h2>
        <p class="text-gray-600 dark:text-gray-400">Manage your mentorship requests and students</p>
      </div>
      ${requests.length > 0 ? `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Pending Requests (${requests.length})</h3>
          <div class="space-y-4">
            ${requests.map(request => `
              <div class="border dark:border-gray-700 rounded-lg p-4">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-semibold text-gray-800 dark:text-white">${request.studentName}</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${formatDate(request.createdAt)}</p>
                  </div>
                  <span class="badge badge-blue">Pending</span>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mb-4">${request.message}</p>
                <div class="flex space-x-2">
                  <button onclick="handleMentorRequest(${request.id}, 'accepted')" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">Accept</button>
                  <button onclick="handleMentorRequest(${request.id}, 'declined')" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">Decline</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">My Students (${myStudents.length})</h3>
        ${myStudents.length > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${myStudents.map(match => {
              const student = AppState.users.find(u => u.id === match.studentId);
              return `
                <div class="border dark:border-gray-700 rounded-lg p-4">
                  <div class="flex items-center space-x-3 mb-3">
                    ${student?.avatar ? `<img src="${student.avatar}" class="w-12 h-12 rounded-full">` : `<div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">${student?.name.charAt(0)}</div>`}
                    <div>
                      <h4 class="font-semibold text-gray-800 dark:text-white">${student?.name}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">${student?.goals || 'No goals set'}</p>
                    </div>
                  </div>
                  <button onclick="showToast('Messaging feature coming soon!')" class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">Send Message</button>
                </div>
              `;
            }).join('')}
          </div>
        ` : '<p class="text-gray-600 dark:text-gray-400 text-center py-8">No students yet</p>'}
      </div>
    </div>
  `;
}

function renderDiscussions() {
  const filteredDiscussions = searchDiscussions(AppState.searchQuery, AppState.filterStatus);
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Community Discussions</h2>
          <button onclick="showCreateDiscussion()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"><i data-lucide="plus" class="w-4 h-4 inline mr-1"></i>New Discussion</button>
        </div>
        <div class="flex gap-4">
          <input type="text" placeholder="Search discussions..." value="${AppState.searchQuery}" onchange="AppState.searchQuery = this.value; renderApp();" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          <select onchange="AppState.filterStatus = this.value; renderApp();" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      <div class="space-y-4">
        ${filteredDiscussions.map(discussion => `
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${discussion.title}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span><i data-lucide="user" class="w-4 h-4 inline"></i> ${discussion.authorName}</span>
                  <span><i data-lucide="clock" class="w-4 h-4 inline"></i> ${formatDate(discussion.createdAt)}</span>
                  <span><i data-lucide="message-circle" class="w-4 h-4 inline"></i> ${discussion.comments?.length || 0} comments</span>
                </div>
              </div>
              <span class="badge ${discussion.status === 'open' ? 'badge-green' : 'badge-red'}">${discussion.status}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">${discussion.content}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              ${discussion.tags?.map(tag => `<span class="badge badge-purple">${tag}</span>`).join('') || ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderNotifications() {
  const userNotifications = AppState.notifications.filter(n => n.userId === AppState.currentUser.id);
  return `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Notifications</h2>
      ${userNotifications.length > 0 ? `
        <div class="space-y-3">
          ${userNotifications.map(notification => `
            <div class="flex items-start space-x-4 p-4 rounded-lg ${notification.read ? 'bg-gray-50 dark:bg-gray-700' : 'bg-purple-50 dark:bg-purple-900'}">
              <i data-lucide="bell" class="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1"></i>
              <div class="flex-1">
                <p class="text-gray-800 dark:text-white">${notification.message}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${formatDateTime(notification.timestamp)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      ` : '<p class="text-gray-600 dark:text-gray-400 text-center py-12">No notifications</p>'}
    </div>
  `;
}

function renderProfile() {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h2>
        <div class="flex items-center space-x-6 mb-6">
          ${AppState.currentUser.avatar ? `<img src="${AppState.currentUser.avatar}" class="w-24 h-24 rounded-full">` : `<div class="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-4xl">${AppState.currentUser.name.charAt(0)}</div>`}
          <div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">${AppState.currentUser.name}</h3>
            <p class="text-gray-600 dark:text-gray-400">${AppState.currentUser.email}</p>
            <span class="badge badge-purple mt-2">${AppState.currentUser.role}</span>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input type="text" id="profile-name" value="${AppState.currentUser.name}" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
            <textarea id="profile-bio" rows="3" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">${AppState.currentUser.bio || ''}</textarea>
          </div>
          ${AppState.currentUser.role === 'student' ? `
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Learning Goals</label>
              <input type="text" id="profile-goals" value="${AppState.currentUser.goals || ''}" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            </div>
          ` : ''}
          ${AppState.currentUser.role === 'mentor' ? `
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expertise</label>
              <input type="text" id="profile-expertise" value="${AppState.currentUser.expertise || ''}" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</label>
              <select id="profile-availability" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                <option value="Available" ${AppState.currentUser.availability === 'Available' ? 'selected' : ''}>Available</option>
                <option value="Busy" ${AppState.currentUser.availability === 'Busy' ? 'selected' : ''}>Busy</option>
                <option value="Unavailable" ${AppState.currentUser.availability === 'Unavailable' ? 'selected' : ''}>Unavailable</option>
              </select>
            </div>
          ` : ''}
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Picture</label>
            <input type="file" id="profile-avatar" accept="image/*" onchange="handleAvatarUpload(this.files[0])" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
          <button onclick="saveProfile()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg">Save Changes</button>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Data Management</h3>
        <div class="flex gap-4">
          <button onclick="backupData()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"><i data-lucide="download" class="w-4 h-4 inline mr-2"></i>Backup Data</button>
        </div>
      </div>
    </div>
  `;
}

function renderAdmin() {
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-purple-50 dark:bg-purple-900 rounded-lg p-6">
            <h3 class="text-lg font-bold text-purple-600 dark:text-purple-400">Total Users</h3>
            <p class="text-4xl font-bold text-gray-800 dark:text-white mt-2">${AppState.users.length}</p>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
            <h3 class="text-lg font-bold text-blue-600 dark:text-blue-400">Active Matches</h3>
            <p class="text-4xl font-bold text-gray-800 dark:text-white mt-2">${AppState.matches.filter(m => m.status === 'active').length}</p>
          </div>
          <div class="bg-green-50 dark:bg-green-900 rounded-lg p-6">
            <h3 class="text-lg font-bold text-green-600 dark:text-green-400">Discussions</h3>
            <p class="text-4xl font-bold text-gray-800 dark:text-white mt-2">${AppState.discussions.length}</p>
          </div>
        </div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">All Users</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Email</th>
                <th class="px-4 py-2 text-left">Role</th>
                <th class="px-4 py-2 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              ${AppState.users.map(user => `
                <tr class="border-b dark:border-gray-700">
                  <td class="px-4 py-3">${user.name}</td>
                  <td class="px-4 py-3">${user.email}</td>
                  <td class="px-4 py-3"><span class="badge badge-purple">${user.role}</span></td>
                  <td class="px-4 py-3">${formatDate(user.createdAt || new Date().toISOString())}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// EVENT HANDLERS
async function loginSubmit() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const role = document.getElementById('login-role').value;
  await handleLogin(email, password, role);
}

async function signupSubmit() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const role = document.getElementById('signup-role').value;
  await handleSignup(name, email, password, confirm, role);
}

function switchToSignup() {
  AppState.currentView = 'signup';
  renderApp();
}

function switchToLogin() {
  AppState.currentView = 'login';
  renderApp();
}

function viewCourse(courseId) {
  showToast('Course viewer coming soon!');
}

function requestMentor(mentorId) {
  const message = prompt('Write a message to the mentor:');
  if (message) {
    sendMentorRequest(mentorId, message);
  }
}

function showCreateDiscussion() {
  const title = prompt('Discussion title:');
  if (!title) return;
  const content = prompt('Discussion content:');
  if (!content) return;
  const tags = prompt('Tags (comma separated):');
  createDiscussion(title, content, tags ? tags.split(',').map(t => t.trim()) : []);
}

async function saveProfile() {
  const updates = {
    name: document.getElementById('profile-name').value,
    bio: document.getElementById('profile-bio').value
  };
  if (AppState.currentUser.role === 'student') {
    updates.goals = document.getElementById('profile-goals').value;
  } else if (AppState.currentUser.role === 'mentor') {
    updates.expertise = document.getElementById('profile-expertise').value;
    updates.availability = document.getElementById('profile-availability').value;
  }
  await updateProfile(updates);
}

async function handleAvatarUpload(file) {
  if (file) {
    await uploadAvatar(file);
  }
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', async () => {
  initializeFirebase();
  if (useFirebase) {
    try {
      const snapshot = await db.collection('users').get();
      AppState.users = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      const discussionsSnapshot = await db.collection('discussions').get();
      AppState.discussions = discussionsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (error) {
      console.error('Firebase load error:', error);
    }
  } else {
    loadFromStorage();
  }
  renderApp();
});
