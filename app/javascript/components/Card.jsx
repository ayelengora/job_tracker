import React from 'react'


function Card({ jobApplication}) {
    return (
    <div className="card">
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