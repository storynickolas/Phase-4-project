class ReviewsController < ApplicationController

    # def show
    #   review = Review.where(:id => params[:id])
    #   render json: review
    # end

    # #GET /Review
    # def index
    #   render json: Review.all
    # end

    def create
      review = Review.create(review_params)
      render json: review, status: :created
    end

    def destroy
      review = Review.find_by(id: params[:id])
      if review
        review.destroy
        head :no_content
      else
        render_not_found_response
      end
    end

    def update
      review = Review.find_by(id: params[:id])
      if review
        review.update(review_params)
        render json: review
      else
        render_not_found_response
      end
    end

    private
    # all methods below here are private
  
    def review_params
      params.permit(:beer_id, :user_id, :review, :rating)
    end
  

end
