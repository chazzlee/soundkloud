# frozen_string_literal: true

class Api::RepliesController < ApplicationController
  before_action :require_logged_in, only: %i[create destroy]

  def index
    track = Track.preload(:replies).find_by(id: params[:track_id])
    replies = track.replies
    render template: 'api/replies/index', locals: { replies: }
  end

  def create
    track = Track.friendly.find(params[:track_id])

    if track
      reply = Reply.new(reply_params)
      reply.user = current_user
      reply.track = track
      reply.save!
      render template: 'api/replies/show', locals: { reply: }, status: :created
    else
      render json: { message: 'Not found' }, status: :not_found
    end
  end

  def destroy; end

  private

  def reply_params
    params.require(:reply).permit(:body)
  end
end
