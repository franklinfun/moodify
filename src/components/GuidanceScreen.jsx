import React, { useState } from 'react'
import './GuidanceScreen.css'

const GuidanceScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      id: 1,
      title: 'Welcome to One Universe',
      description: 'Your gateway to an interconnected digital experience across all platforms and devices.',
      icon: '🌌',
      features: [
        'Seamless cross-platform synchronization',
        'AI-powered personalization',
        'Secure cloud infrastructure'
      ]
    },
    {
      id: 2,
      title: 'Your Digital Identity',
      description: 'Create a unified profile that works everywhere. Your data, your control.',
      icon: '👤',
      features: [
        'Single sign-on across all services',
        'Privacy-first data management',
        'Customizable preferences'
      ]
    },
    {
      id: 3,
      title: 'Smart Recommendations',
      description: 'Our AI learns your preferences to deliver content and features tailored just for you.',
      icon: '🤖',
      features: [
        'Machine learning insights',
        'Predictive content delivery',
        'Adaptive user experience'
      ]
    },
    {
      id: 4,
      title: 'You\'re All Set!',
      description: 'Everything is configured. Start exploring the universe of possibilities.',
      icon: '🚀',
      features: [
        'Ready to explore',
        'All systems operational',
        'Welcome aboard!'
      ]
    }
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="guidance-screen">
      <div className="background-effects">
        <div className="grid-pattern"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="guidance-container">
        <div className="guidance-header">
          <div className="step-indicator">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                {index < currentStep && <span className="checkmark">✓</span>}
              </div>
            ))}
          </div>
          <button className="skip-button" onClick={handleSkip}>
            Skip Tour
          </button>
        </div>

        <div className="guidance-content">
          <div className="step-icon-container">
            <div className="step-icon-glow"></div>
            <div className="step-icon">{currentStepData.icon}</div>
          </div>

          <h2 className="step-title">{currentStepData.title}</h2>
          <p className="step-description">{currentStepData.description}</p>

          <div className="features-list">
            {currentStepData.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">✨</div>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="guidance-footer">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          <div className="guidance-actions">
            <button
              className="btn-nav btn-previous"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              ← Previous
            </button>
            <div className="step-counter">
              {currentStep + 1} / {steps.length}
            </div>
            <button className="btn-nav btn-next" onClick={handleNext}>
              {isLastStep ? 'Get Started →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>

      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>
    </div>
  )
}

export default GuidanceScreen

