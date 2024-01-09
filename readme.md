# Setting up API
### 1 Download files from git repo.
### 2 run command "npm install" to install all dependencies.
### 3 run command "node index.js" to start the api.

## AUTHORIZATION

This api contains authorization which allows only authorized  users to access proteted api endpoints.
*For testing 
{
    "email":"pragatiazad2001@gmail.com",
    "password": "1111"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWdhdGlhemFkMjAwMUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NTYyMzQxNTNmYmE3MGI4MThlOWQwN2EiLCJpYXQiOjE3MDA5ODE5MDUsImV4cCI6MTcwMTg0NTkwNX0.vXdCN2M6piKYsdDRIwWz4k4kjN-dfB7mcrf6zZG8YaE"
}
above is a authorized user with respective email and password and token

token==eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWdhdGlhemFkMjAwMUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NTYyMzQxNTNmYmE3MGI4MThlOWQwN2EiLCJpYXQiOjE3MDA5ODE5MDUsImV4cCI6MTcwMTg0NTkwNX0.vXdCN2M6piKYsdDRIwWz4k4kjN-dfB7mcrf6zZG8YaE

***HOW TO INCLUDE THIS TOKEN IN HEADER***

KEY:authorization
VALUE : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWdhdGlhemFkMjAwMUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NTYyMzQxNTNmYmE3MGI4MThlOWQwN2EiLCJpYXQiOjE3MDA5NDA3NjIsImV4cCI6MTcwMDk1ODc2Mn0.DL4sI3n7h91DvzEcApvR-fF9N-9KQfdNGOLwTHYgANE .               
*******************************************TESTING THE API**********************************************

***USERS ROUTES***

*** \\POST REQUEST\\  SIGNUP ROUTE URL--->(localhost:3000/users/signup/) :
This is a route to create a new user.
Input format: 
                {
                "name":"pragati",
                "email":"pragatiazad2001@gmail.com",
                "password":"1111"
               }
then api will check the email already exists or not . if exists it will not create new user and will
show message "User with this email already exists" else it will create new user and will show message 
"User SignedUp Successfully.



*** \\POST REQUEST\\  LOGIN ROUTE URL--->(localhost:3000/users/login/)
Input format: 
                {
                "name":"pragati",
                "email":"pragatiazad2001@gmail.com",
                "password":"1111"
               }
then if the email and password are correct then user will be loggedin successfully else not.
if user logged in successfully api will show message "Authentication successfull" and will show jwt token 
for the user ex.{message:"Authentication successfull",token:token} this token is used for authentication
else "Authentication failed"


***TASKS ROUTES***

1) CREATE A  NEW TASK:
\\POST REQUEST\\  CREATE NEW TASK ROUTE URL--->(localhost:3000/tasks/)
INPUT FORMAT:
            "Task": {
            "title": "gym",
            "description": "dunbell",
            "assigned_user": "pragati",
            "due_date": "2023-12-11",
            "completionStatus": false,
            "completionTime": "2023-11-26",
        }
Making a post request to localhost:3000/tasks/ and providing input in the above format creates a new task.

2) GET ALL CREATED TASK:
\\GET REQUEST\\  GET ALL TASK URL --->(localhost:3000/tasks/)
Making a get request to localhost:3000/tasks/ this route shows and the created tasks.
OUTPUT FORMAT:
            "Tasks": [
                {
                    "_id": "6562d42f2a83f8eb172754e4",
                    "title": "gym",
                    "description": "dunbell",
                    "assigned_user": "pragati",
                    "due_date": "2023-12-11T00:00:00.000Z",
                    "completionStatus": false,
                    "completionTime": "2023-11-26T05:14:23.900Z",
                    "createdAt": "2023-11-26T05:14:23.905Z",
                    "updatedAt": "2023-11-26T05:16:11.359Z",
                    "__v": 0
                },
                {
                    "_id": "6562d529990573703048cdf9",
                    "title": "api",
                    "description": "backend",
                    "assigned_user": "unnati",
                    "due_date": "2023-12-11T00:00:00.000Z",
                    "completionStatus": false,
                    "completionTime": "2023-11-26T05:18:33.979Z",
                    "createdAt": "2023-11-26T05:18:33.980Z",
                    "updatedAt": "2023-11-26T05:18:33.980Z",
                    "__v": 0
                }
            ]
3) GET TASK BY ID:

\\GET REQUEST\\  GET A SPECIFIC TASK  URL --->(localhost:3000/tasks/:Id/)
Making a get request to localhost:3000/tasks/:Id/ (ex: localhost:3000/tasks/6562d42f2a83f8eb172754e4) will give a task with a provided id.
OUTPUT FORMAT:
            "Task": {
                "_id": "6562d42f2a83f8eb172754e4",
                "title": "gym",
                "description": "dunbell",
                "assigned_user": "pragati",
                "due_date": "2023-12-11T00:00:00.000Z",
                "completionStatus": false,
                "completionTime": "2023-11-26T05:14:23.900Z",
                "createdAt": "2023-11-26T05:14:23.905Z",
                "updatedAt": "2023-11-26T05:16:11.359Z",
                "__v": 0
            }
4) UPDATE A CREATED TASK:
\\PATCH REQUEST\\  UPDATE A SPECIFIC TASK  URL --->(localhost:3000/tasks/:Id/)
[NOTE : If the task with the given id does not exist it will show "No task with this id exist"]
INPUT FORMAT:(THIS WILL CONTAIN FIELDS TO UPDATE)
            {       
                "due_date": "2023-12-11",
                "completionStatus": false
            }
Making a patch request to localhost:3000/tasks/:Id/ (ex: localhost:3000/tasks/6562d42f2a83f8eb172754e4) will update a task with a specific id.(ex: in above input we are updating due date and completionstatus)

5) DELETE CREATED TASK:
\\DELETE REQUEST\\  DELETE A SPECIFIC TASK  URL --->(localhost:3000/tasks/:Id/)
[NOTE : If the task with the given id does not exist it will show "No task with this id exist"]

Making a delete request to localhost:3000/tasks/:Id/ deletes a task with provided id.ex(DELETE localhost:3000/tasks/6562d42f2a83f8eb172754e4  deletes a task with id 6562d42f2a83f8eb172754e4)

6) GET TASKS COMPLETED WITHIN LAST "N" DAYS:(HERE "N" CAN BE 7,6 ETC AS PER OUR NEED):
\\GET REQUEST\\  GET COUNT OF ALL TASK COMPLETED WITHIN "N" DAYS  URL --->(localhost:3000/tasks/analytics/completed-last-days/:numberOfDays)

Making a get request to localhost:3000/tasks/analytics/completed-last-days/:numberOfDays this route gives a count of all the tasks completed in provided number of days.
(ex. localhost:3000/tasks/analytics/completed-last-days/7 gives count of all completed task in last 7 days.)









 




