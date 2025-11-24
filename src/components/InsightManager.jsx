import React, { useState, useEffect } from 'react'
import InsightPopup from './InsightPopup'

const InsightManager = ({ insights = [] }) => {
  const [activeInsights, setActiveInsights] = useState([])

  useEffect(() => {
    // Add new insights to the active list
    insights.forEach((insight) => {
      setActiveInsights(prev => {
        if (!prev.find(ai => ai.id === insight.id)) {
          return [...prev, insight]
        }
        return prev
      })
    })
  }, [insights])

  const handleClose = (id) => {
    setActiveInsights(prev => prev.filter(insight => insight.id !== id))
  }

  return (
    <div className="insight-manager">
      {activeInsights.map((insight) => (
        <InsightPopup
          key={insight.id}
          insight={insight}
          onClose={() => handleClose(insight.id)}
          duration={insight.duration || 5000}
        />
      ))}
    </div>
  )
}

export default InsightManager

