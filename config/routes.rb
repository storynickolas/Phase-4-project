Rails.application.routes.draw do


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#destroy"

  get "/styles", to: "beers#style"
  get "/styles/:style", to: "beers#beers"
  get "/beers", to: "beers#index"

  patch "/reviews/:id", to: "reviews#update"
  delete "/reviews/:id", to: "reviews#destroy"
  post "/reviews/add", to: "reviews#create"

  get "/me", to: "users#show"

  resources :users, only: [:create, :destroy]
end
