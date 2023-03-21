class BeersController < ApplicationController
  skip_before_action :authorized


  def index
    render json: Beer.all
  end

  def style
    beers = Beer.all.uniq { |p| p.style }
    render json: beers.to_json(only: [:style])
  end

  def beers
    beers = Beer.where(:style => params[:style])
    if beers
      render json: beers
    else
      render_not_found_response
    end
  end

  # def highRating

  #   beers = Beer.where()

  # end

end
