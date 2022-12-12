# frozen_string_literal: true

json.user do
  json.extract! user, :id, :email
  json.extract! user.profile, :display_name, :age, :gender, :location, :slug
end
