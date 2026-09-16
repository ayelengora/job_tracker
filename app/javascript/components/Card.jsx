import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { STATUS_STYLES } from './statusStyles.js'
import { INTEREST_LEVEL_STYLES } from './interestLevelStyles.js'

function CardBody({ jobApplication, onEdit }) {
  const interestStyles =
    INTEREST_LEVEL_STYLES[jobApplication.interest_level] ?? INTEREST_LEVEL_STYLES.medium

  return (
    <>
      <div className="font-semibold text-neutral-800">{jobApplication.company}</div>
      <div className="text-sm text-neutral-600">{jobApplication.position}</div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className={`inline-flex items-center gap-1 font-medium ${interestStyles.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${interestStyles.dot}`} />
          {jobApplication.interest_level}
        </span>
        <span className="text-neutral-500">{jobApplication.applied_on}</span>
      </div>
      <div className="mt-2 flex items-center gap-3 text-xs">
        {jobApplication.job_url && (
          <a href={jobApplication.job_url} className="font-medium text-blue-600 hover:underline">
            Ver aviso
          </a>
        )}
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(jobApplication)}
            className="font-medium text-neutral-500 hover:underline"
          >
            Editar
          </button>
        )}
      </div>
    </>
  )
}

function Card({ jobApplication, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: jobApplication.id,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  const styles = STATUS_STYLES[jobApplication.status] ?? STATUS_STYLES.interested

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative mb-3 cursor-grab touch-none rounded-lg border-l-4 bg-white p-3 shadow-sm transition-shadow active:cursor-grabbing active:shadow-md ${styles.card} ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <CardBody jobApplication={jobApplication} onEdit={onEdit} />
    </div>
  )
}

// Réplica visual sin useDraggable, para renderizar dentro de DragOverlay
// (un portal fuera del flujo normal), que es lo único que evita que la
// card quede recortada por el overflow-y-auto de la columna al arrastrarla
// hacia otra columna.
export function CardPreview({ jobApplication }) {
  const styles = STATUS_STYLES[jobApplication.status] ?? STATUS_STYLES.interested
  return (
    <div className={`w-72 cursor-grabbing rounded-lg border-l-4 bg-white p-3 shadow-lg ${styles.card}`}>
      <CardBody jobApplication={jobApplication} />
    </div>
  )
}

export default Card
