# Beer Rating: React/Rails API APP

## Description

This project allows a user to view ratings and reviews on various made up craft beers generated using the Faker API.  On login or signup the user is able to create, edit, and remove their own reviws that will populate the list alongside the existing reviews.

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Render account
- Postgresql

See Environment Setup below for instructions on installing these tools if you
don't already have them.

## Setup

When you're ready to start using the app, run:

```sh
bundle install
rails db:create
npm install --prefix client
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)
