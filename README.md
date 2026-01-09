# 💬 Real-Time Chat Application

> A modern, feature-rich chat application built with **MERN Stack** (MongoDB, Express, React, Node.js) with real-time messaging capabilities.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Key Features Explained](#key-features-explained)
- [Project Architecture](#project-architecture)
- [Screenshots](#screenshots)

---

## ✨ Features

### Core Features
- ✅ **User Authentication** - Secure login/signup with password hashing
- ✅ **Real-Time Messaging** - Instant message delivery and updates
- ✅ **User Search** - Search and find users to chat with
- ✅ **Online Status** - See who is online
- ✅ **Message Delete** - Delete messages after sending
- ✅ **Clear Chat History** - Delete all messages with a user
- ✅ **Profile Management** - User profile with avatar support
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Theme Selection** - 4 beautiful themes (Midnight, Ocean, Forest, Wine)
- ✅ **User Avatar** - Gravatar support with fallback initials

### Advanced Features
- 🎨 Multiple theme options with gradient backgrounds
- 📱 Fully responsive mobile-first design
- 🔒 JWT-based authentication
- 📊 Redux state management
- ⚡ Real-time socket.io integration
- 🎯 Optimized performance with debouncing and caching

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Socket.io Client** - Real-time communication
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Socket.io** - WebSocket library
- **CORS** - Cross-origin handling

### Development Tools
- **Vite** - Frontend build tool
- **npm** - Package manager
- **Git** - Version control

---

## 📂 Project Structure

```
Chat Application/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx         # Main chat page
│   │   │   ├── Sidebar.jsx          # User list sidebar
│   │   │   ├── MessageContainer.jsx # Message display area
│   │   │   ├── Messages.jsx         # Message list
│   │   │   ├── Message.jsx          # Individual message
│   │   │   ├── Sendinput.jsx        # Message input
│   │   │   ├── OtherUsers.jsx       # Other users list
│   │   │   ├── OtherUser.jsx        # Single user item
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Signup page
│   │   │   ├── ThemeSelector.jsx    # Theme switcher
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   ├── hooks/
│   │   │   ├── useGetOtherUsers.js     # Fetch users hook
│   │   │   ├── useGetMessages.js       # Fetch messages hook
│   │   │   ├── useGetAuthUser.js       # Fetch auth user hook
│   │   │   ├── useThemeBackground.js   # Theme styling hook
│   │   │   └── useSocketio.js          # Socket.io hook
│   │   ├── redux/
│   │   │   ├── userSlice.js            # User state
│   │   │   ├── messageSlice.js         # Message state
│   │   │   ├── themeSlice.js           # Theme state
│   │   │   └── store.js                # Redux store
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js    # User logic
│   │   └── messageController.js # Message logic
│   ├── models/
│   │   ├── userModel.js         # User schema
│   │   ├── messageModel.js      # Message schema
│   │   └── conversationModel.js # Conversation schema
│   ├── routes/
│   │   ├── userRoute.js         # User endpoints
│   │   └── messageRoute.js      # Message endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── index.js                 # Server entry point
│   └── package.json
│
├── .gitignore
├── README.md
└── INTERVIEW_GUIDE.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "Chat Application"
```

#### 2. Backend Setup
```bash
cd Backend
npm install

# Create .env file
# Add these variables:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=8080

npm start
# Server runs on http://localhost:8080
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
# Add these variables:
# VITE_API_URL=http://localhost:8080

npm run dev
# App runs on http://localhost:5173
```

---

## 💻 Usage

### 1. User Registration
- Click "Sign Up"
- Enter Full Name, Username, Password, Gender
- Account created and ready to use

### 2. Login
- Enter Username and Password
- Access your chat dashboard

### 3. Start Chatting
- View list of online users in sidebar
- Click any user to open chat
- Type message and press Send or click Send button
- Messages appear in real-time

### 4. Search Users
- Use search bar in sidebar
- Find users by name or username
- Click to start conversation

### 5. Manage Chats
- Delete individual messages (hover and click delete icon)
- Delete all messages with a user (click trash icon in header)
- Switch between users instantly

### 6. Change Theme
- Click palette icon (bottom right)
- Choose from 4 themes:
  - 🌙 Midnight (Blue/Indigo)
  - 🌊 Ocean (Blue/Cyan)
  - 🌲 Forest (Green/Emerald)
  - 🍷 Wine (Red/Rose)

---

## 🎯 Key Features Explained

### Real-Time Messaging
- Uses **Socket.io** for bidirectional communication
- Messages delivered instantly without page refresh
- Automatic scroll to latest message

### Authentication System
```
User Registration → Password Hashing → MongoDB Storage
         ↓
    Login Page
         ↓
   JWT Token Generation
         ↓
   Protected Routes
         ↓
   Access Chat Dashboard
```

### State Management (Redux)
```
User Slice
├── authUser - Current logged-in user
├── otherUsers - List of all users
├── selectedUser - Currently chatting user
└── searchInput - Search query

Message Slice
├── messages - Current conversation messages
└── Loading state

Theme Slice
└── currentTheme - Selected theme
```

### Responsive Design
- **Mobile (320px+)** - Full screen sidebar with toggle
- **Tablet (768px+)** - Optimized layout
- **Desktop (1024px+)** - Side-by-side layout

---

## 🏗 Project Architecture

### Request-Response Flow
```
Frontend (React)
     ↓
Redux (State Management)
     ↓
Axios (HTTP Client)
     ↓
Backend (Express Server)
     ↓
Controllers (Business Logic)
     ↓
Models (Database Schema)
     ↓
MongoDB (Data Storage)
```

### Real-Time Communication Flow
```
User A Sends Message
     ↓
Socket.io Event Emitted
     ↓
Backend Receives & Saves to DB
     ↓
Backend Broadcasts to User B
     ↓
User B Socket Listener Triggers
     ↓
React Component Updates
     ↓
UI Re-renders with New Message
```

### Authentication Flow
```
1. User submits credentials
2. Backend hashes password
3. Compare with stored hash
4. JWT token generated
5. Token stored in cookies
6. Used for protected routes
```

---

## 📱 Responsive Features

### Mobile Optimization
- ✅ Touch-friendly buttons and inputs
- ✅ Collapsible sidebar with toggle
- ✅ Optimized font sizes
- ✅ Proper spacing for small screens
- ✅ Smooth animations on mobile

### Desktop Features
- ✅ Side-by-side layout (Sidebar + Chat)
- ✅ Hover effects on messages
- ✅ Full-width optimization
- ✅ Theme switcher (bottom right)

---

## 🔒 Security Features

- **Password Hashing** - bcryptjs with salt rounds
- **JWT Authentication** - Token-based auth
- **CORS Protection** - Cross-origin request handling
- **Protected Routes** - Only authenticated users can access
- **HTTP Only Cookies** - Secure token storage

---

## 📊 Database Models

### User Model
```javascript
{
  fullName: String,
  username: String (unique),
  password: String (hashed),
  gender: String,
  ProfilePhoto: String (URL),
  createdAt: Date
}
```

### Message Model
```javascript
{
  senderId: ObjectId (User),
  receiverId: ObjectId (User),
  message: String,
  createdAt: Date
}
```

### Conversation Model
```javascript
{
  participants: [ObjectId, ObjectId],
  messages: [ObjectId],
  lastMessage: String,
  updatedAt: Date
}
```

---

## 🎨 UI/UX Highlights

- Modern gradient backgrounds
- Smooth animations and transitions
- Color-coded messages (sent vs received)
- Online status indicators
- User avatars with fallbacks
- Loading states and spinners
- Toast notifications for feedback
- Dark theme for reduced eye strain

---

## 📈 Performance Optimizations

- Debounced search function
- Lazy loading of messages
- Redux caching
- Optimized re-renders
- Image compression for avatars
- Async/await for better control flow

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [your-github](https://github.com)
- LinkedIn: [your-linkedin](https://linkedin.com)
- Email: your.email@example.com

---

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

## 🙏 Acknowledgments

- React.js community
- Express.js documentation
- Tailwind CSS team
- Socket.io developers
- All contributors

---

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.io Guide](https://socket.io/docs)
- [Redux Toolkit](https://redux-toolkit.js.org)

---

**Last Updated:** January 9, 2026

Made with ❤️ by [Your Name]
