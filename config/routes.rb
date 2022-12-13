# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    post '/user', to: 'users#check'
    resources :users, only: %i[show create]
    resources :profiles, only: [:show] do
      get '/tracks/:id', to: 'tracks#show'
    end
    resource :session, only: %i[create show destroy]
    resources :tracks, only: %i[index create]
    resources :discover, only: [:index]
    resources :genres, only: [:index]
  end

  get '*path', to: 'static_pages#frontend_index'
end
