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

  def create
    beer = Beer.create(beer_params)
    if beer.valid?
      render json: beer, status: :created
    else
      render json: { errors: beer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    beer = Beer.find_by(id: params[:id])
    if beer
      beer.destroy
      head :no_content
    else
      render_not_found_response
    end
  end


  # def highRating

  #   beers = Beer.where()

  # end

  private
  # all methods below here are private

  def beer_params
    params.permit(:abv, :brewery, :id, :name, :reviews, :style)
  end

end
