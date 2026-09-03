import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

const STATUSES = ['interested', 'applied', 'interviewing', 'offer', 'hired', 'rejected']

function groupByStatus(applications) {
  const grouped = {}
  STATUSES.forEach(status => {
    grouped[status] = applications.filter(app => app.status === status)
  })
  return grouped
}

function KanbanBoard() {
  const [jobApplications, setJobApplications] = useState([])

  useEffect(() => {
    fetch('/job_applications.json')
      .then(response => response.json())
      .then(data => setJobApplications(data))
  }, [])

  const grouped = groupByStatus(jobApplications)

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {STATUSES.map(status => (
        <div key={status}>
          <h2>{status}</h2>
          {grouped[status].map(app => (
            <p key={app.id}>{app.company} - {app.position}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

const root = document.getElementById('kanban-root')
createRoot(root).render(<KanbanBoard />)