import React, { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import PermissionScreen from './components/PermissionScreen'
import GuidanceScreen from './components/GuidanceScreen'
import './App.css'

function App() {
  const [screen, setScreen] = useState('welcome') // 'welcome', 'permission', 'guidance', 'complete'
  const [permissions, setPermissions] = useState(null)

  const handleGetStarted = () => {
    setScreen('permission')
  }

  const handleLearnMore = () => {
    // For now, just go to permission screen
    // Could be expanded to show a modal or info page
    setScreen('permission')
  }

  const handlePermissionContinue = (selectedPermissions) => {
    setPermissions(selectedPermissions)
    setScreen('guidance')
  }

  const handlePermissionBack = () => {
    setScreen('welcome')
  }

  const handleGuidanceComplete = () => {
    setScreen('complete')
  }

  return (
    <div className="app">
      {screen === 'welcome' && (
        <WelcomeScreen
          onGetStarted={handleGetStarted}
          onLearnMore={handleLearnMore}
        />
      )}
      {screen === 'permission' && (
        <PermissionScreen
          onContinue={handlePermissionContinue}
          onBack={handlePermissionBack}
        />
      )}
      {screen === 'guidance' && (
        <GuidanceScreen onComplete={handleGuidanceComplete} />
      )}
      {screen === 'complete' && (
        <div className="complete-screen">
          <div className="complete-content">
            <div className="success-icon">✓</div>
            <h1>Welcome to One Universe!</h1>
            <p>You're all set. Start exploring the universe of possibilities.</p>
            <button
              className="btn-primary"
              onClick={() => {
                setScreen('welcome')
                setPermissions(null)
              }}
            >
              Restart Journey
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

