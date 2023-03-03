class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.float :rating
      t.string :review
      t.integer :beer_id
      t.integer :user_id


      t.timestamps
    end
  end
end
