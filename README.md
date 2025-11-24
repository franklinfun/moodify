# One Universe - React Application

A modern, futuristic React application featuring beautiful onboarding screens, AI-powered dashboard, and comprehensive data management with a trustworthy, clear design.

## 🌌 Overview

One Universe is an AI-powered personal growth and focus management platform that helps users master their focus and growth through intelligent insights, mood tracking, and learning analytics.

## ✨ Features

### 1. Welcome Screen
- Beautiful landing page with animated planet logo
- Tagline: "The AI that helps you master your focus and growth."
- Call-to-action buttons: [Get Started] and [Learn More]
- Feature previews (Focus Mastery, Growth Tracking, AI-Powered)
- Animated background with gradient orbs and stars

### 2. Permission Screen (Grant Access)
- **Toggle-based permission system** - Each permission can be turned ON/OFF individually
- **OAuth Integration**:
  - Google Calendar OAuth flow
  - YouTube Learning History OAuth flow
- **Native Permission Dialogs**:
  - Device Focus Data (Idle Detection API)
  - Emotion Input (Microphone/Text input)
- **Real-time Status Indicators**: Granted ✓, Denied ✗, Processing ⏳
- **Trust Indicators**: End-to-End Encrypted, Privacy First, GDPR Compliant
- **Loading States**: Animated spinners during OAuth flows
- **Error Handling**: Clear error messages for failed permissions

### 3. AI Setup Screen
- **Universe Map Animation**: Animated particles forming around user avatar
- **Calibration Process**: "Calibrating your success pattern…"
- **Four-Phase Analysis**:
  - 🎯 Mood - Analyzes mood patterns
  - 🎯 Focus - Analyzes focus patterns
  - ⚡ Energy - Analyzes energy patterns
  - 🚀 Goals - Analyzes goal patterns
- **Progress Visualization**: Animated progress bar with phase-specific colors
- **Auto-progression**: Automatically moves through all phases

### 4. Guidance Screen
- **Interactive Onboarding Tour**: Step-by-step guide through features
- **Progress Indicators**: Visual step dots with completion checkmarks
- **Feature Highlights**: Key features explained with icons
- **Animated Particles**: Floating particles in background
- **Skip Option**: Users can skip the tour if desired

### 5. Dashboard (Post-Setup)
- **Daily Emotion Ring**: Color-coded mood gauge (0-100 scale)
  - Green (80+): Great
  - Blue (60-79): Good
  - Orange (40-59): Okay
  - Red (<40): Low
- **Focus Metrics**:
  - Focus Score Today (with progress bar)
  - Distraction Time (with trend indicators)
  - Learning Topics (with individual progress bars)
- **AI Coach Panel**:
  - Real-time insights and suggestions
  - Interactive chat interface
  - Message history with timestamps
- **Navigation**: Quick access to Data Vault

### 6. Insight Pop-ups
- **AI-Powered Notifications**: Automatically appear when AI detects useful information
- **Three Types**:
  - 🧠 **Achievement**: Focus improvements, milestones
  - ❤️ **Wellness**: Health suggestions, break reminders
  - 💡 **Progress**: Skill level-ups, learning achievements
- **Auto-dismiss**: Configurable duration (5-7 seconds)
- **Manual Dismiss**: Close button with smooth animations
- **Stacking Support**: Multiple insights can appear simultaneously

### 7. Data Vault Screen
- **Transparency Dashboard**: Complete overview of all connected services
- **Service Management**:
  - Connection status for each service
  - Last sync timestamps
  - Data size information
  - Sync status indicators (Synced, Syncing, Error)
- **Data Controls**:
  - [View Data] - View stored data for each service
  - [Export Data] - Export data in standard formats
  - [Disconnect] - Disconnect individual services
  - [Delete All] - Delete all data (with confirmation)
- **Statistics**: Connected services count, total data stored, encryption status
- **Tooltip**: "You control every byte in your Universe."

## 🎨 Design Philosophy

- **Trustworthy**: Clear privacy indicators, transparent permission requests, full data control
- **Futuristic**: Modern gradients, glassmorphism effects, smooth animations, particle effects
- **Clear**: Intuitive navigation, easy-to-understand content, visual feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/franklinfun/moodify.git
cd moodify
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure OAuth (Optional)**:
   - Create a `.env` file in the root directory
   - Add your Google OAuth Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```
   **Note**: Vite uses `VITE_` prefix for environment variables (not `REACT_APP_`)
   - Get your Client ID from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Enable the following APIs in your Google Cloud project:
     - Google Calendar API
     - YouTube Data API v3

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
moodify/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.jsx
│   │   ├── WelcomeScreen.css
│   │   ├── PermissionScreen.jsx
│   │   ├── PermissionScreen.css
│   │   ├── AISetupScreen.jsx
│   │   ├── AISetupScreen.css
│   │   ├── GuidanceScreen.jsx
│   │   ├── GuidanceScreen.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── InsightPopup.jsx
│   │   ├── InsightPopup.css
│   │   ├── InsightManager.jsx
│   │   ├── DataVaultScreen.jsx
│   │   └── DataVaultScreen.css
│   ├── services/
│   │   └── permissionService.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## 🔐 Permissions

The app requests the following permissions (all optional):

1. **Google Calendar** 📅
   - OAuth flow to analyze schedule and suggest focus blocks
   - Scope: `https://www.googleapis.com/auth/calendar.readonly`

2. **YouTube Learning History** 📺
   - OAuth flow to read topics from watched videos (no private data)
   - Scope: `https://www.googleapis.com/auth/youtube.readonly`

3. **Device Focus Data** 💻
   - Native browser API to measure active vs. idle time (local only)
   - Uses Idle Detection API (with fallback for unsupported browsers)

4. **Emotion Input** 😊
   - Microphone permission for voice mood detection
   - Text input fallback if microphone is unavailable or denied

All permissions can be toggled ON/OFF individually. Users have full control over their data.

## 🎯 User Flow

1. **Welcome Screen** → User clicks "Get Started" or "Learn More"
2. **Permission Screen** → User toggles permissions and clicks "Grant Permissions"
3. **AI Setup Screen** → AI calibrates through Mood → Focus → Energy → Goals
4. **Guidance Screen** → Interactive onboarding tour (can be skipped)
5. **Dashboard** → Main interface with metrics, AI coach, and insights
6. **Data Vault** → Accessible from Dashboard for data management

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with modern features:
  - CSS Variables for theming
  - Glassmorphism effects (backdrop-filter)
  - CSS Animations and Transitions
  - Gradient backgrounds
  - Custom scrollbars

## 🎨 Customization

### Color Scheme

The design uses CSS variables defined in `src/index.css` for easy theming:

```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--dark-bg: #0a0e27;
--dark-surface: #1a1f3a;
--dark-surface-elevated: #252b4a;
--accent-blue: #4f9cf9;
--accent-purple: #a855f7;
--accent-cyan: #06b6d4;
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
```

Modify these variables to customize the color scheme throughout the app.

### Component Styling

Each component has its own CSS file for isolated styling. Components use:
- Glassmorphism effects for modern UI
- Smooth animations and transitions
- Responsive design patterns
- Consistent spacing and typography

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

All components adapt their layout and sizing for optimal viewing on any device.

## 🔒 Privacy & Security

- **End-to-End Encryption**: All data is encrypted
- **Privacy First**: Users control all permissions
- **GDPR Compliant**: Full data transparency and control
- **Local Storage**: Device focus data stored locally only
- **OAuth Best Practices**: Secure OAuth 2.0 flows
- **Data Export**: Users can export their data at any time
- **Data Deletion**: Users can delete all data with confirmation

## 🚧 Future Enhancements

- Real-time data synchronization
- Advanced AI insights and recommendations
- Customizable dashboard widgets
- Integration with more services
- Mobile app version
- Offline mode support

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on the GitHub repository.

---

**Built with ❤️ for mastering focus and growth**
