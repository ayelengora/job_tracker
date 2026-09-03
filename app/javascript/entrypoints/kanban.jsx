import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

function Saludo() {
  // 1. acá el useState: la variable que va a guardar jobApplications
  const [jobApplications, setJobApplications] = useState([])
  // 2. acá el useEffect, con el fetch adentro
  useEffect(() => {
  fetch('/job_applications.json')
    .then(response => response.json())
    .then(data => setJobApplications(data))
  }, [])
  // 3. acá el console.log(jobApplications), antes del return
  console.log(jobApplications)
    return <h1>¡Hola, mundo!</h1>;
  }

const root = document.getElementById('kanban-root')
createRoot(root).render(<Saludo />)