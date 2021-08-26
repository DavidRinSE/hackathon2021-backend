Express Sequelize Postgres stack created with this guide because it has been a very long time https://dev.to/richienabuk/setting-up-express-js-rest-api-postgres-and-sequelize-orm-with-es6-4m08

# Endpoints

## /provider

 - POST: Creates a new provider account
     - Request body: { username: string, password: string, email: string (email format checked before saving)}

## /login

 - POST: Log in a provider account
     - Request body: { username||email: string, password: string} username or email can be used

## /location

 - POST: Create a new location
     - Authenticated with bearer token from login endpoint
     - Request body: {"username": string, "streetAddress": string, "zipCode": int, "city": string, "state": string}
 - GET: Get a list of locations
     - Searching is available with query params
     - City search query: ?city=

## /item

 - POST: Create a new item
     - Authenticated with bearer token from login endpoint
     - Request body: {"locationId": int, "name": string, "username": string}
 - GET: Get a list of items
     - Searching is available with query params
     - City search query: ?city=
 - DELETE: Removes an Item after confirmed pickup
     - Authenticated with bearer token from login endpoint
     - Request body: {"itemId": int, "username": string}

## /item/pending

 - POST: Sets an item to pending pickup
     - Authenticated with bearer token from login endpoint
     - Request body: {"itemId": int, "username": string}

## /item/cancelPending

 - POST: Sets an item to not pending if canceled
     - Authenticated with bearer token from login endpoint
     - Request body: {"itemId": int, "username": string}