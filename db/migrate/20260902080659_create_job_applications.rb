class CreateJobApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :job_applications do |t|
      t.string :company, null: false
      t.string :position, null: false
      t.date :applied_on, null: false
      t.date :last_contacted_on
      t.integer :interest_level, null: false, default: 1
      t.integer :status, null: false, default: 0, index: true
      t.integer :interview_round
      t.text :notes
      t.string :job_url

      t.timestamps
    end
  end
end
