# frozen_string_literal: true

ApplicationRecord.transaction do
  puts 'Destroying tables...'

  Genre.destroy_all
  User.destroy_all
  Profile.destroy_all
  Track.destroy_all

  puts 'Resetting primary keys...'
  %w[genres users profiles tracks].each do |table_name|
    ApplicationRecord.connection.reset_pk_sequence!(table_name)
  end

  puts 'Creating seed data...'

  Genre.create!(name: 'none', label: 'None')
  Genre.create!(name: 'custom', label: 'Custom')
  Genre.create!(name: 'alternative_rock', label: 'Alternative Rock')
  Genre.create!(name: 'ambient', label: 'Ambient')
  Genre.create!(name: 'classical', label: 'Classical')
  Genre.create!(name: 'country', label: 'Country')
  Genre.create!(name: 'dance_edm', label: 'Dance & EDM')
  Genre.create!(name: 'dancehall', label: 'Dancehall')
  Genre.create!(name: 'deep_house', label: 'Deep House')
  Genre.create!(name: 'disco', label: 'Disco')
  Genre.create!(name: 'drum_n_bass', label: 'Drum & Bass')
  Genre.create!(name: 'dubstep', label: 'Dubstep')
  Genre.create!(name: 'electronic', label: 'Electronic')
  Genre.create!(name: 'folk', label: 'Folk & Singer-Songwriter')
  Genre.create!(name: 'hip_hop', label: 'Hip-hop & Rap')
  Genre.create!(name: 'house', label: 'House')
  Genre.create!(name: 'jazz_blues', label: 'Jazz & Blues')
  Genre.create!(name: 'latin', label: 'Latin')
  Genre.create!(name: 'metal', label: 'Metal')
  Genre.create!(name: 'piano', label: 'Piano')
  Genre.create!(name: 'pop', label: 'Pop')
  Genre.create!(name: 'r&b', label: 'R&B & Soul')
  Genre.create!(name: 'reggae', label: 'Reggae')
  Genre.create!(name: 'reggaeton', label: 'Reggaeton')
  Genre.create!(name: 'rock', label: 'Rock')
  Genre.create!(name: 'soundtrack', label: 'Soundtrack')
  Genre.create!(name: 'techno', label: 'Techno')
  Genre.create!(name: 'trance', label: 'Trance')
  Genre.create!(name: 'trap', label: 'Trap')
  Genre.create!(name: 'triphop', label: 'Triphop')
  Genre.create!(name: 'world', label: 'World')

  demo_user = User.create!(email: 'demo@demo.com', password: 'password')
  demo_profile = Profile.create!(age: 100, gender: 'none', display_name: 'Demo User', user: demo_user)

  50.times do |_n|
    title = Faker::Music::RockBand.song
    track = Track.new(
      title:,
      artist: Faker::Music::RockBand.name,
      permalink: "http://localhost:5000/#{demo_profile.slug}/#{title.parameterize}",
      description: Faker::Quote.matz,
      caption: Faker::Quotes::Shakespeare.romeo_and_juliet_quote,
      privacy: %w[public private].sample
    )
    track.user = demo_user
    track.genre = Genre.all.sample
    track.save!
  end

  puts 'Finished'
end
