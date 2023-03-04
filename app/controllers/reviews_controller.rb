class ReviewsController < ApplicationController
  skip_before_action :authorized

    def show
      review = Review.where(:id => params[:id])
      render json: review
    end

    #GET /Review
    def index
      render json: Review.all
    end

    def create
      review = Review.create(review_params)
      render json: review, status: :created
    end

    def destroy
      review = Review.find_by(id: params[:id])
      # if user
        review.destroy
        head :no_content
      # else
      #   render_not_found_response
      # end
    end

    private
    # all methods below here are private
  
    def review_params
      params.permit(:beer_id, :user_id, :review, :rating)
    end
  

end
