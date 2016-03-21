class CreateForecastCaches < ActiveRecord::Migration
  def change
    create_table :forecast_caches do |t|
      t.string :name, limit: 100, null: false
      t.text :value

      t.timestamps null: false
    end
    add_index :forecast_caches, :name, unique: true
  end
end
