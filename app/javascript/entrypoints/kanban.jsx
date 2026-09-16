import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import Column from '../components/Column.jsx'
import { CardPreview } from '../components/Card.jsx'
import JobApplicationModal from '../components/JobApplicationModal.jsx'
import Logo from '../components/Logo.jsx'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJobApplication, setEditingJobApplication] = useState(null)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    fetch('/job_applications.json')
      .then(response => response.json())
      .then(data => setJobApplications(data))
  }, [])

  // distance: 8 evita que un simple click (por ej. en "Ver aviso" o "Editar") dispare un drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const grouped = groupByStatus(jobApplications)
  const activeJobApplication = jobApplications.find(app => app.id === activeId) ?? null

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    setActiveId(null)
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

  function openNewModal() {
    setEditingJobApplication(null)
    setIsModalOpen(true)
  }

  function openEditModal(jobApplication) {
    setEditingJobApplication(jobApplication)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function handleSaved(saved) {
    setJobApplications(prev => {
      const exists = prev.some(app => app.id === saved.id)
      return exists ? prev.map(app => (app.id === saved.id ? saved : app)) : [...prev, saved]
    })
    setIsModalOpen(false)
  }

  function handleDeleted(id) {
    setJobApplications(prev => prev.filter(app => app.id !== id))
    setIsModalOpen(false)
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-100">
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <Logo />
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-neutral-400 sm:inline">
            {jobApplications.length} postulaciones
          </span>
          <button
            type="button"
            onClick={openNewModal}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-300 text-base leading-none text-blue-900">
              +
            </span>
            Agregame
          </button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="flex flex-1 items-stretch gap-4 overflow-x-auto px-6 pb-6">
          {STATUSES.map(status => (
            <Column
              key={status}
              status={status}
              jobApplications={grouped[status]}
              onEditCard={openEditModal}
            />
          ))}
        </div>
        <DragOverlay>
          {activeJobApplication ? <CardPreview jobApplication={activeJobApplication} /> : null}
        </DragOverlay>
      </DndContext>
      {isModalOpen && (
        <JobApplicationModal
          jobApplication={editingJobApplication}
          onClose={closeModal}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  )
}

const root = document.getElementById('kanban-root')
createRoot(root).render(<KanbanBoard />)
