class JobApplication < ApplicationRecord
  enum :status, { interested: 0, applied: 1, interviewing: 2, offer: 3, hired: 4, rejected: 5 }
  enum :interest_level, { low: 0, medium: 1, high: 2 }

  validates :company, presence: true
  validates :position, presence: true
  validates :applied_on, presence: true
  validates :status, presence: true
  validates :interest_level, presence: true
end
