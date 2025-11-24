import React, { useState, useEffect } from 'react'
import InsightManager from './InsightManager'
import './Dashboard.css'

const Dashboard = ({ onNavigateToVault }) => {
  const [moodValue, setMoodValue] = useState(75) // 0-100 scale
  const [focusScore, setFocusScore] = useState(82)
  const [distractionTime, setDistractionTime] = useState(32)
  const [insights, setInsights] = useState([])

  const learningTopics = [
    { name: 'React JS', progress: 85, color: '#4f9cf9' },
    { name: 'API Design', progress: 72, color: '#a855f7' }
  ]

  const coachMessages = [
    {
      id: 1,
      text: "You seem most alert at 8 AM. Let's code then.",
      type: 'insight',
      timestamp: '2 min ago'
    },
    {
      id: 2,
      text: "Try short React practice — 5 min challenge.",
      type: 'suggestion',
      timestamp: '5 min ago'
    }
  ]

  // Simulate AI detecting insights
  useEffect(() => {
    // Show initial insights after a delay
    const timers = []

    // Achievement insight - Focus improvement
    timers.push(
      setTimeout(() => {
        setInsights(prev => [...prev, {
          id: 'focus-improvement',
          type: 'achievement',
          message: "You've improved focus by 14% this week!",
          duration: 6000
        }])
      }, 3000)
    )

    // Wellness insight - Tired detection
    timers.push(
      setTimeout(() => {
        setInsights(prev => [...prev, {
          id: 'wellness-tired',
          type: 'wellness',
          message: "You look tired. Take 3 deep breaths before continuing?",
          duration: 7000
        }])
      }, 8000)
    )

    // Progress insight - Skill level up
    timers.push(
      setTimeout(() => {
        setInsights(prev => [...prev, {
          id: 'skill-progress',
          type: 'progress',
          message: "Your top skill progress: JavaScript — Level 2 → 3.",
          duration: 6000
        }])
      }, 13000)
    )

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  // Calculate mood color based on value
  const getMoodColor = (value) => {
    if (value >= 80) return '#10b981' // Green - Great
    if (value >= 60) return '#4f9cf9' // Blue - Good
    if (value >= 40) return '#f59e0b' // Orange - Okay
    return '#ef4444' // Red - Low
  }

  const getMoodLabel = (value) => {
    if (value >= 80) return 'Great'
    if (value >= 60) return 'Good'
    if (value >= 40) return 'Okay'
    return 'Low'
  }

  const moodColor = getMoodColor(moodValue)
  const moodLabel = getMoodLabel(moodValue)

  // Calculate circumference for emotion ring
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (moodValue / 100) * circumference

  return (
    <div className="dashboard">
      <InsightManager insights={insights} />
      {onNavigateToVault && (
        <div className="dashboard-header-actions">
          <button 
            className="vault-nav-btn"
            onClick={onNavigateToVault}
            title="View Data Vault"
          >
            🔒 Data Vault
          </button>
        </div>
      )}
      <div className="background-effects">
        <div className="dashboard-grid"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="dashboard-container">
        {/* Top: Daily Emotion Ring */}
        <div className="emotion-ring-section">
          <div className="emotion-ring-container">
            <h2 className="section-title">Today's Mood</h2>
            <div className="emotion-ring-wrapper">
              <svg className="emotion-ring" width="160" height="160">
                <circle
                  className="emotion-ring-bg"
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="var(--dark-surface-elevated)"
                  strokeWidth="12"
                />
                <circle
                  className="emotion-ring-progress"
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={moodColor}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform="rotate(-90 80 80)"
                  style={{
                    filter: `drop-shadow(0 0 10px ${moodColor})`
                  }}
                />
              </svg>
              <div className="emotion-ring-content">
                <div className="mood-value" style={{ color: moodColor }}>
                  {moodValue}
                </div>
                <div className="mood-label">{moodLabel}</div>
              </div>
            </div>
            <div className="mood-indicators">
              <div className="mood-indicator" style={{ '--color': '#ef4444' }}>
                <span>Low</span>
              </div>
              <div className="mood-indicator" style={{ '--color': '#f59e0b' }}>
                <span>Okay</span>
              </div>
              <div className="mood-indicator" style={{ '--color': '#4f9cf9' }}>
                <span>Good</span>
              </div>
              <div className="mood-indicator" style={{ '--color': '#10b981' }}>
                <span>Great</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Metrics */}
        <div className="metrics-section">
          <div className="metric-card focus-score">
            <div className="metric-header">
              <span className="metric-icon">🎯</span>
              <h3 className="metric-title">Focus Score Today</h3>
            </div>
            <div className="metric-value" style={{ color: '#4f9cf9' }}>
              {focusScore}%
            </div>
            <div className="metric-progress">
              <div 
                className="metric-progress-bar"
                style={{ 
                  width: `${focusScore}%`,
                  background: 'linear-gradient(90deg, #4f9cf9 0%, #a855f7 100%)'
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card distraction-time">
            <div className="metric-header">
              <span className="metric-icon">⏱️</span>
              <h3 className="metric-title">Distraction Time</h3>
            </div>
            <div className="metric-value" style={{ color: '#f59e0b' }}>
              {distractionTime} min
            </div>
            <div className="metric-trend">
              <span className="trend-icon">↓</span>
              <span className="trend-text">12% less than yesterday</span>
            </div>
          </div>

          <div className="metric-card learning-topics">
            <div className="metric-header">
              <span className="metric-icon">📚</span>
              <h3 className="metric-title">Learning Topics</h3>
            </div>
            <div className="topics-list">
              {learningTopics.map((topic, index) => (
                <div key={index} className="topic-item">
                  <div className="topic-header">
                    <span className="topic-name">{topic.name}</span>
                    <span className="topic-progress">{topic.progress}%</span>
                  </div>
                  <div className="topic-progress-bar">
                    <div
                      className="topic-progress-fill"
                      style={{
                        width: `${topic.progress}%`,
                        background: topic.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: AI Coach */}
        <div className="coach-panel">
          <div className="coach-header">
            <div className="coach-avatar">🤖</div>
            <div className="coach-info">
              <h3 className="coach-title">AI Coach</h3>
              <span className="coach-status">Online</span>
            </div>
          </div>
          <div className="coach-messages">
            {coachMessages.map((message) => (
              <div
                key={message.id}
                className={`coach-message ${message.type}`}
              >
                <div className="message-content">{message.text}</div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            ))}
          </div>
          <div className="coach-input-area">
            <input
              type="text"
              placeholder="Ask your AI coach..."
              className="coach-input"
            />
            <button className="coach-send-btn">→</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

