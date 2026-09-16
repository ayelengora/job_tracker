import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { STATUS_STYLES } from './statusStyles.js'

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
      <div className="font-semibold text-neutral-800">{jobApplication.company}</div>
      <div className="text-sm text-neutral-600">{jobApplication.position}</div>
      <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1">
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
          {jobApplication.interest_level}
        </span>
        <span>{jobApplication.applied_on}</span>
      </div>
      <div className="mt-2 flex items-center gap-3 text-xs">
        {jobApplication.job_url && (
          <a href={jobApplication.job_url} className="font-medium text-blue-600 hover:underline">
            Ver aviso
          </a>
        )}
        <button
          type="button"
          onClick={() => onEdit(jobApplication)}
          className="font-medium text-neutral-500 hover:underline"
        >
          Editar
        </button>
      </div>
    </div>
  )
}

export default Card
