class BeerSerializer < ActiveModel::Serializer
  attributes :name, :abv, :reviews, :style, :brewery, :id
end
