# frozen_string_literal: true

def create_genres
  genres = [
    { name: 'none', label: 'None' },
    { name: 'custom', label: 'Custom' },
    { name: 'metal', label: 'Metal' },
    { name: 'pop', label: 'Pop' },
    { name: 'r&b', label: 'R&B & Soul' },
    { name: 'techno', label: 'Techno' },
    { name: 'classical', label: 'Classical' },
    { name: 'ambient', label: 'Ambient' },
    { name: 'deep_house', label: 'Deep House' },
    { name: 'dubstep', label: 'Dubstep' },
    { name: 'trance', label: 'Trance' },
    { name: 'trap', label: 'Trap' },
    { name: 'drum_n_bass', label: 'Drum & Bass' },
    { name: 'dance_edm', label: 'Dance & EDM' },
    { name: 'piano', label: 'Piano' },
    { name: 'alternative_rock', label: 'Alternative Rock' },
    { name: 'country', label: 'Country' },
    { name: 'dancehall', label: 'Dancehall' },
    { name: 'folk', label: 'Folk & Singer-Songwriter' },
    { name: 'hip_hop', label: 'Hip-hop & Rap' },
    { name: 'house', label: 'House' },
    { name: 'jazz_blues', label: 'Jazz & Blues' },
    { name: 'latin', label: 'Latin' },
    { name: 'reggae', label: 'Reggae' },
    { name: 'reggaeton', label: 'Reggaeton' },
    { name: 'rock', label: 'Rock' },
    { name: 'soundtrack', label: 'Soundtrack' },
    { name: 'triphop', label: 'Triphop' },
    { name: 'world', label: 'World' }
  ]
  Genre.insert_all(genres)
end

puts 'Destroying tables...'

Genre.destroy_all
User.destroy_all
Profile.destroy_all
Track.destroy_all
Reply.destroy_all
PopularPlay.destroy_all
RecentPlay.destroy_all
PlaylistTrack.destroy_all
Playlist.destroy_all
Tag.destroy_all

puts 'Resetting primary keys...'
%w[tags recent_plays popular_plays genres replies users profiles tracks playlists playlist_tracks].each do |table_name|
  ApplicationRecord.connection.reset_pk_sequence!(table_name)
end

puts 'Creating seed data...'

def create_users
  genders = %w[male female custom none]
  demo_user = User.create!(email: 'demo@demo.com', password: 'password')
  demo_profile = Profile.create!(age: 100, gender: genders.sample, display_name: 'Demo User', user: demo_user)
  demo_profile.photo.attach(
    io: URI.open('https://soundkloud-seeds.s3.amazonaws.com/apex1.jpg'),
    filename: 'demo_cover.jpg'
  )
  other_user = User.create!(email: 'jane@demo.com', password: 'password')
  Profile.create!(age: 34, gender: genders.sample, display_name: 'Jane Doe', user: other_user)

  # 10.times do |n|
  #   user = User.create!(email: Faker::Internet.email, password: 'password')
  #   profile = Profile.create!(
  #     age: rand(100),
  #     gender: genders.sample,
  #     display_name: Faker::Internet.username(specifier: 3..12),
  #     user:
  #   )
  #   profile.photo.attach(
  #     io: URI.open('https://www.metal-archives.com/images/4/4/1/2/441258.jpg'),
  #     filename: "cover_#{n + 1}.jpg"
  #   )
  # end

  { demo: demo_user, other: other_user }
end

create_users
genres = create_genres
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
# https://soundkloud-seeds.s3.amazonaws.com/tracks/02.+The+Answer+Lies+Within.mp3

# 20.times do |n|
#   title = Faker::Music::RockBand.song
#   track = Track.new(
#     title:,
#     artist: Faker::Music::RockBand.name,
#     permalink: "#{Rails.env.development? ? 'http://localhost:5000' : 'https://soundkloud-rails.onrender.com'}/#{demo_profile.slug}/#{title.parameterize}",
#     description: Faker::Quote.matz,
#     caption: Faker::Quotes::Shakespeare.romeo_and_juliet_quote,
#     privacy: %w[public private].sample
#   )
#   track.upload.attach(
#     io: URI.open('https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Demonic+Incarnate.mp3'),
#     filename: "upload_#{n + 1}.mp3"
#   )
#   track.cover.attach(
#     io: URI.open(
#       'https://www.metal-archives.com/images/4/4/1/2/441258.jpg'
#     ),
#     filename: "cover_#{n + 1}.jpg"
#   )
#   track.user = demo_user
#   track.genre = genres.sample
#   track.save!
# end

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
