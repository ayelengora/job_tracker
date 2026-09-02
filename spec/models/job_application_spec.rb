require 'rails_helper'

RSpec.describe JobApplication, type: :model do
  describe "validations" do
    it "should have a company name, a position and an application date" do
      job_application = JobApplication.new
      job_application.company = "Test Company"
      job_application.position = "Software Engineer"
      job_application.applied_on = Date.today
      expect(job_application).to be_valid
    end
    it "should not be valid without a company name" do
      job_application = JobApplication.new
      job_application.position = "Software Engineer"
      job_application.applied_on = Date.today
      expect(job_application).to be_invalid
    end

    it "should not be valid without a position" do
      job_application = JobApplication.new
      job_application.company = "Test Company"
      job_application.applied_on = Date.today
      expect(job_application).to be_invalid
    end

    it "should not be valid without an application date" do
      job_application = JobApplication.new
      job_application.company = "Test Company"
      job_application.position = "Software Engineer"
      expect(job_application).to be_invalid
    end

    it "defaults status to interested" do
      job_application = JobApplication.new
      expect(job_application.status).to eq("interested")
    end

    it "interest_level should be medium by default" do
      job_application = JobApplication.new
      expect(job_application.interest_level).to eq("medium")
    end 
  end
end
