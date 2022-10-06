app.js -------------------------------------------
    
    - sets up the express server on port 8080
    - connects to MongoDB database
    - sets up the routes
        - "/" home page
        - "/vehicle" vehicle api page
            
API Routes ---------------------------------------

    - /vehicle
        - GET (NOT IMPLEMENTED)
            - returns all vehicles in the database
        
    - /vehicle/:vin
        - GET
            - returns a vehicle object with data from NHSTA
        - POST
            - creates a new vehicle object with the given vin