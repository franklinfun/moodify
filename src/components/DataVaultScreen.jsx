import React, { useState } from 'react'
import './DataVaultScreen.css'

const DataVaultScreen = ({ permissions, onBack }) => {
  const [selectedService, setSelectedService] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Mock data - in real app, this would come from props or API
  const services = [
    {
      id: 'googleCalendar',
      name: 'Google Calendar',
      icon: '📅',
      connected: permissions?.googleCalendar || false,
      lastSync: '2 hours ago',
      dataSize: '1.2 MB',
      syncStatus: 'synced',
      description: 'Schedule and focus block data'
    },
    {
      id: 'youtubeHistory',
      name: 'YouTube Learning History',
      icon: '📺',
      connected: permissions?.youtubeHistory || false,
      lastSync: '5 minutes ago',
      dataSize: '856 KB',
      syncStatus: 'syncing',
      description: 'Learning topics and video metadata'
    },
    {
      id: 'deviceFocus',
      name: 'Device Focus Data',
      icon: '💻',
      connected: permissions?.deviceFocus || false,
      lastSync: 'Just now',
      dataSize: '234 KB',
      syncStatus: 'synced',
      description: 'Active vs idle time patterns (local only)'
    },
    {
      id: 'emotionInput',
      name: 'Emotion Input',
      icon: '😊',
      connected: permissions?.emotionInput || false,
      lastSync: '1 hour ago',
      dataSize: '128 KB',
      syncStatus: 'synced',
      description: 'Mood detection and emotional patterns'
    }
  ]

  const connectedServices = services.filter(s => s.connected)
  const totalDataSize = connectedServices.reduce((sum, s) => {
    const size = parseFloat(s.dataSize)
    return sum + (isNaN(size) ? 0 : size)
  }, 0).toFixed(2)

  const handleViewData = (serviceId) => {
    setSelectedService(serviceId)
    // In real app, this would open a modal or navigate to data view
    console.log('View data for:', serviceId)
  }

  const handleExportData = (serviceId) => {
    // In real app, this would trigger data export
    console.log('Export data for:', serviceId)
    alert(`Exporting data for ${services.find(s => s.id === serviceId)?.name}...`)
  }

  const handleDisconnect = (serviceId) => {
    // In real app, this would disconnect the service
    console.log('Disconnect:', serviceId)
    alert(`Disconnecting ${services.find(s => s.id === serviceId)?.name}...`)
  }

  const handleDeleteAll = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDeleteAll = () => {
    // In real app, this would delete all data
    console.log('Delete all data')
    alert('All data has been deleted.')
    setShowDeleteConfirm(false)
  }

  const getSyncStatusIcon = (status) => {
    switch (status) {
      case 'synced':
        return '✓'
      case 'syncing':
        return '⟳'
      case 'error':
        return '⚠'
      default:
        return '○'
    }
  }

  const getSyncStatusColor = (status) => {
    switch (status) {
      case 'synced':
        return '#10b981'
      case 'syncing':
        return '#4f9cf9'
      case 'error':
        return '#ef4444'
      default:
        return '#b8bcc8'
    }
  }

  return (
    <div className="data-vault-screen">
      <div className="background-effects">
        <div className="vault-grid"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="vault-container">
        <div className="vault-header">
          <div className="header-content">
            <h1 className="vault-title">Data Vault</h1>
            <p className="vault-subtitle">You control every byte in your Universe.</p>
          </div>
          {onBack && (
            <button className="back-button" onClick={onBack}>
              ← Back
            </button>
          )}
        </div>

        <div className="vault-stats">
          <div className="stat-card">
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <div className="stat-value">{connectedServices.length}</div>
              <div className="stat-label">Connected Services</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💾</div>
            <div className="stat-content">
              <div className="stat-value">{totalDataSize} MB</div>
              <div className="stat-label">Total Data Stored</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-content">
              <div className="stat-value">100%</div>
              <div className="stat-label">Encrypted</div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2 className="section-title">Connected Services</h2>
          <div className="services-list">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-card ${service.connected ? 'connected' : 'disconnected'} ${selectedService === service.id ? 'selected' : ''}`}
              >
                <div className="service-header">
                  <div className="service-info">
                    <div className="service-icon">{service.icon}</div>
                    <div className="service-details">
                      <h3 className="service-name">{service.name}</h3>
                      <p className="service-description">{service.description}</p>
                    </div>
                  </div>
                  <div className="service-status">
                    {service.connected ? (
                      <div className="status-indicator">
                        <span
                          className="sync-icon"
                          style={{ color: getSyncStatusColor(service.syncStatus) }}
                        >
                          {getSyncStatusIcon(service.syncStatus)}
                        </span>
                        <span className="sync-text">{service.lastSync}</span>
                      </div>
                    ) : (
                      <span className="disconnected-badge">Not Connected</span>
                    )}
                  </div>
                </div>

                {service.connected && (
                  <>
                    <div className="service-meta">
                      <span className="meta-item">
                        <span className="meta-label">Data Size:</span>
                        <span className="meta-value">{service.dataSize}</span>
                      </span>
                      <span className="meta-item">
                        <span className="meta-label">Last Sync:</span>
                        <span className="meta-value">{service.lastSync}</span>
                      </span>
                    </div>

                    <div className="service-actions">
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewData(service.id)}
                      >
                        View Data
                      </button>
                      <button
                        className="action-btn export-btn"
                        onClick={() => handleExportData(service.id)}
                      >
                        Export Data
                      </button>
                      <button
                        className="action-btn disconnect-btn"
                        onClick={() => handleDisconnect(service.id)}
                      >
                        Disconnect
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="vault-actions">
          <div className="tooltip-container">
            <div className="tooltip">
              <span className="tooltip-icon">💡</span>
              <span className="tooltip-text">You control every byte in your Universe.</span>
            </div>
          </div>
          <button
            className="danger-btn delete-all-btn"
            onClick={handleDeleteAll}
          >
            Delete All Data
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="confirm-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">⚠️</div>
            <h3 className="modal-title">Delete All Data?</h3>
            <p className="modal-message">
              This action cannot be undone. All your data will be permanently deleted from your Universe.
            </p>
            <div className="modal-actions">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn confirm-btn"
                onClick={confirmDeleteAll}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataVaultScreen

