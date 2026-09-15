import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import Card from './Card.jsx'

function Column({ status, jobApplications }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={`column${isOver ? ' column-over' : ''}`}
    >
      <h2 className="column-title">{status}</h2>
      {jobApplications.map(app => (
        <Card key={app.id} jobApplication={app} />
      ))}
    </div>
  )
}

export default Column
