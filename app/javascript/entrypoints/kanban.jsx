import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './kanban.css'

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
    <div className="board">
      {STATUSES.map(status => (
        <div key={status} className="column">
          <h2 className="column-title">{status}</h2>
          {grouped[status].map(app => (
            <div key={app.id} className="card">{app.company} - {app.position}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

const root = document.getElementById('kanban-root')
createRoot(root).render(<KanbanBoard />)