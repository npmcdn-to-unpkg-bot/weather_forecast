class ForecastController < ApplicationController
  def index

  end

  def get_report
    if params[:lat] && params[:long]
      url = URI(Rails.configuration.x.forecast_service_url + params[:lat] + ',' + params[:long])

      forecast_hash = JSON.parse(Net::HTTP.get(url))
      #puts forecast_hash["daily"]["summary"]
      render json: JSON.generate(forecast_hash["daily"])
    else
      render :status => :bad_request
    end

    #res = Net::HTTP.get_response(uri)
    #puts res.body if res.is_a?(Net::HTTPSuccess)
  end
end
