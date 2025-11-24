import React from 'react'
import './WelcomeScreen.css'

const WelcomeScreen = ({ onGetStarted, onLearnMore }) => {
  return (
    <div className="welcome-screen">
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="stars"></div>
      </div>

      <div className="welcome-container">
        <div className="welcome-content">
          <div className="logo-section">
            <div className="planet-icon">🪐</div>
            <h1 className="logo-text">One Universe</h1>
            <p className="tagline">
              The AI that helps you master your focus and growth.
            </p>
          </div>

          <div className="welcome-actions">
            <button className="btn-primary btn-get-started" onClick={onGetStarted}>
              Get Started
            </button>
            <button className="btn-secondary btn-learn-more" onClick={onLearnMore}>
              Learn More
            </button>
          </div>
        </div>

        <div className="welcome-features">
          <div className="feature-preview">
            <div className="feature-icon">🎯</div>
            <span>Focus Mastery</span>
          </div>
          <div className="feature-preview">
            <div className="feature-icon">📈</div>
            <span>Growth Tracking</span>
          </div>
          <div className="feature-preview">
            <div className="feature-icon">🤖</div>
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen

