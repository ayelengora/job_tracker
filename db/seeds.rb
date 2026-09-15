# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

job_applications = [
  { company: "Mercado Libre", position: "Backend Developer (Ruby on Rails)", status: :interested, interest_level: :high,
    applied_on: Date.new(2026, 9, 10), job_url: "https://careers.mercadolibre.com/jobs/backend-rails-1" },
  { company: "Ualá", position: "Software Engineer", status: :interested, interest_level: :medium,
    applied_on: Date.new(2026, 9, 8), job_url: "https://jobs.uala.com/software-engineer" },
  { company: "Globant", position: "Full Stack Developer", status: :interested, interest_level: :low,
    applied_on: Date.new(2026, 9, 5) },

  { company: "Despegar", position: "Ruby Developer", status: :applied, interest_level: :high,
    applied_on: Date.new(2026, 8, 28), job_url: "https://careers.despegar.com/ruby-dev" },
  { company: "Auth0", position: "Backend Engineer", status: :applied, interest_level: :medium,
    applied_on: Date.new(2026, 8, 25) },
  { company: "GitLab", position: "Backend Engineer (Remote)", status: :applied, interest_level: :high,
    applied_on: Date.new(2026, 8, 20), job_url: "https://about.gitlab.com/jobs/backend-remote" },

  { company: "Shopify", position: "Senior Backend Developer", status: :interviewing, interest_level: :high,
    applied_on: Date.new(2026, 8, 10), last_contacted_on: Date.new(2026, 9, 12), interview_round: 2,
    notes: "Segunda entrevista técnica agendada para la semana que viene" },
  { company: "Xataka Labs", position: "Ruby on Rails Developer", status: :interviewing, interest_level: :medium,
    applied_on: Date.new(2026, 8, 15), last_contacted_on: Date.new(2026, 9, 9), interview_round: 1 },

  { company: "Coderhouse", position: "Backend Developer", status: :offer, interest_level: :high,
    applied_on: Date.new(2026, 7, 30), last_contacted_on: Date.new(2026, 9, 1), interview_round: 3,
    notes: "Ofrecieron el puesto, esperando la propuesta económica por escrito" },

  { company: "Personal Software Factory", position: "Backend Engineer", status: :hired, interest_level: :high,
    applied_on: Date.new(2026, 6, 15), last_contacted_on: Date.new(2026, 7, 20), interview_round: 3,
    notes: "Acepté la oferta, inicio en octubre" },

  { company: "Naranja X", position: "Ruby Developer", status: :rejected, interest_level: :medium,
    applied_on: Date.new(2026, 7, 10), last_contacted_on: Date.new(2026, 7, 25),
    notes: "Rechazo después de la entrevista técnica" },
  { company: "OLX", position: "Backend Developer", status: :rejected, interest_level: :low,
    applied_on: Date.new(2026, 6, 20), last_contacted_on: Date.new(2026, 7, 2) },
]

job_applications.each do |attrs|
  job = JobApplication.find_or_initialize_by(company: attrs[:company], position: attrs[:position])
  job.assign_attributes(attrs.except(:company, :position))
  job.save!
end

puts "Seeded #{JobApplication.count} job applications"
