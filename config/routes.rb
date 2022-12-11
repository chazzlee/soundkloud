# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    post '/user', to: 'users#check'
    resources :users, only: %i[show create]
    resource :session, only: %i[create show destroy]

    resources :tracks, only: [:index]
  end

  get '*path', to: 'static_pages#frontend_index'
end
