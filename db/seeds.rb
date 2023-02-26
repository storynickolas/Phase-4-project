# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do
  User.create!(username: Faker::Creature::Animal.name, password_digest: Faker::Barcode.upc_a)
end

10.times do
  Beer.create!(name: Faker::Hipster.word + ' ' + Faker::Creature::Animal.name, abv: Faker::Beer.alcohol, style: Faker::Beer.style, brewery: Faker::Verb.ing_form + ' ' + Faker::Hipster.word)
end

10.times do
  Review.create!(rating: Faker::Number.within(range: 1..5), review: Faker::Coffee.notes, beer_id: Faker::Number.within(range: 1..10), user_id: Faker::Number.within(range: 1..10))
end

# brewery: Faker::Verb.ing_form + ' ' + Faker::Hipster.word



