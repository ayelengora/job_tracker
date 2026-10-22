class User < ApplicationRecord
  has_many :job_applications, dependent: :destroy

  validates :email, presence: true
  validates :provider, presence: true
  validates :uid, presence: true

  after_create :claim_orphaned_job_applications!

  # Finds or creates the User for a Google OmniAuth hash. Called from
  # SessionsController#create on every successful Google login.
  def self.from_omniauth(auth)
    find_or_create_by(provider: auth.provider, uid: auth.uid) do |user|
      user.email      = auth.info.email
      user.name       = auth.info.name
      user.avatar_url = auth.info.image
    end
  end

  private

  # One-time migration helper: the app used to have no accounts, so every
  # JobApplication created before this feature shipped has user_id: nil.
  # The very first person to ever sign in (that's you) inherits all of them.
  # Anyone who signs up after that starts with an empty board, as expected.
  def claim_orphaned_job_applications!
    return unless self.class.count == 1

    JobApplication.where(user_id: nil).update_all(user_id: id)
  end
end
