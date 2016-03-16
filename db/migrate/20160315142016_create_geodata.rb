class CreateGeodata < ActiveRecord::Migration
  def change
    create_table :geodata do |t|
      t.string :zipcode, limit: 11, null: false
      t.string :state, limit: 2, null: false
      t.string :city, limit: 45, null: false
      t.decimal :lat, precision: 9, scale: 6, null: false
      t.decimal :long, precision: 9, scale: 6, null: false

    end
    add_index :geodata, :zipcode, unique: true
  end
end
