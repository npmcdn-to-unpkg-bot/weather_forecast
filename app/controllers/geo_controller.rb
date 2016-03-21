class GeoController < ApplicationController
  helper GeoHelper

  #lat, long are accurate only for zipcodes.
  def lookup
    if params[:query]
      geodata = case params[:type]
        when 'zipcode'
          Geodatum.select('zipcode, state, city').where('zipcode LIKE ?', "#{params[:query]}%")
        when 'city'
          Geodatum.select('city, state').where('city LIKE ?', "#{params[:query]}%").distinct(true)
        when 'state'
          Geodatum.select('state').where('state LIKE ?', "#{params[:query]}%").group(:state)
      end

      render json: geodata
    end
  end

  def all
    geodata = Geodatum.all
    render json: geodata
  end
end
