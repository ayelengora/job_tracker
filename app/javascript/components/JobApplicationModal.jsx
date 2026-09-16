import React, { useEffect, useState } from 'react'
import { STATUS_STYLES } from './statusStyles.js'

const STATUSES = Object.keys(STATUS_STYLES)
const INTEREST_LEVELS = ['low', 'medium', 'high']

const EMPTY_FORM = {
  company: '',
  position: '',
  status: 'interested',
  interest_level: 'medium',
  applied_on: '',
  last_contacted_on: '',
  interview_round: '',
  job_url: '',
  notes: '',
}

function toFormState(jobApplication) {
  if (!jobApplication) return EMPTY_FORM
  return {
    company: jobApplication.company ?? '',
    position: jobApplication.position ?? '',
    status: jobApplication.status ?? 'interested',
    interest_level: jobApplication.interest_level ?? 'medium',
    applied_on: jobApplication.applied_on ?? '',
    last_contacted_on: jobApplication.last_contacted_on ?? '',
    interview_round: jobApplication.interview_round ?? '',
    job_url: jobApplication.job_url ?? '',
    notes: jobApplication.notes ?? '',
  }
}

function getCsrfToken() {
  return document.querySelector('meta[name="csrf-token"]')?.content
}

// El controller devuelve los errores como { campo: ["mensaje", ...] }
function flattenErrors(errors) {
  if (!errors || typeof errors !== 'object') return ['No se pudo guardar la postulación']
  return Object.entries(errors).flatMap(([field, messages]) =>
    messages.map(message => `${field} ${message}`)
  )
}

const inputClass =
  'mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400'
const labelClass = 'block text-sm font-medium text-neutral-700'

function JobApplicationModal({ jobApplication, onClose, onSaved, onDeleted }) {
  const isEditing = Boolean(jobApplication)
  const [form, setForm] = useState(() => toFormState(jobApplication))
  const [errors, setErrors] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(toFormState(jobApplication))
    setErrors([])
  }, [jobApplication])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleChange(field) {
    return event => setForm(prev => ({ ...prev, [field]: event.target.value }))
  }

  function handleDelete() {
    if (!jobApplication) return
    const confirmed = window.confirm(
      `¿Eliminar la postulación a ${jobApplication.company}? Esta acción no se puede deshacer.`
    )
    if (!confirmed) return

    setSaving(true)
    setErrors([])

    fetch(`/job_applications/${jobApplication.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': getCsrfToken(),
      },
    })
      .then(response => {
        if (!response.ok) throw new Error(`No se pudo eliminar (status ${response.status})`)
        onDeleted(jobApplication.id)
      })
      .catch(() => setErrors(['No se pudo eliminar la postulación']))
      .finally(() => setSaving(false))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setErrors([])

    const url = isEditing ? `/job_applications/${jobApplication.id}` : '/job_applications'
    const method = isEditing ? 'PATCH' : 'POST'

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': getCsrfToken(),
      },
      body: JSON.stringify({ job_application: form }),
    })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) {
          setErrors(flattenErrors(data))
          return
        }
        onSaved(data)
      })
      .catch(() => setErrors(['No se pudo conectar con el servidor']))
      .finally(() => setSaving(false))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={event => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-800">
            {isEditing ? 'Editar postulación' : 'Nueva postulación'}
          </h2>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-neutral-600" aria-label="Cerrar">
            ✕
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-700">
            <ul className="list-disc pl-5">
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className={labelClass}>Empresa</label>
            <input type="text" required value={form.company} onChange={handleChange('company')} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Puesto</label>
            <input type="text" required value={form.position} onChange={handleChange('position')} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Estado</label>
              <select value={form.status} onChange={handleChange('status')} className={inputClass}>
                {STATUSES.map(status => (
                  <option key={status} value={status}>
                    {STATUS_STYLES[status].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Interés</label>
              <select value={form.interest_level} onChange={handleChange('interest_level')} className={inputClass}>
                {INTEREST_LEVELS.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Fecha de postulación</label>
              <input
                type="date"
                required
                value={form.applied_on}
                onChange={handleChange('applied_on')}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Último contacto</label>
              <input
                type="date"
                value={form.last_contacted_on}
                onChange={handleChange('last_contacted_on')}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Ronda de entrevista</label>
            <input
              type="number"
              min="0"
              value={form.interview_round}
              onChange={handleChange('interview_round')}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Link del aviso</label>
            <input type="url" value={form.job_url} onChange={handleChange('job_url')} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Notas</label>
            <textarea rows={3} value={form.notes} onChange={handleChange('notes')} className={inputClass} />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              <button type="button" onClick={onClose} className="text-sm text-neutral-600 hover:underline">
                Cancelar
              </button>
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="text-sm font-medium text-rose-600 hover:underline disabled:opacity-60"
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobApplicationModal
