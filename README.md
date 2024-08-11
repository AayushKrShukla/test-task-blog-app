This project was created using Express, MongoDB, Node and React.

## Features
* Registration of an account
* Create, edit blogs
* JWT for authentication
* Protected Routes accessible only by logged in users
* Concurrency Control to disallow multiple edits to a blog
* Added background job to unlock blogs after a certain period on inactivity

## To run locally
1. Clone this repository
```
git clone https://github.com/AayushKrShukla/test-task-blog-app.git
cd test-task-blog-app
```

### Prerequisites: You should have a mongo server running


The repo contains both the frontend and backend, it is recommened to start backend first


Before running the server please make sure you have a .env at the root of the backend folder
```
JWT_TOKEN_EXPIRES_IN=<time> example 1d
JWT_COOKIE_EXPIRES_IN=<numer> example 1
JWT_TOKEN_SECRET=<secret> example mysecretkey
MONGODB_URI=<token>
```

How to start backend server
```
cd backend
touch .env
npm install
npm run start
```


if you want to debug you can run
```
npm run dev
```


To run test cases you can run 
```
npm test
```


How to start frontend server
```
cd frontend
npm run dev
```


That's it you're ready to start



To register a new user you can go to `/register` route
Use `/login` to login as an existing user













