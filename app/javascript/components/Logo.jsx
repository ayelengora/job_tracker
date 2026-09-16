import React from 'react'

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 120 100" className="h-7 w-8 shrink-0" aria-hidden="true">
        <rect x="6" y="52" width="14" height="40" rx="7" fill="#94a3b8" />
        <rect x="24" y="32" width="14" height="60" rx="7" fill="#60a5fa" />
        <rect x="42" y="17" width="14" height="75" rx="7" fill="#fbbf24" />
        <rect x="60" y="37" width="14" height="55" rx="7" fill="#2dd4bf" />
        <rect x="78" y="2" width="14" height="90" rx="7" fill="#22c55e" />
        <rect x="96" y="47" width="14" height="45" rx="7" fill="#fb7185" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight text-neutral-800">
        Job T<span className="font-semibold text-neutral-400">racker</span>
      </span>
    </div>
  )
}

export default Logo
