class GeoController < ApplicationController
  helper GeoHelper

  def lookup
    if params[:query]
=begin
      if /^[0-9]*$/.match(params[:query])
        geodata = Geodatum.select("zipcode, state, city").where('zipcode LIKE ?', "#{params[:query]}%")
      else
        geodata = Geodatum.select("state, city").where('state LIKE ? OR city LIKE ?', "#{params[:query]}%", "#{params[:query]}%").distinct(true)
      end
=end

      geodata = case params[:type]
        when 'zipcode'
          Geodatum.select("zipcode, state, city").where('zipcode LIKE ?', "#{params[:query]}%")
        when 'city'
          Geodatum.select("state, city").where('city LIKE ?', "#{params[:query]}%").distinct(true)
        when 'state'
          Geodatum.select("state, city").where('state LIKE ?', "#{params[:query]}%").distinct(true)
      end

      render json: geodata
    end
  end

  def all
    geodata = Geodatum.all
    render json: geodata
  end
end
