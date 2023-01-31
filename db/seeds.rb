# frozen_string_literal: true

# Start SEED
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
%w[tags recent_plays popular_plays genres replies users profiles tracks playlists
   playlist_tracks].each do |table_name|
  ApplicationRecord.connection.reset_pk_sequence!(table_name)
end

puts 'Creating seed data...'

genres.each do |genre|
  Genre.create!(name: genre[:name], label: genre[:label])
end

genders = %w[male female custom none]
demo_user = User.create!(email: 'demo@demo.com', password: 'password')
demo_profile = Profile.create!(age: 100, gender: genders.sample, display_name: 'Demo User', user: demo_user)
demo_profile.photo.attach(
  io: URI.open('https://soundkloud-seeds.s3.amazonaws.com/apex1.jpg'),
  filename: 'demo_cover.jpg'
)

links = [
  'https://soundkloud-seeds.s3.amazonaws.com/(2002)+When+Dream+and+Day+Unite+%5BRemastered%5D.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/00-atrox-orgasm-2003-(front)-butt.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/1985+-+Fear+of+Tomorrow.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/1999+-+The+Power+Cosmic.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/2007+-+Paradise+Lost+(Promo)_a.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Adramelch+-+Irae+Melanox+(1988)+RM+Front.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/anata-dismay.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Artillery+Terror+Squad--f.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Annihilator++-+Annihilator+%5B2010%5D.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/at-the-gate-redsky.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Celtic+Frost+-+Morbid+Tales+(Front).jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Decapitated+-+Winds+Of+Creation+-+Front.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Blind+Guardian+-+2010+-+At+The+Edge+Of+Time.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Behemoth+-+Evangelion.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Bolt_Thrower_-_Realm_Of_Chaos-front.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Cryptopsy+-+None+So+Vile.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Death_-_Symbolic_-_Front.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Soulside_Journey-Cover.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/sauron.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Morbid+Angel+-+Blessed+Are+The+Sick+-+Frontal.jpeg',
  'https://soundkloud-seeds.s3.amazonaws.com/The+Crown+-+Crowned+In+Terror+(2002).jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Cryptopsy-Blasphemy+Made+Flesh.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Opeth+-+My+Arms%2C+Your+Hearse.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Death_-_Individual_Thought_Patterns_-_Front.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Anthrax+-+Among+The+Living.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Blood_Stain_Child_Mozaiq.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Kreator+-+1986+-+Pleasure+To+Kill-a.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Morbid+Angel+-+Covenant+-+Frontal.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/Angra.jpg',
  'https://soundkloud-seeds.s3.amazonaws.com/cvr.jpg'
]

random_tracks = [
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Demonic+Incarnate.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/(03)+%5Bmekong+delta%5D+a+certain+fool+(+le+fou+)++movement+1.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Ad+Infinitum.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01+Into+The+Infinity+Of+Thoughts.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01.+Wolf.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/(06)+%5Bmekong+delta%5D+interlude+2+-+group.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/03+-+Dissection+-+Crimson+Towers.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/03+Ana.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Foul+Body+Autopsy.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01-Jag_Panzer-Ample_Destruction-Licensed_to_Kill.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/03+-+Mutilate+the+Stillborn.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/04+-+Phantasm.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/05-Jag_Panzer-Ample_Destruction-Generally_Hostile.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/02+-+Emaciated+Holy+Figure.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/04+-+Essence+Ablaze.mp3'
]

10.times do |n|
  user = User.create!(email: Faker::Internet.unique.email, password: 'password')
  profile = Profile.new(age: rand(18...40), gender: genders.sample,
                        display_name: Faker::Internet.unique.username(specifier: 6..12), user:)
  profile.photo.attach(io: URI.open('https://i.pravatar.cc/300'), filename: "cover_#{n + 1}")
  profile.save!
end

30.times do |n|
  user = User.all.sample
  title = Faker::Music::RockBand.song
  artist = Faker::Music.band

  track = Track.new(
    title:,
    artist:,
    permalink: "https://soundkloud-rails.onrender.com/#{user.slug}/#{title.parameterize}",
    description: Faker::Quote.famous_last_words,
    caption: Faker::Quotes::Shakespeare.romeo_and_juliet_quote,
    privacy: %w[public private].sample
  )
  track.cover.attach(
    io: URI.open(links[n]),
    filename: "cover_#{n + 1}"
  )

  upload_track = random_tracks.sample
  track.upload.attach(io: URI.open(upload_track), filename: "upload_#{n + 1}")
  track.user = user
  track.genre_id = Genre.all.sample.id

  track.save!
end

50.times do
  reply = Reply.new(body: Faker::Quote.matz)
  reply.user = User.all.sample
  reply.track = Track.all.sample
  reply.save!
end

# End seed

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

20.times do
  demo_user.play_track(Track.all.sample)
  User.all.sample.play_track(Track.all.sample)
end

10.times do
  Track.all.each do |track|
    User.all.each do |user|
      user.play_track(track)
    end
  end
end

# 100.times do
#   reply = Reply.new(body: Faker::Quote.matz)
#   reply.user = User.all.sample
#   reply.track = Track.all.sample
#   reply.save!
# end

puts 'Finished'
