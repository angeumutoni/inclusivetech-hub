// ==========================================
// INCLUSIVETECH HUB - COMPLETE APPLICATION
// Version 2.0 - With Course Content & Assessments
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
  users: [],
  courses: [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description: "Master front-end and back-end development with HTML, CSS, JavaScript, React, Node.js, and databases.",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      videoUrl: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"],
      totalModules: 20,
      modules: [
        {
          id: 1,
          week: 1,
          title: "How the Web Works",
          description: "Understanding internet fundamentals, browsers, servers, and HTTP protocol.",
          videoUrl: "https://www.youtube.com/watch?v=hJHvdBlSxug",
          duration: "45 min",
          topics: ["What is the internet?", "How websites load", "Front-end vs Back-end", "Tools: VS Code, Node.js, Git"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "What does HTTP stand for?",
                options: ["HyperText Transfer Protocol", "High Tech Transfer Program", "Home Tool Transfer Protocol", "Hyperlink Text Program"],
                correctAnswer: 0
              },
              {
                id: 2,
                question: "Which is NOT a front-end technology?",
                options: ["HTML", "CSS", "JavaScript", "MongoDB"],
                correctAnswer: 3
              },
              {
                id: 3,
                question: "What is the role of a web server?",
                options: ["Design websites", "Store and serve web pages", "Write HTML code", "Create databases"],
                correctAnswer: 1
              }
            ]
          }
        },
        {
          id: 2,
          week: 1,
          title: "HTML Essentials",
          description: "Learn HTML structure, tags, semantic elements, and build your first webpage.",
          videoUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          duration: "60 min",
          topics: ["HTML document structure", "Tags and attributes", "Links, images, lists", "Semantic HTML"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "Which HTML tag is used for the largest heading?",
                options: ["<head>", "<h6>", "<h1>", "<header>"],
                correctAnswer: 2
              },
              {
                id: 2,
                question: "What does semantic HTML mean?",
                options: ["HTML with colors", "HTML that describes its meaning", "HTML with JavaScript", "HTML with CSS"],
                correctAnswer: 1
              },
              {
                id: 3,
                question: "Which tag creates a hyperlink?",
                options: ["<link>", "<a>", "<href>", "<url>"],
                correctAnswer: 1
              }
            ]
          }
        },
        {
          id: 3,
          week: 2,
          title: "CSS Fundamentals",
          description: "Master CSS selectors, box model, flexbox, and create beautiful layouts.",
          videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
          duration: "75 min",
          topics: ["Selectors and specificity", "Box model", "Flexbox layout", "CSS units"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "Which CSS property controls text size?",
                options: ["text-size", "font-size", "text-style", "font-style"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "What does 'display: flex' do?",
                options: ["Makes text flexible", "Creates a flexible container", "Adds flexibility to images", "None of these"],
                correctAnswer: 1
              },
              {
                id: 3,
                question: "Which unit is relative to the viewport width?",
                options: ["px", "em", "vw", "pt"],
                correctAnswer: 2
              }
            ]
          }
        },
        {
          id: 4,
          week: 2,
          title: "Responsive Design",
          description: "Create mobile-friendly websites with media queries and responsive techniques.",
          videoUrl: "https://www.youtube.com/watch?v=srvUrASNj0s",
          duration: "50 min",
          topics: ["Media queries", "Mobile-first approach", "Responsive images", "Accessibility basics"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "What is mobile-first design?",
                options: ["Designing only for mobile", "Starting design with mobile view", "Mobile phones first priority", "Designing for tablets"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "Which CSS feature enables responsive design?",
                options: ["Flexbox", "Media queries", "Grid", "All of these"],
                correctAnswer: 3
              },
              {
                id: 3,
                question: "What does WCAG stand for?",
                options: ["Web Content Accessibility Guidelines", "Web Code Access Guide", "Website Creative Art Guidelines", "Web CSS Accessibility Guide"],
                correctAnswer: 0
              }
            ]
          }
        },
        {
          id: 5,
          week: 3,
          title: "JavaScript Basics",
          description: "Learn programming fundamentals with JavaScript - variables, functions, and DOM manipulation.",
          videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
          duration: "90 min",
          topics: ["Variables and data types", "Functions", "Conditionals and loops", "DOM manipulation"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "Which keyword declares a constant in JavaScript?",
                options: ["var", "let", "const", "constant"],
                correctAnswer: 2
              },
              {
                id: 2,
                question: "What does DOM stand for?",
                options: ["Document Object Model", "Data Object Management", "Digital Online Method", "Document Order Model"],
                correctAnswer: 0
              },
              {
                id: 3,
                question: "Which method selects an element by ID?",
                options: ["getElement()", "getElementById()", "selectId()", "findById()"],
                correctAnswer: 1
              }
            ]
          }
        },
        {
          id: 6,
          week: 3,
          title: "Intermediate JavaScript",
          description: "Work with arrays, objects, events, and build interactive applications.",
          videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
          duration: "80 min",
          topics: ["Arrays and objects", "Event listeners", "Local storage", "Building a to-do app"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "How do you add an event listener in JavaScript?",
                options: ["element.addEvent()", "element.addEventListener()", "element.on()", "element.listen()"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "What is localStorage used for?",
                options: ["Storing data on server", "Storing data in browser", "Creating variables", "Managing events"],
                correctAnswer: 1
              },
              {
                id: 3,
                question: "Which method adds an item to the end of an array?",
                options: ["add()", "append()", "push()", "insert()"],
                correctAnswer: 2
              }
            ]
          }
        },
        {
          id: 7,
          week: 4,
          title: "Asynchronous JavaScript",
          description: "Master async programming with Promises, async/await, and the Fetch API.",
          videoUrl: "https://www.youtube.com/watch?v=PoRJizFvM7s",
          duration: "70 min",
          topics: ["Callbacks", "Promises", "Async/await", "Fetch API"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "What does async/await help with?",
                options: ["Writing synchronous code", "Writing asynchronous code more readably", "Making code faster", "Debugging"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "Which method is used to fetch data from an API?",
                options: ["get()", "fetch()", "retrieve()", "ajax()"],
                correctAnswer: 1
              },
              {
                id: 3,
                question: "What does a Promise represent?",
                options: ["A completed operation", "An eventual completion or failure", "A variable", "A function"],
                correctAnswer: 1
              }
            ]
          }
        },
        {
          id: 8,
          week: 4,
          title: "Working with APIs",
          description: "Learn REST APIs, handle errors, and build a weather dashboard.",
          videoUrl: "https://www.youtube.com/watch?v=GZvSYJDk-us",
          duration: "65 min",
          topics: ["REST API concepts", "JSON parsing", "Error handling", "API authentication"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "What does REST stand for?",
                options: ["Reliable State Transfer", "Representational State Transfer", "Remote System Transfer", "Real Estate Transfer"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "Which HTTP method retrieves data?",
                options: ["POST", "PUT", "GET", "DELETE"],
                correctAnswer: 2
              },
              {
                id: 3,
                question: "What format do most APIs return data in?",
                options: ["XML", "HTML", "JSON", "CSV"],
                correctAnswer: 2
              }
            ]
          }
        }
      ]
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      description: "Learn Python, data analysis, visualization, and machine learning algorithms.",
      duration: "10 weeks",
      level: "Intermediate",
      videoUrl: "https://www.youtube.com/watch?v=ua-CiDNNj30",
      skills: ["Python", "Pandas", "Machine Learning", "Statistics", "TensorFlow"],
      totalModules: 16,
      modules: [
        {
          id: 1,
          week: 1,
          title: "Python Essentials",
          description: "Master Python fundamentals including syntax, variables, and data types.",
          videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
          duration: "90 min",
          topics: ["Python syntax", "Variables and types", "Functions", "Control flow"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "Which symbol starts a comment in Python?",
                options: ["//", "#", "/*", "--"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "What data type is [1, 2, 3]?",
                options: ["Tuple", "Dictionary", "List", "Set"],
                correctAnswer: 2
              },
              {
                id: 3,
                question: "How do you define a function in Python?",
                options: ["function myFunc()", "def myFunc():", "func myFunc()", "define myFunc()"],
                correctAnswer: 1
              }
            ]
          }
        },
        {
          id: 2,
          week: 2,
          title: "Pandas for Data Analysis",
          description: "Work with DataFrames, clean data, and perform analysis with Pandas.",
          videoUrl: "https://www.youtube.com/watch?v=vmEHCJofslg",
          duration: "120 min",
          topics: ["DataFrames", "Reading CSV files", "Data filtering", "Grouping operations"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "What is a DataFrame in Pandas?",
                options: ["A Python list", "A 2D labeled data structure", "A dictionary", "A tuple"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "Which method reads a CSV file?",
                options: ["pd.load_csv()", "pd.read_csv()", "pd.open_csv()", "pd.import_csv()"],
                correctAnswer: 1
              },
              {
                id: 3,
                question: "What does '.head()' do?",
                options: ["Shows last rows", "Shows first rows", "Shows column names", "Shows data types"],
                correctAnswer: 1
              }
            ]
          }
        }
      ]
    },
    {
      id: 3,
      title: "Cloud Computing & DevOps",
      description: "Master AWS, Docker, Kubernetes, and modern cloud infrastructure.",
      duration: "8 weeks",
      level: "Intermediate to Advanced",
      videoUrl: "https://www.youtube.com/watch?v=3c-iBn73dDE",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      totalModules: 15,
      modules: [
        {
          id: 1,
          week: 1,
          title: "Cloud Computing Fundamentals",
          description: "Understand cloud concepts, service models, and major providers.",
          videoUrl: "https://www.youtube.com/watch?v=M988_fsOSWo",
          duration: "60 min",
          topics: ["IaaS, PaaS, SaaS", "Cloud providers", "AWS basics", "Cloud architecture"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "What does IaaS stand for?",
                options: ["Internet as a Service", "Infrastructure as a Service", "Integration as a Service", "Installation as a Service"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "Which is an AWS compute service?",
                options: ["S3", "RDS", "EC2", "VPC"],
                correctAnswer: 2
              },
              {
                id: 3,
                question: "What is the main benefit of cloud computing?",
                options: ["Lower internet speed", "Scalability and flexibility", "More hardware needed", "Complex management"],
                correctAnswer: 1
              }
            ]
          }
        }
      ]
    },
    {
      id: 4,
      title: "Cybersecurity Essentials",
      description: "Learn security fundamentals, ethical hacking, and protect systems.",
      duration: "10 weeks",
      level: "Intermediate",
      videoUrl: "https://www.youtube.com/watch?v=U_P23SqJaDc",
      skills: ["Network Security", "Ethical Hacking", "Cryptography", "Penetration Testing"],
      totalModules: 20,
      modules: [
        {
          id: 1,
          week: 1,
          title: "Security Fundamentals",
          description: "Understand cybersecurity principles, threats, and vulnerabilities.",
          videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
          duration: "75 min",
          topics: ["CIA triad", "Threat landscape", "Vulnerabilities", "Risk management"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "What does CIA stand for in cybersecurity?",
                options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability", "Computer Internet Access", "Cyber Information Analysis"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "What is a vulnerability?",
                options: ["A security strength", "A weakness that can be exploited", "A type of virus", "A firewall"],
                correctAnswer: 1
              },
              {
                id: 3,
                question: "Which is NOT a type of malware?",
                options: ["Virus", "Trojan", "Firewall", "Ransomware"],
                correctAnswer: 2
              }
            ]
          }
        }
      ]
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Build mobile apps with React Native and Flutter.",
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
      skills: ["React Native", "Flutter", "Mobile UI/UX", "API Integration"],
      totalModules: 20,
      modules: [
        {
          id: 1,
          week: 1,
          title: "Mobile Development Fundamentals",
          description: "Understand mobile platforms, cross-platform development, and setup.",
          videoUrl: "https://www.youtube.com/watch?v=fgdpvwEWJ9M",
          duration: "60 min",
          topics: ["iOS vs Android", "Cross-platform frameworks", "React Native setup", "Flutter setup"],
          assessment: {
            questions: [
              {
                id: 1,
                question: "What is React Native?",
                options: ["A mobile OS", "A JavaScript framework for mobile apps", "A database", "A cloud service"],
                correctAnswer: 1
              },
              {
                id: 2,
                question: "Which language does Flutter use?",
                options: ["JavaScript", "Python", "Dart", "Java"],
                correctAnswer: 2
              },
              {
                id: 3,
                question: "What does cross-platform mean?",
                options: ["Only works on iOS", "Works on multiple platforms", "Web only", "Desktop only"],
                correctAnswer: 1
              }
            ]
          }
        }
      ]
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
  selectedModule: null,
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

async function loadFromStorage() {
  if (useFirebase) return;
  try {
    const data = ['users', 'currentUser', 'darkMode', 'mentorRequests', 'matches', 'discussions', 'notifications', 'messages'];
    data.forEach(key => {
      const saved = localStorage.getItem(key);
      if (saved) AppState[key] = JSON.parse(saved);
    });
    
    // CRITICAL FIX: Ensure admin account exists with correct hashed password
    const adminPassword = await hashPassword('password123');
    const existingAdmin = AppState.users.find(u => u.email === 'admin@test.com');
    
    if (!existingAdmin) {
      const adminAccount = {
        id: 'admin-1',
        name: 'Test Admin',
        email: 'admin@test.com',
        password: adminPassword,
        role: 'admin',
        bio: 'Platform Administrator',
        avatar: null,
        theme: 'light',
        lastProfileEdit: null,
        createdAt: '2024-01-01T00:00:00.000Z'
      };
      AppState.users.push(adminAccount);
      console.log('✅ Admin account created with password:', adminPassword);
    } else if (existingAdmin.password !== adminPassword) {
      existingAdmin.password = adminPassword;
      console.log('✅ Admin password updated to:', adminPassword);
    }
    
    console.log('📊 Total users:', AppState.users.length);
    console.log('👤 Users:', AppState.users.map(u => `${u.name} (${u.email})`));
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
// ==========================================
// AUTHENTICATION FUNCTIONS
// ==========================================

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
      // Hash the password for comparison
      const hashedPassword = await hashPassword(password);
      console.log('🔐 Login attempt:', {email, role});
      console.log('🔑 Hashed password:', hashedPassword);
      
      // Find user with matching email, password, and role
      user = AppState.users.find(u => {
        const emailMatch = u.email === email;
        const passwordMatch = u.password === hashedPassword;
        const roleMatch = u.role === role;
        
        if (emailMatch) {
          console.log(`👤 Found user: ${u.name}`);
          console.log(`   Email match: ${emailMatch}`);
          console.log(`   Password match: ${passwordMatch}`);
          console.log(`   Role match: ${roleMatch} (expected: ${role}, got: ${u.role})`);
        }
        
        return emailMatch && passwordMatch && roleMatch;
      });
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
      console.log('❌ Login failed - credentials not found');
      showToast('Invalid credentials', 'error');
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    showToast('Login failed: ' + error.message, 'error');
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
      newUser.id = Date.now().toString();
      AppState.users.push(newUser);
    }
    AppState.currentUser = newUser;
    AppState.currentView = 'dashboard';
    await addNotification(`Welcome to InclusiveTech Hub, ${newUser.name}!`, newUser.id);
    showToast(`Welcome, ${newUser.name}!`);
    await sendEmail(newUser.email, 'Welcome!', `Hi ${newUser.name}, welcome to InclusiveTech Hub!`);
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

// ==========================================
// COURSE FUNCTIONS
// ==========================================

async function enrollInCourse(courseId) {
  if (AppState.currentUser.role !== 'student') {
    showToast('Only students can enroll in courses', 'error');
    return;
  }
  
  if (!AppState.currentUser.enrolledCourses) AppState.currentUser.enrolledCourses = [];
  
  if (!AppState.currentUser.enrolledCourses.includes(courseId)) {
    const course = AppState.courses.find(c => c.id === courseId);
    AppState.currentUser.enrolledCourses.push(courseId);
    AppState.currentUser.courseProgress[courseId] = {
      completedModules: [],
      moduleScores: {},
      totalModules: course.totalModules,
      overallScore: 0
    };
    
    const userIndex = AppState.users.findIndex(u => u.id === AppState.currentUser.id);
    AppState.users[userIndex] = AppState.currentUser;
    
    if (useFirebase) await db.collection('users').doc(AppState.currentUser.id).set(AppState.currentUser);
    
    showToast('Enrolled successfully!');
    await sendEmail(AppState.currentUser.email, 'Course Enrollment Confirmed', `You've enrolled in ${course.title}`);
    saveToStorage();
    renderApp();
  } else {
    showToast('Already enrolled in this course', 'info');
  }
}

function viewCourse(courseId) {
  AppState.selectedCourse = courseId;
  AppState.currentTab = 'course-view';
  renderApp();
}

function startModule(courseId, moduleId) {
  AppState.selectedCourse = courseId;
  AppState.selectedModule = moduleId;
  AppState.currentTab = 'module-view';
  renderApp();
}

async function submitAssessment(courseId, moduleId, answers) {
  const course = AppState.courses.find(c => c.id === courseId);
  const module = course.modules.find(m => m.id === moduleId);
  
  if (!module || !module.assessment) {
    showToast('Assessment not found', 'error');
    return;
  }
  
  let correctCount = 0;
  const totalQuestions = module.assessment.questions.length;
  
  module.assessment.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correctCount++;
    }
  });
  
  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= 70;
  
  // Update progress
  if (!AppState.currentUser.courseProgress[courseId]) {
    AppState.currentUser.courseProgress[courseId] = {
      completedModules: [],
      moduleScores: {},
      totalModules: course.totalModules,
      overallScore: 0
    };
  }
  
  const progress = AppState.currentUser.courseProgress[courseId];
  progress.moduleScores[moduleId] = score;
  
  if (passed && !progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
  }
  
  // Calculate overall score
  const totalScore = Object.values(progress.moduleScores).reduce((sum, s) => sum + s, 0);
  progress.overallScore = Math.round(totalScore / Object.keys(progress.moduleScores).length);
  
  // Update user progress percentage
  AppState.currentUser.progress = Math.round((progress.completedModules.length / progress.totalModules) * 100);
  
  // Update in users array
  const userIndex = AppState.users.findIndex(u => u.id === AppState.currentUser.id);
  AppState.users[userIndex] = AppState.currentUser;
  
  if (useFirebase) await db.collection('users').doc(AppState.currentUser.id).set(AppState.currentUser);
  
  saveToStorage();
  
  // Show results
  showAssessmentResults(correctCount, totalQuestions, score, passed, moduleId);
}

function showAssessmentResults(correct, total, score, passed, moduleId) {
  const resultMessage = passed 
    ? `🎉 Congratulations! You scored ${score}% (${correct}/${total} correct). Module completed!`
    : `📚 You scored ${score}% (${correct}/${total} correct). You need 70% to pass. Please review the material and try again.`;
  
  const resultType = passed ? 'success' : 'error';
  showToast(resultMessage, resultType);
  
  if (passed) {
    AppState.selectedModule = null;
    AppState.currentTab = 'course-view';
    renderApp();
  }
}

// ==========================================
// NOTIFICATION FUNCTIONS
// ==========================================

async function addNotification(message, userId = null) {
  const notification = {
    id: Date.now(), 
    message, 
    userId: userId || AppState.currentUser?.id, 
    read: false, 
    timestamp: new Date().toISOString()
  };
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

async function markNotificationAsRead(notificationId) {
  const notification = AppState.notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    if (useFirebase) {
      try {
        await db.collection('notifications').doc(notificationId.toString()).update({read: true});
      } catch (error) {
        console.error('Error updating notification:', error);
      }
    }
    saveToStorage();
    renderApp();
  }
}

// ==========================================
// MENTORSHIP FUNCTIONS
// ==========================================

async function sendMentorRequest(mentorId, message) {
  const request = {
    id: Date.now(), 
    studentId: AppState.currentUser.id, 
    studentName: AppState.currentUser.name,
    mentorId, 
    mentorName: AppState.users.find(u => u.id === mentorId)?.name,
    message, 
    status: 'pending', 
    createdAt: new Date().toISOString()
  };
  
  AppState.mentorRequests.push(request);
  if (useFirebase) await db.collection('mentorRequests').add(request);
  
  const mentor = AppState.users.find(u => u.id === mentorId);
  await addNotification(`New mentorship request from ${AppState.currentUser.name}`, mentorId);
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
    const match = {
      id: Date.now(), 
      studentId: request.studentId, 
      mentorId: request.mentorId, 
      studentName: request.studentName, 
      mentorName: request.mentorName, 
      matchedAt: new Date().toISOString(), 
      status: 'active'
    };
    
    AppState.matches.push(match);
    
    if (useFirebase) {
      await db.collection('matches').add(match);
      await db.collection('mentorRequests').doc(requestId.toString()).update({status: action});
    }
    
    await addNotification(`${request.mentorName} accepted your mentorship request!`, request.studentId);
    await sendEmail(AppState.users.find(u => u.id === request.studentId)?.email, 'Request Accepted', `${request.mentorName} accepted your request!`);
    showToast('Request accepted!');
  } else {
    if (useFirebase) await db.collection('mentorRequests').doc(requestId.toString()).update({status: action});
    await addNotification(`${request.mentorName} declined your mentorship request.`, request.studentId);
    showToast('Request declined');
  }
  
  saveToStorage();
  renderApp();
}

// ==========================================
// DISCUSSION FUNCTIONS
// ==========================================

async function createDiscussion(title, content, tags) {
  if (!title || !content) {
    showToast('Fill all fields', 'error');
    return;
  }
  
  const discussion = {
    id: Date.now(), 
    title, 
    content, 
    createdBy: AppState.currentUser.id, 
    authorName: AppState.currentUser.name, 
    status: 'open', 
    comments: [], 
    tags: tags || [], 
    createdAt: new Date().toISOString()
  };
  
  AppState.discussions.unshift(discussion);
  if (useFirebase) await db.collection('discussions').add(discussion);
  
  showToast('Discussion created!');
  saveToStorage();
  renderApp();
}

// ==========================================
// PROFILE FUNCTIONS
// ==========================================

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

// ==========================================
// SEARCH FUNCTIONS
// ==========================================

function searchUsers(query, role = 'all') {
  let users = AppState.users.filter(u => u.id !== AppState.currentUser?.id);
  if (role !== 'all') users = users.filter(u => u.role === role);
  if (query) {
    const lowerQuery = query.toLowerCase();
    users = users.filter(u => 
      u.name.toLowerCase().includes(lowerQuery) || 
      u.email.toLowerCase().includes(lowerQuery) || 
      u.bio?.toLowerCase().includes(lowerQuery) || 
      u.expertise?.toLowerCase().includes(lowerQuery)
    );
  }
  return users;
}

function searchCourses(query, level = 'all') {
  let courses = AppState.courses;
  if (level !== 'all') courses = courses.filter(c => c.level.includes(level));
  if (query) {
    const lowerQuery = query.toLowerCase();
    courses = courses.filter(c => 
      c.title.toLowerCase().includes(lowerQuery) || 
      c.description.toLowerCase().includes(lowerQuery) || 
      c.skills.some(s => s.toLowerCase().includes(lowerQuery))
    );
  }
  return courses;
}

function searchDiscussions(query, status = 'all') {
  let discussions = AppState.discussions;
  if (status !== 'all') discussions = discussions.filter(d => d.status === status);
  if (query) {
    const lowerQuery = query.toLowerCase();
    discussions = discussions.filter(d => 
      d.title.toLowerCase().includes(lowerQuery) || 
      d.content.toLowerCase().includes(lowerQuery) || 
      d.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }
  return discussions;
}

// ==========================================
// DARK MODE TOGGLE
// ==========================================

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
        
        <button onclick="loginSubmit()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all mb-4">
          Sign In
        </button>
        
        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Don't have an account? 
            <button onclick="switchToSignup()" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">Sign Up</button>
          </p>
        </div>
        
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">Demo Account:</p>
          <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
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
        
        <button onclick="signupSubmit()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all mb-4">
          Create Account
        </button>
        
        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Already have an account? 
            <button onclick="switchToLogin()" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">Sign In</button>
          </p>
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
              ${AppState.currentUser.avatar 
                ? `<img src="${AppState.currentUser.avatar}" class="w-8 h-8 rounded-full">`
                : `<div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">${AppState.currentUser.name.charAt(0)}</div>`
              }
              <span class="hidden md:block text-sm font-medium dark:text-white">${AppState.currentUser.name}</span>
            </button>
            
            <button onclick="handleLogout()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600">
              <i data-lucide="log-out" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
        
        <div class="md:hidden pb-4">
          <div class="flex space-x-2 overflow-x-auto">
            ${renderNavTabs()}
          </div>
        </div>
      </div>
    </nav>
  `;
}

function renderNavTabs() {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'courses', label: 'Courses', icon: 'book-open' },
    { id: 'mentorship', label: 'Mentorship', icon: 'users' },
    { id: 'discussions', label: 'Discussions', icon: 'message-circle' }
  ];
  
  if (AppState.currentUser.role === 'admin') {
    tabs.push({ id: 'admin', label: 'Admin', icon: 'shield' });
  }
  
  return tabs.map(tab => `
    <button 
      onclick="AppState.currentTab = '${tab.id}'; AppState.selectedCourse = null; AppState.selectedModule = null; renderApp();"
      class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        AppState.currentTab === tab.id 
          ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
      }">
      <i data-lucide="${tab.icon}" class="w-4 h-4"></i>
      <span class="text-sm font-medium">${tab.label}</span>
    </button>
  `).join('');
}

function renderTabContent() {
  switch (AppState.currentTab) {
    case 'home': return renderHome();
    case 'courses': return renderCourses();
    case 'course-view': return renderCourseView();
    case 'module-view': return renderModuleView();
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
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, ${AppState.currentUser.name}! 👋
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          ${AppState.currentUser.role === 'student' ? 'Continue your learning journey' : 
            AppState.currentUser.role === 'mentor' ? 'Help students achieve their goals' : 
            'Manage the platform'}
        </p>
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
      ${AppState.currentUser.role === 'admin' ? renderAdminDashboard() : ''}
    </div>
  `;
}

function renderStudentDashboard() {
  const enrolledCourses = AppState.courses.filter(c => 
    AppState.currentUser.enrolledCourses?.includes(c.id)
  );
  
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
          ${enrolledCourses.map(c => {
            const progress = AppState.currentUser.courseProgress[c.id];
            const completed = progress?.completedModules?.length || 0;
            const total = c.totalModules;
            const percentage = Math.round((completed / total) * 100);
            
            return `
              <div class="border dark:border-gray-700 rounded-lg p-3">
                <h5 class="font-semibold text-gray-800 dark:text-white">${c.title}</h5>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">${completed}/${total} modules (${percentage}%)</span>
                  <button onclick="viewCourse(${c.id})" class="text-purple-600 dark:text-purple-400 hover:underline text-sm">Continue</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <p class="text-gray-600 dark:text-gray-400 text-center py-4">
          You haven't enrolled in any courses yet.
          <button onclick="AppState.currentTab = 'courses'; renderApp();" class="text-purple-600 dark:text-purple-400 hover:underline ml-1">Browse courses</button>
        </p>
      `}
    </div>
  `;
}

function renderMentorDashboard() {
  const pendingRequests = AppState.mentorRequests.filter(r => 
    r.mentorId === AppState.currentUser.id && r.status === 'pending'
  );
  const myMatches = AppState.matches.filter(m => 
    m.mentorId === AppState.currentUser.id && m.status === 'active'
  );
  
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
      
      ${pendingRequests.length > 0 ? `
        <button onclick="AppState.currentTab = 'mentorship'; renderApp();" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all">
          View Pending Requests
        </button>
      ` : ''}
    </div>
  `;
}

function renderAdminDashboard() {
  return `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Platform Overview</h3>
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">${AppState.users.length}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">${AppState.matches.length}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Matches</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-600 dark:text-green-400">${AppState.discussions.length}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Discussions</p>
        </div>
      </div>
    </div>
  `;
}
// ==========================================
// COURSE RENDERING FUNCTIONS
// ==========================================

function renderCourses() {
  const filteredCourses = searchCourses(AppState.searchQuery, AppState.filterLevel);
  
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Course Catalog</h2>
        
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search courses..." 
            value="${AppState.searchQuery}"
            onchange="AppState.searchQuery = this.value; renderApp();"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
          
          <select 
            onchange="AppState.filterLevel = this.value; renderApp();"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
            <option value="all" ${AppState.filterLevel === 'all' ? 'selected' : ''}>All Levels</option>
            <option value="Beginner" ${AppState.filterLevel === 'Beginner' ? 'selected' : ''}>Beginner</option>
            <option value="Intermediate" ${AppState.filterLevel === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
            <option value="Advanced" ${AppState.filterLevel === 'Advanced' ? 'selected' : ''}>Advanced</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filteredCourses.map(course => {
          const isEnrolled = AppState.currentUser.enrolledCourses?.includes(course.id);
          const progress = isEnrolled ? AppState.currentUser.courseProgress[course.id] : null;
          const completed = progress?.completedModules?.length || 0;
          const percentage = progress ? Math.round((completed / course.totalModules) * 100) : 0;
          
          return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="badge badge-purple">${course.level}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    <i data-lucide="clock" class="w-4 h-4 inline"></i> ${course.duration}
                  </span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${course.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${course.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                  ${course.skills.slice(0, 3).map(skill => `
                    <span class="badge badge-blue text-xs">${skill}</span>
                  `).join('')}
                  ${course.skills.length > 3 ? `<span class="badge badge-blue text-xs">+${course.skills.length - 3}</span>` : ''}
                </div>
                
                ${isEnrolled ? `
                  <div class="mb-4">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-600 dark:text-gray-400">Progress</span>
                      <span class="font-semibold text-purple-600 dark:text-purple-400">${percentage}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="bg-purple-600 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
                    </div>
                  </div>
                ` : ''}
                
                <button 
                  onclick="${isEnrolled ? `viewCourse(${course.id})` : (AppState.currentUser.role === 'student' ? `enrollInCourse(${course.id})` : `viewCourse(${course.id})`)}" 
                  class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all">
                  ${isEnrolled ? 'Continue Learning' : (AppState.currentUser.role === 'student' ? 'Enroll Now' : 'View Details')}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      
      ${filteredCourses.length === 0 ? `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
          <i data-lucide="search" class="w-16 h-16 mx-auto text-gray-400 mb-4"></i>
          <p class="text-gray-600 dark:text-gray-400">No courses found matching your criteria</p>
        </div>
      ` : ''}
    </div>
  `;
}

function renderCourseView() {
  const course = AppState.courses.find(c => c.id === AppState.selectedCourse);
  if (!course) return '<p>Course not found</p>';
  
  const isEnrolled = AppState.currentUser.enrolledCourses?.includes(course.id);
  const progress = isEnrolled ? AppState.currentUser.courseProgress[course.id] : null;
  
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <button onclick="AppState.currentTab = 'courses'; AppState.selectedCourse = null; renderApp();" class="text-purple-600 dark:text-purple-400 hover:underline mb-4 flex items-center">
          <i data-lucide="arrow-left" class="w-4 h-4 mr-2"></i>
          Back to Courses
        </button>
        
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1">
            <span class="badge badge-purple mb-2">${course.level}</span>
            <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">${course.title}</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">${course.description}</p>
            
            <div class="flex flex-wrap gap-4 mb-4">
              <div class="flex items-center text-gray-600 dark:text-gray-400">
                <i data-lucide="clock" class="w-5 h-5 mr-2"></i>
                <span>${course.duration}</span>
              </div>
              <div class="flex items-center text-gray-600 dark:text-gray-400">
                <i data-lucide="book-open" class="w-5 h-5 mr-2"></i>
                <span>${course.totalModules} Modules</span>
              </div>
              <div class="flex items-center text-gray-600 dark:text-gray-400">
                <i data-lucide="award" class="w-5 h-5 mr-2"></i>
                <span>Certificate upon completion</span>
              </div>
            </div>
            
            <div class="mb-4">
              <h3 class="font-semibold text-gray-800 dark:text-white mb-2">Skills You'll Learn:</h3>
              <div class="flex flex-wrap gap-2">
                ${course.skills.map(skill => `<span class="badge badge-blue">${skill}</span>`).join('')}
              </div>
            </div>
            
            ${isEnrolled && progress ? `
              <div class="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 mb-4">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-semibold text-purple-800 dark:text-purple-200">Your Progress</h3>
                  <span class="text-lg font-bold text-purple-600 dark:text-purple-400">${Math.round((progress.completedModules.length / course.totalModules) * 100)}%</span>
                </div>
                <div class="w-full bg-purple-200 dark:bg-purple-700 rounded-full h-3">
                  <div class="bg-purple-600 h-3 rounded-full transition-all" style="width: ${(progress.completedModules.length / course.totalModules) * 100}%"></div>
                </div>
                <p class="text-sm text-purple-700 dark:text-purple-300 mt-2">${progress.completedModules.length} of ${course.totalModules} modules completed</p>
              </div>
            ` : ''}
            
            ${!isEnrolled && AppState.currentUser.role === 'student' ? `
              <button onclick="enrollInCourse(${course.id})" class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all">
                Enroll in This Course
              </button>
            ` : ''}
          </div>
          
          <div class="w-full md:w-96">
            <div class="aspect-video rounded-lg overflow-hidden mb-4">
              <iframe 
                width="100%" 
                height="100%" 
                src="${course.videoUrl.replace('watch?v=', 'embed/')}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Course Modules</h3>
        
        <div class="space-y-3">
          ${course.modules.map(module => {
            const isCompleted = progress?.completedModules?.includes(module.id);
            const score = progress?.moduleScores?.[module.id];
            const isLocked = !isEnrolled;
            
            return `
              <div class="border dark:border-gray-700 rounded-lg p-4 ${isLocked ? 'opacity-50' : 'hover:border-purple-500 transition-colors'}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      ${isCompleted ? `
                        <span class="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs font-semibold mr-2">
                          ✓ Completed
                        </span>
                      ` : isLocked ? `
                        <span class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded text-xs font-semibold mr-2">
                          🔒 Locked
                        </span>
                      ` : ''}
                      <span class="text-sm text-gray-500 dark:text-gray-400">Week ${module.week}</span>
                    </div>
                    
                    <h4 class="font-semibold text-gray-800 dark:text-white mb-1">Module ${module.id}: ${module.title}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${module.description}</p>
                    
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <i data-lucide="clock" class="w-4 h-4 mr-1"></i>
                      <span>${module.duration}</span>
                      <span class="mx-2">•</span>
                      <i data-lucide="list" class="w-4 h-4 mr-1"></i>
                      <span>${module.assessment.questions.length} questions</span>
                    </div>
                    
                    ${score !== undefined ? `
                      <div class="mt-2">
                        <span class="text-sm font-semibold ${score >= 70 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}">
                          Score: ${score}%
                        </span>
                      </div>
                    ` : ''}
                  </div>
                  
                  <button 
                    onclick="${isLocked ? '' : `startModule(${course.id}, ${module.id})`}" 
                    class="${isLocked ? 'cursor-not-allowed bg-gray-300 dark:bg-gray-600' : 'bg-purple-600 hover:bg-purple-700'} text-white px-4 py-2 rounded-lg text-sm transition-all"
                    ${isLocked ? 'disabled' : ''}>
                    ${isCompleted ? 'Review' : 'Start'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderModuleView() {
  const course = AppState.courses.find(c => c.id === AppState.selectedCourse);
  const module = course?.modules.find(m => m.id === AppState.selectedModule);
  
  if (!course || !module) return '<p>Module not found</p>';
  
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <button onclick="AppState.selectedModule = null; AppState.currentTab = 'course-view'; renderApp();" class="text-purple-600 dark:text-purple-400 hover:underline mb-4 flex items-center">
          <i data-lucide="arrow-left" class="w-4 h-4 mr-2"></i>
          Back to Course
        </button>
        
        <div class="mb-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">Week ${module.week} • Module ${module.id}</span>
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">${module.title}</h2>
          <p class="text-gray-600 dark:text-gray-400">${module.description}</p>
        </div>
        
        <div class="aspect-video rounded-lg overflow-hidden mb-6">
          <iframe 
            width="100%" 
            height="100%" 
            src="${module.videoUrl.replace('watch?v=', 'embed/')}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        
        <div class="mb-6">
          <h3 class="font-semibold text-gray-800 dark:text-white mb-3">Topics Covered:</h3>
          <ul class="space-y-2">
            ${module.topics.map(topic => `
              <li class="flex items-start">
                <i data-lucide="check-circle" class="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5"></i>
                <span class="text-gray-700 dark:text-gray-300">${topic}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          <i data-lucide="clipboard-check" class="w-6 h-6 inline mr-2"></i>
          Assessment
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Complete this assessment to test your understanding. You need 70% to pass.</p>
        
        <form id="assessment-form" onsubmit="submitAssessmentForm(event, ${course.id}, ${module.id})">
          <div class="space-y-6">
            ${module.assessment.questions.map((question, qIndex) => `
              <div class="border dark:border-gray-700 rounded-lg p-4">
                <p class="font-semibold text-gray-800 dark:text-white mb-3">
                  ${qIndex + 1}. ${question.question}
                </p>
                <div class="space-y-2">
                  ${question.options.map((option, oIndex) => `
                    <label class="flex items-center p-3 border dark:border-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 cursor-pointer transition-colors">
                      <input 
                        type="radio" 
                        name="question-${qIndex}" 
                        value="${oIndex}" 
                        required
                        class="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      >
                      <span class="ml-3 text-gray-700 dark:text-gray-300">${option}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          
          <button 
            type="submit" 
            class="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all">
            Submit Assessment
          </button>
        </form>
      </div>
    </div>
  `;
}

// ==========================================
// MENTORSHIP RENDERING
// ==========================================

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
        <input 
          type="text" 
          placeholder="Search mentors by name or expertise..." 
          value="${AppState.searchQuery}"
          onchange="AppState.searchQuery = this.value; renderApp();"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
        >
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
                    ${mentor?.avatar 
                      ? `<img src="${mentor.avatar}" class="w-12 h-12 rounded-full">`
                      : `<div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">${mentor?.name.charAt(0)}</div>`
                    }
                    <div>
                      <h4 class="font-semibold text-gray-800 dark:text-white">${mentor?.name}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">${mentor?.expertise}</p>
                    </div>
                  </div>
                  <button onclick="showToast('Messaging feature coming soon!')" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                    Message
                  </button>
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
              ${mentor.avatar 
                ? `<img src="${mentor.avatar}" class="w-16 h-16 rounded-full">`
                : `<div class="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-2xl">${mentor.name.charAt(0)}</div>`
              }
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white">${mentor.name}</h3>
                <p class="text-sm text-purple-600 dark:text-purple-400 mb-2">${mentor.expertise}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${mentor.bio || 'No bio available'}</p>
                <span class="badge ${mentor.availability === 'Available' ? 'badge-green' : 'badge-red'}">${mentor.availability}</span>
              </div>
            </div>
            <button 
              onclick="requestMentor(${mentor.id})" 
              class="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all"
              ${mentor.availability !== 'Available' ? 'disabled' : ''}>
              Request Mentorship
            </button>
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
                  <button onclick="handleMentorRequest(${request.id}, 'accepted')" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                    Accept
                  </button>
                  <button onclick="handleMentorRequest(${request.id}, 'declined')" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                    Decline
                  </button>
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
                    ${student?.avatar 
                      ? `<img src="${student.avatar}" class="w-12 h-12 rounded-full">`
                      : `<div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">${student?.name.charAt(0)}</div>`
                    }
                    <div>
                      <h4 class="font-semibold text-gray-800 dark:text-white">${student?.name}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">${student?.goals || 'No goals set'}</p>
                    </div>
                  </div>
                  <button onclick="showToast('Messaging feature coming soon!')" class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
                    Send Message
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        ` : '<p class="text-gray-600 dark:text-gray-400 text-center py-8">No students yet</p>'}
      </div>
    </div>
  `;
}
// ==========================================
// DISCUSSIONS RENDERING
// ==========================================

function renderDiscussions() {
  const filteredDiscussions = searchDiscussions(AppState.searchQuery, AppState.filterStatus);
  
  return `
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Community Discussions</h2>
          <button onclick="showCreateDiscussion()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            <i data-lucide="plus" class="w-4 h-4 inline mr-1"></i>
            New Discussion
          </button>
        </div>
        
        <div class="flex gap-4">
          <input 
            type="text" 
            placeholder="Search discussions..." 
            value="${AppState.searchQuery}"
            onchange="AppState.searchQuery = this.value; renderApp();"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
          <select 
            onchange="AppState.filterStatus = this.value; renderApp();"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
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
      
      ${filteredDiscussions.length === 0 ? `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
          <i data-lucide="message-circle" class="w-16 h-16 mx-auto text-gray-400 mb-4"></i>
          <p class="text-gray-600 dark:text-gray-400">No discussions found</p>
        </div>
      ` : ''}
    </div>
  `;
}

// ==========================================
// NOTIFICATIONS RENDERING
// ==========================================

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
              ${!notification.read ? `
                <button onclick="markNotificationAsRead(${notification.id})" class="text-purple-600 dark:text-purple-400 hover:underline text-sm whitespace-nowrap">
                  Mark as read
                </button>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : '<p class="text-gray-600 dark:text-gray-400 text-center py-12">No notifications</p>'}
    </div>
  `;
}

// ==========================================
// PROFILE RENDERING
// ==========================================

function renderProfile() {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h2>
        
        <div class="flex items-center space-x-6 mb-6">
          ${AppState.currentUser.avatar 
            ? `<img src="${AppState.currentUser.avatar}" class="w-24 h-24 rounded-full">`
            : `<div class="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-4xl">${AppState.currentUser.name.charAt(0)}</div>`
          }
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
          
          <button onclick="saveProfile()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Data Management</h3>
        <div class="flex gap-4">
          <button onclick="backupData()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
            <i data-lucide="download" class="w-4 h-4 inline mr-2"></i>
            Backup Data
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// ADMIN RENDERING
// ==========================================

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

// ==========================================
// EVENT HANDLERS
// ==========================================

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

function submitAssessmentForm(event, courseId, moduleId) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const answers = [];
  
  // Get all answers
  let questionIndex = 0;
  while (formData.has(`question-${questionIndex}`)) {
    answers.push(parseInt(formData.get(`question-${questionIndex}`)));
    questionIndex++;
  }
  
  submitAssessment(courseId, moduleId, answers);
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Initializing InclusiveTech Hub...');
  
  initializeFirebase();
  
  if (useFirebase) {
    try {
      console.log('📡 Loading data from Firebase...');
      const snapshot = await db.collection('users').get();
      AppState.users = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      
      const discussionsSnapshot = await db.collection('discussions').get();
      AppState.discussions = discussionsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      
      console.log('✅ Firebase data loaded');
    } catch (error) {
      console.error('❌ Firebase load error:', error);
      console.log('⚠️ Falling back to localStorage');
      await loadFromStorage();
    }
  } else {
    console.log('💾 Loading data from localStorage...');
    await loadFromStorage();
  }
  
  console.log('📊 App state initialized:');
  console.log('   Users:', AppState.users.length);
  console.log('   Courses:', AppState.courses.length);
  console.log('   Discussions:', AppState.discussions.length);
  
  renderApp();
  console.log('✅ App rendered successfully!');
});

// ==========================================
// DEBUG HELPER (Remove in production)
// ==========================================

// Expose state for debugging
window.AppState = AppState;
window.renderApp = renderApp;

console.log('💡 Debug helpers available:');
console.log('   - window.AppState: View current application state');
console.log('   - window.renderApp(): Manually trigger re-render');
console.log('   - To clear localStorage: localStorage.clear() then refresh');

// ==========================================
// END
// ==========================================
