import React, { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import PermissionScreen from './components/PermissionScreen'
import AISetupScreen from './components/AISetupScreen'
import GuidanceScreen from './components/GuidanceScreen'
import Dashboard from './components/Dashboard'
import DataVaultScreen from './components/DataVaultScreen'
import './App.css'

function App() {
  const [screen, setScreen] = useState('welcome') // 'welcome', 'permission', 'ai-setup', 'guidance', 'complete', 'dashboard', 'data-vault'
  const [permissions, setPermissions] = useState(null)

  const handleGetStarted = () => {
    setScreen('permission')
  }

  const handleLearnMore = () => {
    // For now, just go to permission screen
    // Could be expanded to show a modal or info page
    setScreen('permission')
  }

  const handlePermissionContinue = (selectedPermissions, permissionResults) => {
    setPermissions(selectedPermissions)
    // Store permission results for later use
    if (permissionResults) {
      console.log('Permission results:', permissionResults)
    }
    setScreen('ai-setup')
  }

  const handlePermissionBack = () => {
    setScreen('welcome')
  }

  const handleAISetupComplete = () => {
    setScreen('guidance')
  }

  const handleGuidanceComplete = () => {
    setScreen('dashboard')
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
      {screen === 'ai-setup' && (
        <AISetupScreen onComplete={handleAISetupComplete} />
      )}
      {screen === 'guidance' && (
        <GuidanceScreen onComplete={handleGuidanceComplete} />
      )}
      {screen === 'dashboard' && (
        <Dashboard onNavigateToVault={() => setScreen('data-vault')} />
      )}
      {screen === 'data-vault' && (
        <DataVaultScreen 
          permissions={permissions}
          onBack={() => setScreen('dashboard')}
        />
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

