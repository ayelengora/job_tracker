class JobApplication < ApplicationRecord
  belongs_to :user

  enum :status, { interested: 0, applied: 1, interviewing: 2, offer: 3, hired: 4, rejected: 5 }
  enum :interest_level, { low: 0, medium: 1, high: 2 }

  normalizes :job_url, with: ->(url) do
    url = url.strip.presence
    next nil if url.nil?

    url.match?(%r{\Ahttps?://}i) ? url : "https://#{url}"
  end

  validates :company, presence: true
  validates :position, presence: true
  validates :applied_on, presence: true
  validates :status, presence: true
  validates :interest_level, presence: true
  validate :job_url_must_look_like_a_website

  private

  def job_url_must_look_like_a_website
    return if job_url.blank?

    host = URI.parse(job_url).host
    errors.add(:job_url, "no parece una dirección web") unless host&.include?(".")
  rescue URI::InvalidURIError
    errors.add(:job_url, "no parece una dirección web")
  end
end