class CreateBeers < ActiveRecord::Migration[6.1]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :abv
      t.string :style
      t.string :brewery

      t.timestamps
    end
  end
end
