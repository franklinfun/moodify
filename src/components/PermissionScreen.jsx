import React, { useState } from 'react'
import { grantPermissions } from '../services/permissionService'
import './PermissionScreen.css'

const PermissionScreen = ({ onContinue, onBack }) => {
  const [permissions, setPermissions] = useState({
    googleCalendar: false,
    youtubeHistory: false,
    deviceFocus: false,
    emotionInput: false
  })

  const [permissionStatus, setPermissionStatus] = useState({
    googleCalendar: null,
    youtubeHistory: null,
    deviceFocus: null,
    emotionInput: null
  })

  const [isGranting, setIsGranting] = useState(false)
  const [grantError, setGrantError] = useState(null)

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
    // Reset status when toggling
    setPermissionStatus(prev => ({
      ...prev,
      [id]: null
    }))
  }

  const handleGrantPermissions = async () => {
    // Check if at least one permission is selected
    const hasSelectedPermissions = Object.values(permissions).some(p => p === true)
    
    if (!hasSelectedPermissions) {
      setGrantError('Please select at least one permission to continue.')
      return
    }

    setIsGranting(true)
    setGrantError(null)

    try {
      const result = await grantPermissions(permissions)
      
      // Update permission status
      const newStatus = {}
      Object.keys(permissions).forEach(key => {
        if (permissions[key]) {
          newStatus[key] = result.results[key]?.granted ? 'granted' : 'denied'
        } else {
          newStatus[key] = null
        }
      })
      setPermissionStatus(newStatus)

      // Check if all selected permissions were granted
      if (result.allGranted) {
        // All permissions granted, proceed to next screen
        setTimeout(() => {
          onContinue(permissions, result.results)
        }, 500)
      } else {
        // Some permissions failed
        const failedPermissions = Object.entries(result.results)
          .filter(([key, value]) => permissions[key] && !value.granted && !value.skipped)
          .map(([key]) => permissionList.find(p => p.id === key)?.title)
        
        setGrantError(
          `Some permissions could not be granted: ${failedPermissions.join(', ')}. You can continue anyway or try again.`
        )
        setIsGranting(false)
      }
    } catch (error) {
      console.error('Error granting permissions:', error)
      setGrantError('An error occurred while granting permissions. Please try again.')
      setIsGranting(false)
    }
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
          {permissionList.map((permission) => {
            const status = permissionStatus[permission.id]
            const isEnabled = permissions[permission.id]
            const isProcessing = isGranting && isEnabled && status === null
            
            return (
              <div
                key={permission.id}
                className={`permission-card ${isEnabled ? 'enabled' : ''} ${permission.required ? 'required' : ''} ${status === 'granted' ? 'granted' : ''} ${status === 'denied' ? 'denied' : ''}`}
              >
                <div className="permission-icon">{permission.icon}</div>
                <div className="permission-content">
                  <div className="permission-header-row">
                    <h3 className="permission-name">{permission.title}</h3>
                    {permission.required && (
                      <span className="required-badge">Required</span>
                    )}
                    {status === 'granted' && (
                      <span className="status-badge granted-badge">✓ Granted</span>
                    )}
                    {status === 'denied' && (
                      <span className="status-badge denied-badge">✗ Denied</span>
                    )}
                    {isProcessing && (
                      <span className="status-badge processing-badge">⏳ Processing...</span>
                    )}
                  </div>
                  <p className="permission-desc">{permission.description}</p>
                </div>
                <div className="toggle-container">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => togglePermission(permission.id)}
                      disabled={permission.required || isGranting}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            )
          })}
        </div>

        {grantError && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{grantError}</span>
          </div>
        )}

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
            <button 
              className="btn-secondary" 
              onClick={onBack}
              disabled={isGranting}
            >
              Back
            </button>
            <button 
              className="btn-primary" 
              onClick={handleGrantPermissions}
              disabled={isGranting}
            >
              {isGranting ? (
                <>
                  <span className="spinner"></span>
                  Granting Permissions...
                </>
              ) : (
                'Grant Permissions'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PermissionScreen

