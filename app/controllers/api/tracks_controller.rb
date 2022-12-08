# frozen_string_literal: true

class Api::TracksController < ApplicationController
  def index
    tracks = Track.all
    render template: 'api/tracks/index', locals: { tracks: }
  end
end
