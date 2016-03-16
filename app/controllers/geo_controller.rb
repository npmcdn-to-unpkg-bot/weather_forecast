class GeoController < ApplicationController
  helper GeoHelper

  def lookup
    if params[:query]
      if /^[0-9]*$/.match(params[:query])
        geodata = Geodatum.where('zipcode LIKE ?', "#{params[:query]}%")
      else
        geodata = Geodatum.where('state LIKE ? OR city LIKE ?', "#{params[:query]}%", "#{params[:query]}%").distinct(true)
      end

      render json: geodata
    end
  end

  def all
    geodata = Geodatum.all
    render json: geodata
  end
end
