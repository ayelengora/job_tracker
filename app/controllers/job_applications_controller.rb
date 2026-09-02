class JobApplicationsController < ApplicationController
  before_action :set_job_application, only: [:edit, :update, :destroy]
  
  def create
    @job_application = JobApplication.new(job_application_params)
    if @job_application.save
      redirect_to job_applications_path, notice: 'Job application was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def index
    @job_applications = JobApplication.all
  end

  def new
    @job_application = JobApplication.new
  end

  def edit
  end

  def update
    if @job_application.update(job_application_params)
      redirect_to job_applications_path, notice: 'Job application was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @job_application.destroy
    redirect_to job_applications_path, notice: 'Job application was successfully deleted.'
  end

  private

  def job_application_params
      params.require(:job_application).permit(:company, :position, :applied_on, :status, :interest_level, :notes, :job_url, :interview_round, :last_contacted_on)
  end

  def set_job_application
    @job_application = JobApplication.find(params[:id])
  end
end
