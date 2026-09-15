import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import Column from '../components/Column.jsx'
import './kanban.css'

const STATUSES = ['interested', 'applied', 'interviewing', 'offer', 'hired', 'rejected']

function groupByStatus(applications) {
  const grouped = {}
  STATUSES.forEach(status => {
    grouped[status] = applications.filter(app => app.status === status)
  })
  return grouped
}

function getCsrfToken() {
  return document.querySelector('meta[name="csrf-token"]')?.content
}

function updateStatus(id, status) {
  return fetch(`/job_applications/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': getCsrfToken(),
    },
    body: JSON.stringify({ job_application: { status } }),
  }).then(response => {
    if (!response.ok) throw new Error(`No se pudo actualizar (status ${response.status})`)
    return response.json()
  })
}

function KanbanBoard() {
  const [jobApplications, setJobApplications] = useState([])

  useEffect(() => {
    fetch('/job_applications.json')
      .then(response => response.json())
      .then(data => setJobApplications(data))
  }, [])

  // distance: 8 evita que un simple click (por ej. en "Ver aviso") dispare un drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const grouped = groupByStatus(jobApplications)

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const id = active.id
    const newStatus = over.id

    const current = jobApplications.find(app => app.id === id)
    if (!current || current.status === newStatus) return

    const previousStatus = current.status

    // actualización optimista: movemos la card ya, antes de la respuesta del server
    setJobApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    )

    updateStatus(id, newStatus).catch(error => {
      console.error('Error actualizando status, revierto', error)
      // rollback si el PATCH falla
      setJobApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status: previousStatus } : app))
      )
    })
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-100">
      <h1 className="px-6 pb-4 pt-6 text-xl font-bold text-neutral-800">Job Tracker</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-1 items-stretch gap-4 overflow-x-auto px-6 pb-6">
          {STATUSES.map(status => (
            <Column key={status} status={status} jobApplications={grouped[status]} />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

const root = document.getElementById('kanban-root')
createRoot(root).render(<KanbanBoard />)
