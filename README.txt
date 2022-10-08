TLDR: 
    - Express backend connected to MongoDB 
    - React frontend

TO RUN DEMO -------------------------------------------
    - cd into frontend folder
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
        - sample api calls are found in the routes.rest file
       

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

    -/vehicle
        - GET
            - returns all vehicles in the database
    
    -/vehicle/:vin
        - GET
            - returns a vehicle object with data from api

    - /facility
        - GET 
            - returns all facilities in the database
        
        - POST
            - creates a new facility object in the db
            - name (string), address (string), and number of parking spots (int) are required
            - name and address must be unique
        
    - /facility/:name
        - GET
            - returns a facility object with data from db
        - PUT
            - updates a facility object in the db
            - name (string), address (string), and number of parking (obj) are required
            - parking object format : [{"id" : 1, "occupied": true}, {"id" : 2, "occupied": false}]
                - can contain vehicle details as well
        
    - /history
        - GET
            - returns all history objects in the db

        - POST
            - creates a new history object in the db
            - takes in strings to create a new history object
                - vin, year, make, model, trim, facilityName, facilityAddress, 
                    parkingSpot, ownerName, ownerAddress, ownerPhone, 
                    checkInTime, checkOutTime, checkInAttendant, checkOutAttendant
            

########################################################################################


FRONTEND

- To run frontend application alone, run the following commands in the frontend folder:

    - npm install
    - npm start
    - react project will be shown on localhost:3000 in your browser

The frontend application contains a src folder with the following main folders

    - components
    - contexts
    - hooks
    - navigation
    - pages
    - styles

Pages ---------------------------------------

    - Home
        - contains Check In modal
            - takes in vehicle and owner information and checks in a vehicle
            - add this vehicle to the Valeted Vehicles page
        - contains Check Out
            - leads to Valeted Vehicles page

    - Facilities
        - choose a facility to view parking spots and lot capacity
        - clicking a parking spot will display information about the spot and the vehicle if there is one
            - Future improvements 
                - display info on hover
                - add a button to check out a vehicle

    - Valeted Vehicles
        - displays all vehicles currently valeted at the selected facility
        - can search vehicles by owner's phone number
        - clicking a vehicle will display information about the vehicle
            - confirm information is correct then check out the vehicle
                - removes vehicle from context and database
                - adds Check In History object to database

    - History
        - displays all Check In History objects in the database
        - can search history by owner's phone number


Components ---------------------------------------

    - Check In Modal
        - contains form to check in a vehicle
        - takes in vehicle and owner information
        - checks in a vehicle
        - add this vehicle to the Valeted Vehicles page

    - Check Out Modal
        - contains form to check out a vehicle
        - takes in attendant signature and check out time
        - checks out a vehicle
        - removes vehicle from facilities context and database
        - adds Check In History object to database


Context -------------------------------------

    - Facilities Context
        - contains all facilities in the database
            - sorted by name
        - can render a dropdown to select a facility
        - saves selected facility in local storage to persist through refreshes
        - contains all valeted vehicles in the database
        - if no facilities, displays a message to add a facility


Hooks ---------------------------------

    - useTimeout and useDebounce
        - used to debounce search input
        - used to delay search input to prevent unnecessary api calls


Navigation ---------------------------------

    - Navigation
        - contains navigation bar
        - contains routes to Home, Facilities, Valeted Vehicles, and History pages


Styles ---------------------------------

    - contains all css files

