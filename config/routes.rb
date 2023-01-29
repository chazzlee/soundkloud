# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    post '/user', to: 'users#check'
    resources :users, only: %i[show create] do
      resources :tracks, only: %i[index update]
    end

    # TODO: move to users/...
    resources :profiles, only: [:update] do
      get '/tracks/:id', to: 'tracks#show'
    end

    resource :session, only: %i[create show destroy]
    resources :tracks, only: %i[create destroy] do
      resources :replies, only: %i[index create]
    end
    resources :replies, only: %i[update destroy]
    resources :discover, only: [:index]
    resources :genres, only: [:index]
    resources :playlists, only: %i[index create show update destroy] do
      resources :playlist_tracks, only: %i[create destroy]
    end
    resources :searches, only: [:index]
  end

  get '*path', to: 'static_pages#frontend_index'
end
