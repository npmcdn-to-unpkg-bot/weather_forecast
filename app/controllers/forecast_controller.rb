class ForecastController < ApplicationController

  def index

  end

  # Gets forecast report either from db or from forecast.io
  # Input params - :area_type, :zipcode, :city, :state
  # Output - json with "daily" forecast data
  def get_report
    # Formulate the cache name from params and get latitude/longitude from db
    cache_name = ''
    if params[:area_type]
      if params[:area_type] == 'zipcode' && params[:zipcode]
        cache_name = 'zipcode_' + params[:zipcode]
        geodata = Geodatum.select('lat, `long`').where(zipcode: params[:zipcode]).take
      elsif params[:area_type] == 'state' && params[:state]
        cache_name = 'state_' + params[:state].to_s.gsub(/\s/, '_')
        geodata = Geodatum.select('lat, `long`').where(state: params[:state]).take
      elsif params[:area_type] == 'city' && params[:city] && params[:state]
        cache_name = 'city_state_' + params[:city].to_s.gsub(/\s/, '_') + '_' + params[:state].to_s.gsub(/\s/, '_')
        geodata = Geodatum.select('lat, `long`').where(state: params[:state], city: params[:city]).take
      else
        render :status => :bad_request
      end
    else
      render :status => :bad_request
    end
    cache_name.downcase!

    if forecast_cache = ForecastCache.find_by_name(cache_name)
      daily_forecast_json = forecast_cache.value
    else
      url = URI(Rails.configuration.x.forecast_service_url + geodata.lat.to_s + ',' + geodata.long.to_s + '?units=si&exclude=currently,minutely,hourly,flags')
      forecast_hash = JSON.parse(Net::HTTP.get(url))
      # Use with this style forecast_hash["daily"]["summary"]
      daily_forecast_json = JSON.generate(forecast_hash["daily"])
      forecast_cache = ForecastCache.create(name: cache_name, value: daily_forecast_json)
      forecast_cache.save
    end
    render json: daily_forecast_json
  end

end

