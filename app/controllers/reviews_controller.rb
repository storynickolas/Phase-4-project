class ReviewsController < ApplicationController
  before_action :review_owner
  skip_before_action :review_owner, only: [:index]
  #Test Functions

    def show
      render json: @review
    end

    def index
      render json: Review.all
    end

  #project functions

    def create
      review = Review.create(review_params)
      render json: review, status: :created
    end

    def destroy
        @review.destroy
        head :no_content
    end

    def update
      @review.update(review_params)
      render json: @review
    end

    private
    # all methods below here are private
  
    def review_params
      params.permit(:beer_id, :user_id, :review, :rating)
    end

    def review_owner
      @review = Review.find_by(id: params[:id])
      if @review && @review.user_id == session[:user_id]
        return @review
      elsif @review
        render json: {errors: ["Not Authorized"]}, status: :unauthorized
      else
        render json: {errors: ["Review Does Not Exist"]}, status: :not_found
      end
    end

end
