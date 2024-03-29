# frozen_string_literal: true

class Api::GenresController < ApplicationController
  def index
    genres = Rails.cache.fetch('genres') do
      Genre.all
    end

    render template: 'api/genres/index', locals: { genres: }
  end
end
