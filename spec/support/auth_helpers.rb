# Logs a user in through the real OmniAuth callback, with Google mocked.
# OmniAuth test mode skips the trip to Google and hands SessionsController#create
# the fake auth hash below, so the request specs exercise the same login path
# as production.
module AuthHelpers
  def sign_in(user)
    OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new(
      provider: user.provider,
      uid: user.uid,
      info: { email: user.email, name: user.name }
    )
    get "/auth/google_oauth2/callback"
  end
end

OmniAuth.config.test_mode = true

RSpec.configure do |config|
  config.include AuthHelpers, type: :request
end
