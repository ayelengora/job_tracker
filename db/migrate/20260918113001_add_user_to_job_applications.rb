class AddUserToJobApplications < ActiveRecord::Migration[8.0]
  def change
    # Nullable on purpose: existing rows have no owner yet. They get claimed
    # automatically (see User#claim_orphaned_job_applications!) the first time
    # someone signs in, which in practice will be you.
    add_reference :job_applications, :user, foreign_key: true, index: true
  end
end
