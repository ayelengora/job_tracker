import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import Card from './Card.jsx'
import { STATUS_STYLES } from './statusStyles.js'

function Column({ status, jobApplications }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.interested

  return (
    <div
      ref={setNodeRef}
      className={`flex h-full w-72 shrink-0 flex-col rounded-xl border-t-4 p-3 transition-colors ${styles.column} ${
        isOver ? 'ring-2 ring-inset ring-neutral-300' : ''
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-neutral-700">{styles.label}</h2>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles.badge}`}>
          {jobApplications.length}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto pr-1">
        {jobApplications.map(app => (
          <Card key={app.id} jobApplication={app} />
        ))}
      </div>
    </div>
  )
}

export default Column
