class Beer < ApplicationRecord
  has_many :reviews

  validates :name, presence: true
  validates :abv, presence: true
  validates :brewery, presence: true
  validates :style, presence: true
end
