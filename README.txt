TLDR: 
    - Express backend connected to MongoDB 
    - React frontend

TO RUN DEMO -------------------------------------------
    - cd in frontend folder
    - npm install
    - cd into backend folder
    - npm install
    - .env file is required to run the backend application 
        - backend/.env
        - Please see the email for the .env file.
    - npm run servers (this runs both the frontend and backend servers concurrently)
        - ensure you are in the backend folder when running this command

    - frontend is on localhost:3000 in your browser
    - backend is running on localhost:8080

    - test api calls are made using rest client (vscode extension)
        - api calls are in the routes.rest file
       

########################################################################################


BACKEND


The application is structured in a MVC (Model View Controller) pattern. 
The models are the schemas for the MongoDB database. The models handle the data and the logic for the data.
The controllers are the functions that are called when a request is made to the server. 
The routes are the endpoints that are called when a request is made to the server.


- To run the backend application alone, run the following commands in the backend folder:

    - npm install
    - npm start
    - .env file is required to run the backend application 
        - backend/.env
        - Please see the email for the .env file.
    - responses with be shown on localhost:8080 in your browser

            
API Routes ---------------------------------------

    - /facility
        - GET 
            - returns all facilities in the database
        - POST
            - creates a new facility object in the db
            - name (string), address (string), and parking (int) are required
            - name and address must be unique
        
    - /facility/:name
        - GET
            - returns a facility object with data from db