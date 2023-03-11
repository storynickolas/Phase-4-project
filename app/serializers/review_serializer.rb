class ReviewSerializer < ActiveModel::Serializer
  attributes :rating, :review, :user_id, :beer_id
end
