require 'rails_helper'

RSpec.describe "JobApplications", type: :request do
  let(:valid_attributes) do
    {
      company: "Mercado Libre",
      position: "Backend Developer",
      applied_on: Date.today,
      status: "interested",
      interest_level: "medium",
    }
  end

  let(:invalid_attributes) do
    { company: "", position: "", applied_on: nil }
  end

  let!(:job_application) { JobApplication.create!(valid_attributes) }

  describe "GET /job_applications" do
    it "renders the board" do
      get job_applications_path
      expect(response).to have_http_status(:ok)
    end

    it "returns all job applications as json" do
      get job_applications_path(format: :json)
      expect(response).to have_http_status(:ok)

      body = JSON.parse(response.body)
      expect(body.size).to eq(1)
      expect(body.first["company"]).to eq("Mercado Libre")
    end
  end

  describe "GET /job_applications/new" do
    it "renders successfully" do
      get new_job_application_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /job_applications/:id/edit" do
    it "renders successfully" do
      get edit_job_application_path(job_application)
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /job_applications" do
    context "with valid params" do
      it "creates a new JobApplication" do
        expect {
          post job_applications_path, params: { job_application: valid_attributes }
        }.to change(JobApplication, :count).by(1)
      end

      it "redirects to the board (html)" do
        post job_applications_path, params: { job_application: valid_attributes }
        expect(response).to redirect_to(job_applications_path)
      end

      it "returns the created record (json), like the modal expects" do
        post job_applications_path, params: { job_application: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)

        body = JSON.parse(response.body)
        expect(body["company"]).to eq("Mercado Libre")
        expect(body["status"]).to eq("interested")
      end
    end

    context "with invalid params" do
      it "does not create a JobApplication" do
        expect {
          post job_applications_path, params: { job_application: invalid_attributes }
        }.not_to change(JobApplication, :count)
      end

      it "renders :new with unprocessable_entity (html)" do
        post job_applications_path, params: { job_application: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns the validation errors (json), like the modal expects" do
        post job_applications_path, params: { job_application: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)

        body = JSON.parse(response.body)
        expect(body).to have_key("company")
        expect(body).to have_key("position")
      end
    end
  end

  describe "PATCH /job_applications/:id" do
    context "with valid params" do
      it "updates the requested job_application" do
        patch job_application_path(job_application), params: { job_application: { status: "applied" } }
        expect(job_application.reload.status).to eq("applied")
      end

      it "redirects to the board (html)" do
        patch job_application_path(job_application), params: { job_application: { status: "applied" } }
        expect(response).to redirect_to(job_applications_path)
      end

      it "returns the updated record (json), like the drag-and-drop expects" do
        patch job_application_path(job_application), params: { job_application: { status: "applied" } }, as: :json
        expect(response).to have_http_status(:ok)

        body = JSON.parse(response.body)
        expect(body["status"]).to eq("applied")
      end
    end

    context "with invalid params" do
      it "does not update the job_application" do
        patch job_application_path(job_application), params: { job_application: { company: "" } }
        expect(job_application.reload.company).to eq("Mercado Libre")
      end

      it "renders :edit with unprocessable_entity (html)" do
        patch job_application_path(job_application), params: { job_application: { company: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns the validation errors (json)" do
        patch job_application_path(job_application), params: { job_application: { company: "" } }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)

        body = JSON.parse(response.body)
        expect(body).to have_key("company")
      end
    end
  end

  describe "DELETE /job_applications/:id" do
    it "destroys the requested job_application" do
      expect {
        delete job_application_path(job_application)
      }.to change(JobApplication, :count).by(-1)
    end

    it "redirects to the board (html)" do
      delete job_application_path(job_application)
      expect(response).to redirect_to(job_applications_path)
    end

    it "returns no content (json), like the modal's delete button expects" do
      delete job_application_path(job_application), as: :json
      expect(response).to have_http_status(:no_content)
      expect(JobApplication.exists?(job_application.id)).to be false
    end
  end
end
