Rails.application.routes.draw do
  

  resources :reviews
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
  get "/styles/:style", to: "beers#beers"


  patch "/reviews/:id", to: "reviews#update"

  resources :users, only: [:index, :create, :destroy]
end
