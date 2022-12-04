# frozen_string_literal: true

class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  before_action :require_logged_out, only: [:create]

  def create
    user = User.new(user_params)
    if user.save
      login!(user)
      render :show, locals: { user: }, status: :created
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
