Rails.application.routes.draw do
  resources :job_applications, only: [:index, :new, :create, :edit, :update, :destroy]
end
