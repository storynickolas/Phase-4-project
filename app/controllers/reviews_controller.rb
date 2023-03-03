class ReviewsController < ApplicationController

    #GET /Review
    def index
      render json: Review.all
    end

end
