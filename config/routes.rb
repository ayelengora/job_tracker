Rails.application.routes.draw do
  # Health check endpoint Render (and any other host) pings to confirm the app is alive.
  get "up" => "rails/health#show", as: :rails_health_check

  get "login" => "sessions#new", as: :login
  delete "logout" => "sessions#destroy", as: :logout
  get "auth/failure" => "sessions#failure"
  match "auth/:provider/callback" => "sessions#create", via: [:get, :post]

  root "job_applications#index"

  resources :job_applications, only: [:index, :new, :create, :edit, :update, :destroy]
end
