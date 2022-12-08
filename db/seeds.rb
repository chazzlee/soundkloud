# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'Seeding...'

demo_user = User.create!(email: 'demo@demo.com', password: 'password')
Profile.create!(age: 100, gender: 'none', display_name: 'Demo User', user: demo_user)

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

puts 'Finished'
