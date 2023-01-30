users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :email
    json.extract! user.profile, :display_name, :age, :gender, :location, :slug
    json.photo user.profile.photo.url
    json.header_cover user.profile.header_cover.url
  end
end
