class BeersController < ApplicationController
  skip_before_action :authorized, only: [:index, :beers, :style, :highRating]

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

  def highRating
    respectable = []
    beers = Beer.all
    beers.each do |n|
      rating = []
      if n.reviews.length > 0
        n.reviews.each do |n|
          rating.push(n.rating)
        end
        aRate = rating.sum / rating.length
        if aRate >= 3
          respectable.push(n)
        end
      end
    end
    render json: respectable
  end

  #Require Login

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
      render json: {errors: ["Beer Does Not Exist"]}, status: :not_found
    end
  end

  private
  # all methods below here are private

  def beer_params
    params.permit(:abv, :brewery, :id, :name, :reviews, :style)
  end

end
