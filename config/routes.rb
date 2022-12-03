# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: %i[create show destroy]
  end
end
