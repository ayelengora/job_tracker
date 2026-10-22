Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
    ENV["GOOGLE_CLIENT_ID"],
    ENV["GOOGLE_CLIENT_SECRET"],
    scope: "email,profile",
    prompt: "select_account"
end

# Google returns a 401 (instead of raising) on a failed/cancelled login by
# default in newer omniauth versions; make sure it hits SessionsController#failure.
OmniAuth.config.on_failure = Proc.new do |env|
  SessionsController.action(:failure).call(env)
end