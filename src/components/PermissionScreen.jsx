import React, { useState } from 'react'
import './PermissionScreen.css'

const PermissionScreen = ({ onContinue, onBack }) => {
  const [permissions, setPermissions] = useState({
    googleCalendar: false,
    youtubeHistory: false,
    deviceFocus: false,
    emotionInput: false
  })

  const permissionList = [
    {
      id: 'googleCalendar',
      icon: '📅',
      title: 'Google Calendar',
      description: 'Analyze my schedule to suggest focus blocks.',
      required: false
    },
    {
      id: 'youtubeHistory',
      icon: '📺',
      title: 'YouTube Learning History',
      description: 'Read topics from my watched videos (no private data).',
      required: false
    },
    {
      id: 'deviceFocus',
      icon: '💻',
      title: 'Device Focus Data',
      description: 'Measure active vs. idle time (local only).',
      required: false
    },
    {
      id: 'emotionInput',
      icon: '😊',
      title: 'Emotion Input',
      description: 'Allow text/voice mood detection.',
      required: false
    }
  ]

  const togglePermission = (id) => {
    // Don't allow toggling required permissions
    const permission = permissionList.find(p => p.id === id)
    if (permission && permission.required) {
      return
    }
    setPermissions(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="permission-screen">
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="permission-container">
        <div className="permission-header">
          <h2 className="permission-title">
            To personalize your Universe, we'll use a few tools — only with your consent.
          </h2>
        </div>

        <div className="permissions-list">
          {permissionList.map((permission) => (
            <div
              key={permission.id}
              className={`permission-card ${permissions[permission.id] ? 'enabled' : ''} ${permission.required ? 'required' : ''}`}
            >
              <div className="permission-icon">{permission.icon}</div>
              <div className="permission-content">
                <div className="permission-header-row">
                  <h3 className="permission-name">{permission.title}</h3>
                  {permission.required && (
                    <span className="required-badge">Required</span>
                  )}
                </div>
                <p className="permission-desc">{permission.description}</p>
              </div>
              <div className="toggle-container">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={permissions[permission.id]}
                    onChange={() => togglePermission(permission.id)}
                    disabled={permission.required}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="permission-footer">
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span>End-to-End Encrypted</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <span>Privacy First</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>GDPR Compliant</span>
            </div>
          </div>

          <div className="permission-actions">
            <button className="btn-secondary" onClick={onBack}>
              Back
            </button>
            <button className="btn-primary" onClick={() => onContinue(permissions)}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PermissionScreen

