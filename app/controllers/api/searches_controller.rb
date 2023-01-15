# frozen_string_literal: true

class Api::SearchesController < ApplicationController
  def index
    query = params[:query].downcase
    results = Track
              .where('lower(artist) LIKE ?', "%#{Track.sanitize_sql_like(query)}%")
              .or(Track.where('lower(title) LIKE ?', "%#{Track.sanitize_sql_like(query)}%"))

    render json: { data: results }
  end
end
