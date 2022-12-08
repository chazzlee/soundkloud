# frozen_string_literal: true

class User < ApplicationRecord
  has_one :profile

  has_secure_password

  before_validation :ensure_session_token

  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true # TODO:

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
