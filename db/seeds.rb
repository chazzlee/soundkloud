# frozen_string_literal: true

puts 'Destroying tables...'

Genre.destroy_all
User.destroy_all
Profile.destroy_all
Track.destroy_all
Reply.destroy_all
PopularPlay.destroy_all
RecentPlay.destroy_all
Tag.destroy_all

puts 'Resetting primary keys...'
%w[tags recent_plays popular_plays genres replies users profiles tracks].each do |table_name|
  ApplicationRecord.connection.reset_pk_sequence!(table_name)
end

puts 'Creating seed data...'

def create_genres
  Genre.create!(name: 'none', label: 'None')
  Genre.create!(name: 'custom', label: 'Custom')
  genre1 = Genre.create!(name: 'metal', label: 'Metal')
  genre2 = Genre.create!(name: 'pop', label: 'Pop')
  genre3 = Genre.create!(name: 'r&b', label: 'R&B & Soul')
  genre4 = Genre.create!(name: 'techno', label: 'Techno')
  genre5 = Genre.create!(name: 'classical', label: 'Classical')
  genre6 = Genre.create!(name: 'ambient', label: 'Ambient')
  genre7 = Genre.create!(name: 'deep_house', label: 'Deep House')
  genre8 = Genre.create!(name: 'dubstep', label: 'Dubstep')
  genre9 = Genre.create!(name: 'trance', label: 'Trance')
  genre10 = Genre.create!(name: 'trap', label: 'Trap')
  genre11 = Genre.create!(name: 'drum_n_bass', label: 'Drum & Bass')
  genre12 = Genre.create!(name: 'dance_edm', label: 'Dance & EDM')
  genre13 = Genre.create!(name: 'piano', label: 'Piano')
  Genre.create!(name: 'alternative_rock', label: 'Alternative Rock')
  Genre.create!(name: 'country', label: 'Country')
  Genre.create!(name: 'dancehall', label: 'Dancehall')
  Genre.create!(name: 'disco', label: 'Disco')
  Genre.create!(name: 'electronic', label: 'Electronic')
  Genre.create!(name: 'folk', label: 'Folk & Singer-Songwriter')
  Genre.create!(name: 'hip_hop', label: 'Hip-hop & Rap')
  Genre.create!(name: 'house', label: 'House')
  Genre.create!(name: 'jazz_blues', label: 'Jazz & Blues')
  Genre.create!(name: 'latin', label: 'Latin')
  Genre.create!(name: 'reggae', label: 'Reggae')
  Genre.create!(name: 'reggaeton', label: 'Reggaeton')
  Genre.create!(name: 'rock', label: 'Rock')
  Genre.create!(name: 'soundtrack', label: 'Soundtrack')
  Genre.create!(name: 'triphop', label: 'Triphop')
  Genre.create!(name: 'world', label: 'World')
  [genre1, genre2, genre3, genre4, genre5, genre6, genre7, genre8, genre9, genre10, genre11, genre12, genre13]
end

genres = create_genres
genders = %w[male female custom none]

demo_user = User.create!(email: 'demo@demo.com', password: 'password')
demo_profile = Profile.create!(age: 100, gender: 'none', display_name: 'Demo User', user: demo_user)
demo_profile.photo.attach(
  io: URI.open('https://i1.sndcdn.com/avatars-000007873027-acd5vm-t200x200.jpg'),
  filename: 'demo_cover.png'
)
other_user = User.create!(email: 'jane@demo.com', password: 'password')
Profile.create!(age: 34, gender: 'female', display_name: 'Jane Doe', user: other_user)

# 10.times do |_n|
#   user = User.create!(email: Faker::Internet.email, password: 'password')
#   profile = Profile.create!(
#     age: rand(100),
#     gender: genders.sample,
#     display_name: Faker::Internet.username(specifier: 3..10),
#     user:
#   )
# profile.photo.attach(
#   io: URI.open('https://www.metal-archives.com/images/4/4/1/2/441258.jpg'),
#   filename: "cover_#{n + 1}.jpg"
# )
# end

# 100.times do |_n|
#   user = User.all.sample
#   title = Faker::Music::PearlJam.song
#   track = Track.new(
#     title:,
#     artist: Faker::Music::PearlJam.musician,
#     permalink: "https://soundkloud-rails.onrender.com/#{user.slug}/#{title.parameterize}",
#     description: Faker::Quote.famous_last_words,
#     caption: Faker::Quotes::Shakespeare.romeo_and_juliet_quote,
#     privacy: %w[public private].sample
#   )
#   track.user = user
#   track.genre = genres.sample
# track.cover.attach(
#   io: URI.open(
#     'https://retroscroll.cat/wp-content/uploads/2020/04/hiscoregirl_avatars_005.jpg'
#   ),
#   filename: "cover_#{n + 1}.jpg"
# )
# track.upload.attach(
#   io: URI.open('https://filesamples.com/samples/audio/mp3/sample1.mp3'),
#   filename: "upload_#{n + 1}.mp3"
# )
# track.cover.attach(
#   io: URI.open(
#     'https://soundkloud-seeds.s3.amazonaws.com/(2002)+When+Dream+and+Day+Unite+%5BRemastered%5D.jpg'
#   ),
#   filename: "cover_#{n + 1}"
# )
# track.save!
# end

20.times do |_n|
  title = Faker::Music::RockBand.song
  track = Track.new(
    title:,
    artist: Faker::Music::RockBand.name,
    permalink: "http://localhost:5000/#{demo_profile.slug}/#{title.parameterize}",
    description: Faker::Quote.matz,
    caption: Faker::Quotes::Shakespeare.romeo_and_juliet_quote,
    privacy: %w[public private].sample
  )
  # track.upload.attach(
  #   io: URI.open('https://filesamples.com/samples/audio/mp3/sample1.mp3'),
  #   filename: "upload_#{n + 1}.mp3"
  # )
  # track.cover.attach(
  #   io: URI.open(
  #     'https://www.metal-archives.com/images/4/4/1/2/441258.jpg'
  #   ),
  #   filename: "cover_#{n + 1}.jpg"
  # )
  track.user = demo_user
  track.genre = genres.sample
  track.save!
end

# 10.times do
#   demo_user.play_track(Track.all.sample)
#   other_user.play_track(Track.all.sample)
# end

# 4.times do
#   Track.all.each do |track|
#     User.all.each do |user|
#       user.play_track(track)
#     end
#   end
# end

# 100.times do
#   reply = Reply.new(body: Faker::Quote.matz)
#   reply.user = User.all.sample
#   reply.track = Track.all.sample
#   reply.save!
# end

puts 'Finished'
