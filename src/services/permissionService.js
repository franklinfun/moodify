/**
 * Permission Service
 * Handles OAuth flows and native permission dialogs
 */

// Google OAuth Configuration
// Vite uses import.meta.env instead of process.env
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'
const GOOGLE_SCOPES = {
  calendar: 'https://www.googleapis.com/auth/calendar.readonly',
  youtube: 'https://www.googleapis.com/auth/youtube.readonly'
}

/**
 * Initiate Google Calendar OAuth flow
 */
export const requestGoogleCalendarPermission = async () => {
  return new Promise((resolve, reject) => {
    try {
      // Check if gapi is loaded (Google API client)
      if (typeof window !== 'undefined' && typeof window.gapi === 'undefined') {
        // Load Google API client
        loadGoogleAPI().then(() => {
          initiateCalendarOAuth(resolve, reject)
        }).catch(reject)
      } else if (typeof window !== 'undefined' && window.gapi) {
        initiateCalendarOAuth(resolve, reject)
      } else {
        // Fallback if window is not available
        openOAuthWindow('calendar', resolve, reject)
      }
    } catch (error) {
      console.error('Google Calendar OAuth error:', error)
      // Fallback: Open OAuth in new window
      openOAuthWindow('calendar', resolve, reject)
    }
  })
}

/**
 * Initiate YouTube OAuth flow
 */
export const requestYouTubePermission = async () => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window !== 'undefined' && typeof window.gapi === 'undefined') {
        loadGoogleAPI().then(() => {
          initiateYouTubeOAuth(resolve, reject)
        }).catch(reject)
      } else if (typeof window !== 'undefined' && window.gapi) {
        initiateYouTubeOAuth(resolve, reject)
      } else {
        // Fallback if window is not available
        openOAuthWindow('youtube', resolve, reject)
      }
    } catch (error) {
      console.error('YouTube OAuth error:', error)
      // Fallback: Open OAuth in new window
      openOAuthWindow('youtube', resolve, reject)
    }
  })
}

/**
 * Request device focus data permission (native browser API)
 */
export const requestDeviceFocusPermission = async () => {
  return new Promise((resolve, reject) => {
    // Check if Idle Detection API is available
    if (typeof window !== 'undefined' && 'IdleDetector' in window) {
      IdleDetector.requestPermission()
        .then((status) => {
          if (status === 'granted') {
            resolve({ granted: true, status })
          } else {
            reject({ granted: false, status, error: 'Permission denied' })
          }
        })
        .catch((error) => {
          reject({ granted: false, error: error.message })
        })
    } else {
      // Fallback: Use Activity API or show info
      console.warn('Idle Detection API not supported')
      // For demo purposes, we'll simulate permission
      setTimeout(() => {
        resolve({ granted: true, status: 'granted', note: 'API not fully supported' })
      }, 500)
    }
  })
}

/**
 * Request emotion input permission (microphone/text input)
 */
export const requestEmotionInputPermission = async () => {
  return new Promise((resolve, reject) => {
    // Request microphone permission for voice input
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Stop the stream immediately, we just needed permission
          stream.getTracks().forEach((track) => track.stop())
          resolve({ granted: true, type: 'voice' })
        })
        .catch((error) => {
          // User denied or error occurred
          if (error.name === 'NotAllowedError') {
            reject({ granted: false, error: 'Microphone permission denied' })
          } else {
            // Still allow text input even if microphone is denied
            resolve({ granted: true, type: 'text', note: 'Voice input unavailable, text input enabled' })
          }
        })
    } else {
      // Microphone API not available, but text input is always available
      resolve({ granted: true, type: 'text', note: 'Voice input not supported, text input enabled' })
    }
  })
}

/**
 * Helper: Load Google API client
 */
const loadGoogleAPI = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window object not available'))
      return
    }
    
    if (window.gapi) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          clientId: GOOGLE_CLIENT_ID,
          scope: `${GOOGLE_SCOPES.calendar} ${GOOGLE_SCOPES.youtube}`
        }).then(() => {
          resolve()
        }).catch(reject)
      })
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

/**
 * Helper: Initiate Calendar OAuth
 */
const initiateCalendarOAuth = (resolve, reject) => {
  try {
    if (typeof window === 'undefined' || !window.gapi || !window.gapi.auth2) {
      reject({
        granted: false,
        error: 'Google API not loaded'
      })
      return
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance()
    
    authInstance.signIn({
      scope: GOOGLE_SCOPES.calendar
    }).then((googleUser) => {
      resolve({
        granted: true,
        accessToken: googleUser.getAuthResponse().access_token,
        service: 'google-calendar'
      })
    }).catch((error) => {
      reject({
        granted: false,
        error: error.error || 'OAuth failed'
      })
    })
  } catch (error) {
    reject({
      granted: false,
      error: error.message || 'OAuth initialization failed'
    })
  }
}

/**
 * Helper: Initiate YouTube OAuth
 */
const initiateYouTubeOAuth = (resolve, reject) => {
  try {
    if (typeof window === 'undefined' || !window.gapi || !window.gapi.auth2) {
      reject({
        granted: false,
        error: 'Google API not loaded'
      })
      return
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance()
    
    authInstance.signIn({
      scope: GOOGLE_SCOPES.youtube
    }).then((googleUser) => {
      resolve({
        granted: true,
        accessToken: googleUser.getAuthResponse().access_token,
        service: 'youtube'
    })
    }).catch((error) => {
      reject({
        granted: false,
        error: error.error || 'OAuth failed'
      })
    })
  } catch (error) {
    reject({
      granted: false,
      error: error.message || 'OAuth initialization failed'
    })
  }
}

/**
 * Fallback: Open OAuth in popup window
 */
const openOAuthWindow = (service, resolve, reject) => {
  if (typeof window === 'undefined') {
    reject({
      granted: false,
      error: 'Window object not available'
    })
    return
  }

  const width = 500
  const height = 600
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  const scope = service === 'calendar' ? GOOGLE_SCOPES.calendar : GOOGLE_SCOPES.youtube
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=${encodeURIComponent(scope)}`

  const popup = window.open(
    authUrl,
    'OAuth',
    `width=${width},height=${height},left=${left},top=${top}`
  )

  if (!popup) {
    reject({
      granted: false,
      error: 'Popup blocked. Please allow popups for this site.'
    })
    return
  }

  // Listen for OAuth callback
  const checkClosed = setInterval(() => {
    if (popup.closed) {
      clearInterval(checkClosed)
      reject({ granted: false, error: 'OAuth window closed' })
    }
  }, 1000)

  // Listen for message from popup (if using postMessage)
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return

    if (event.data.type === 'oauth-success') {
      clearInterval(checkClosed)
      popup.close()
      resolve({
        granted: true,
        accessToken: event.data.accessToken,
        service: service === 'calendar' ? 'google-calendar' : 'youtube'
      })
    } else if (event.data.type === 'oauth-error') {
      clearInterval(checkClosed)
      popup.close()
      reject({
        granted: false,
        error: event.data.error
      })
    }
  })
}

/**
 * Grant all selected permissions
 */
export const grantPermissions = async (selectedPermissions) => {
  const results = {}
  const errors = {}

  // Process each permission
  for (const [key, enabled] of Object.entries(selectedPermissions)) {
    if (!enabled) {
      results[key] = { granted: false, skipped: true }
      continue
    }

    try {
      switch (key) {
        case 'googleCalendar':
          results[key] = await requestGoogleCalendarPermission()
          break
        case 'youtubeHistory':
          results[key] = await requestYouTubePermission()
          break
        case 'deviceFocus':
          results[key] = await requestDeviceFocusPermission()
          break
        case 'emotionInput':
          results[key] = await requestEmotionInputPermission()
          break
        default:
          results[key] = { granted: false, error: 'Unknown permission' }
      }
    } catch (error) {
      errors[key] = error
      results[key] = { granted: false, error: error.error || error.message }
    }
  }

  return {
    results,
    errors,
    allGranted: Object.values(results).every(r => r.granted || r.skipped),
    hasErrors: Object.keys(errors).length > 0
  }
}

