import React, { useState, useEffect } from 'react'
import './AISetupScreen.css'

const AISetupScreen = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  const phases = [
    { id: 'mood', label: 'Mood', icon: '😊', color: '#f093fb' },
    { id: 'focus', label: 'Focus', icon: '🎯', color: '#4f9cf9' },
    { id: 'energy', label: 'Energy', icon: '⚡', color: '#06b6d4' },
    { id: 'goals', label: 'Goals', icon: '🚀', color: '#a855f7' }
  ]

  useEffect(() => {
    // Simulate calibration process
    const phaseDuration = 2000 // 2 seconds per phase
    const progressInterval = 50 // Update progress every 50ms
    const progressStep = 100 / (phaseDuration / progressInterval) // Calculate step size

    let currentProgress = 0
    const progressTimer = setInterval(() => {
      currentProgress += progressStep
      
      if (currentProgress >= 100) {
        currentProgress = 100
        setProgress(100)
        
        // Move to next phase
        if (currentPhase < phases.length - 1) {
          setTimeout(() => {
            setCurrentPhase(prev => prev + 1)
            setProgress(0)
            currentProgress = 0
          }, 500)
        } else {
          // All phases complete
          clearInterval(progressTimer)
          setTimeout(() => {
            onComplete()
          }, 1000)
        }
      } else {
        setProgress(currentProgress)
      }
    }, progressInterval)

    return () => clearInterval(progressTimer)
  }, [currentPhase, phases.length, onComplete])

  const currentPhaseData = phases[currentPhase]
  const overallProgress = ((currentPhase + progress / 100) / phases.length) * 100

  return (
    <div className="ai-setup-screen">
      <div className="background-effects">
        <div className="universe-grid"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="setup-container">
        <div className="avatar-section">
          <div className="avatar-container">
            <div className="avatar-glow" style={{ '--phase-color': currentPhaseData.color }}></div>
            <div className="avatar-ring ring-1" style={{ '--phase-color': currentPhaseData.color }}></div>
            <div className="avatar-ring ring-2" style={{ '--phase-color': currentPhaseData.color }}></div>
            <div className="avatar-ring ring-3" style={{ '--phase-color': currentPhaseData.color }}></div>
            <div className="avatar-image">
              {/* User photo/avatar would go here */}
              <div className="avatar-placeholder">👤</div>
            </div>
            <div className="universe-particles">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    '--index': i,
                    '--phase-color': currentPhaseData.color,
                    '--delay': i * 0.1
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="setup-content">
          <h1 className="setup-title">Calibrating your success pattern…</h1>
          
          <div className="phases-container">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className={`phase-item ${index === currentPhase ? 'active' : ''} ${index < currentPhase ? 'completed' : ''}`}
                style={{ '--phase-color': phase.color }}
              >
                <div className="phase-icon">{phase.icon}</div>
                <div className="phase-label">{phase.label}</div>
                {index < currentPhase && (
                  <div className="phase-check">✓</div>
                )}
                {index === currentPhase && (
                  <div className="phase-loader">
                    <div className="loader-dot"></div>
                    <div className="loader-dot"></div>
                    <div className="loader-dot"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="progress-section">
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ 
                  width: `${overallProgress}%`,
                  background: `linear-gradient(90deg, ${phases[0].color} 0%, ${phases[1].color} 33%, ${phases[2].color} 66%, ${phases[3].color} 100%)`
                }}
              >
                <div className="progress-shine"></div>
              </div>
            </div>
            <div className="progress-text">
              {currentPhase < phases.length ? (
                <>
                  Analyzing <span style={{ color: currentPhaseData.color }}>{currentPhaseData.label}</span> patterns...
                </>
              ) : (
                'Setup complete!'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AISetupScreen

