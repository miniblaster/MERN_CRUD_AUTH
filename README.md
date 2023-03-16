# How to Run
1. Go to `/backend` and run `npm install` in command prompt. After the installation, run `npm start` to run the backend.
2. Go to `/frontend` and run `npm install` in command prompt. After the installation, run `npm start` to run the frontend.

# APIs
1. GET "/": Get all Tasks for loginned users.
2. POST "/auth/signup" with {email, password}: Signup a new user account with `email` and `password`.
3. POST "/auth/login" with {email, password}: Login with your `email` and `password`.
4. GET "/:id": Get a Task whose 'id' is `id` for loginned users.
5. POST "/add": Add a new Task for loginned users.
6. PUT "/update/:id": Update a Task whose 'id' is `id` for loginned users.
7. DELETE "/delete/:id": Delete a Task whose 'id' is `id` for loginned users.