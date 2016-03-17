class GeodataModifyState < ActiveRecord::Migration
  def change
    change_column :geodata, :state, :string, :limit => 25
  end

  def down
    change_column :geodata, :state, :string, :limit => 2
  end
end
