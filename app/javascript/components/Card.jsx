import React from 'react'
import { useDraggable } from '@dnd-kit/core'

function Card({ jobApplication }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: jobApplication.id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined

  return (
    <div
      className="card"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="card-title">{ jobApplication.company}</div>
      <div>{jobApplication.position}</div>
      <div className="card-meta">
        <span>{jobApplication.interest_level}</span>
        <span>{jobApplication.applied_on}</span>
      </div>
      {jobApplication.job_url && <a href={jobApplication.job_url}>Ver aviso</a>}
    </div>
  )  // acá "app" ya está disponible, extraído directo del objeto de props
}

export default Card
