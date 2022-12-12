# frozen_string_literal: true

class Api::GenresController < ApplicationController
  def index
    genres = Genre.all
    render template: 'api/genres/index', locals: { genres: }
  end
end
