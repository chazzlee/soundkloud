# frozen_string_literal: true

class User < ApplicationRecord
  has_one :profile
  has_many :tracks

  has_many :recent_plays
  has_many :recently_played_tracks, through: :recent_plays, source: :track

  has_many :popular_plays
  has_many :most_played_tracks, through: :popular_plays, source: :track

  has_secure_password

  before_validation :ensure_session_token

  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true # TODO:

  delegate :slug, to: :profile

  def play_track(track)
    recent_play = RecentPlay.find_or_initialize_by(user: self, track:)
    recent_play.last_played_at = Time.now unless recent_play.new_record?
    recent_play.save!

    popular_play = PopularPlay.find_or_initialize_by(user: self, track:)
    popular_play.play_count += 1 unless popular_play.new_record?
    popular_play.save!
  end

  def self.find_by_credentials(email:, password:)
    user = User.find_by(email:)
    user&.authenticate(password) ? user : nil
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    save!
    session_token
  end

  private

  def generate_unique_session_token
    loop do
      session_token = SecureRandom.urlsafe_base64
      return session_token unless User.exists?(session_token:)
    end
  end
end
