class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create, :failure]

  def new
    redirect_to root_path if current_user
  end

  # Google redirects here after a successful login. omniauth-google-oauth2
  # has already verified the account and handed us the auth hash.
  def create
    user = User.from_omniauth(request.env["omniauth.auth"])
    session[:user_id] = user.id
    redirect_to root_path, notice: "Sesion iniciada como #{user.email}."
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path, notice: "Sesion cerrada."
  end

  def failure
    redirect_to login_path, alert: "No se pudo iniciar sesion con Google (#{params[:message]})."
  end
end
