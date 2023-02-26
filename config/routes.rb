Rails.application.routes.draw do
  

  resources :reviews
  resources :beer_styles
  resources :beers
  resources :breweries
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  get "/users", to: "users#index"
  delete "/logout", to: "sessions#destroy"

  get "/styles", to: "beers#style"

  resources :users, only: [:index, :create, :destroy]
end
