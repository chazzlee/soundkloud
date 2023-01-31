# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:destroy]

  def show
    user = current_user
    if user
      render 'api/users/show', locals: { user: }
    else
      render json: { user: nil }
    end
  end

  def create
    user = User.find_by_credentials(
      email: params[:email],
      password: params[:password]
    )
    if user
      login!(user)
      render 'api/users/show', locals: { user: }
    else
      render json: { errors: ['Invalid credentials'] }, status: :unprocessable_entity
    end
  end

  def destroy
    logout!
    head :no_content
  end
end
