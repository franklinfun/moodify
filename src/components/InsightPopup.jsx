import React, { useEffect, useState } from 'react'
import './InsightPopup.css'

const InsightPopup = ({ insight, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10)

    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
    }, 300) // Match CSS transition duration
  }

  const getInsightConfig = () => {
    switch (insight.type) {
      case 'achievement':
        return {
          icon: '🧠',
          gradient: 'linear-gradient(135deg, #4f9cf9 0%, #a855f7 100%)',
          borderColor: '#4f9cf9',
          glowColor: 'rgba(79, 156, 249, 0.4)'
        }
      case 'wellness':
        return {
          icon: '❤️',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderColor: '#f5576c',
          glowColor: 'rgba(245, 87, 108, 0.4)'
        }
      case 'progress':
        return {
          icon: '💡',
          gradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
          borderColor: '#06b6d4',
          glowColor: 'rgba(6, 182, 212, 0.4)'
        }
      default:
        return {
          icon: '✨',
          gradient: 'linear-gradient(135deg, #4f9cf9 0%, #a855f7 100%)',
          borderColor: '#4f9cf9',
          glowColor: 'rgba(79, 156, 249, 0.4)'
        }
    }
  }

  const config = getInsightConfig()

  return (
    <div
      className={`insight-popup ${isVisible && !isExiting ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`}
      style={{
        '--gradient': config.gradient,
        '--border-color': config.borderColor,
        '--glow-color': config.glowColor
      }}
    >
      <div className="insight-content">
        <div className="insight-icon">{config.icon}</div>
        <div className="insight-text">
          <p className="insight-message">{insight.message}</p>
        </div>
        <button className="insight-close" onClick={handleClose}>
          ×
        </button>
      </div>
      <div className="insight-progress-bar">
        <div 
          className="insight-progress-fill"
          style={{ 
            animationDuration: `${duration}ms`,
            background: config.gradient
          }}
        ></div>
      </div>
    </div>
  )
}

export default InsightPopup

