Rails.application.routes.draw do
  # Health check endpoint Render (and any other host) pings to confirm the app is alive.
  get "up" => "rails/health#show", as: :rails_health_check

  root "job_applications#index"

  resources :job_applications, only: [:index, :new, :create, :edit, :update, :destroy]
end
