# Real-Time-Chat-App
Author-Shivam Singh Negi
A real time chat application-
Tech Stack: MERN Stack


Description:
A real time chat application that using Socket Io. User can register, login and see who all are active and can send emojis and text.

Installing:
1)Clone the repo into your local system.
2) go to root directory  type : npm install
3) then Go inside each of Client, Server and Socket, and install the respective packages there using npm install.
4) Set Up connection with the database : Create a .env file inside Server and  paste the env variable there
inside of the .env we have=>
    DB_URI=Your monogo db connector
    JWT_SECRET_KEY=Your JWT secret key (can be any random one)
    Port=5000  (it can also be as per your desire)
5) Create the .env file inside the Socket dir as well :
 inside of the .env we have=>
 Port=3000 (can be any port no. but not same as of the server port used in Server directory)

6) How to run=>
   a) Go inside the Server =>type=> nodemon  (this will start the backend)
   b) Go inside the Client=>type=> npm run dev (this will start the frontend)
   c) Go inside of the Socket =>type=> node index.js (this will initiate the Socket server for real time message events)

Now play with the app and share it with your friends.


