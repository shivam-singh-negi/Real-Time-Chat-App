# Real-Time Chat Application

## Author: Shivam Singh Negi

## Tech Stack: MERN Stack (MongoDB, Express, React, Node.js) + Socket.io

### Description
A real-time chat application using Socket.io that allows users to:
- Register and log in
- See active users
- Send text messages and emojis in real-time

---

## Installation Guide

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- MongoDB (or an online MongoDB Atlas cluster)
- npm (Node Package Manager)

### Steps to Install
1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Navigate into each directory (`Client`, `Server`, and `Socket`) and install dependencies**
   ```sh
   cd Client && npm install
   cd ../Server && npm install
   cd ../Socket && npm install
   ```

4. **Set up the database connection**
   - Inside the `Server` directory, create a `.env` file and add the following variables:
     ```env
     DB_URI=your_mongo_db_connector
     JWT_SECRET_KEY=your_jwt_secret_key  # Can be any random secure key
     PORT=5000  # You can change this port if needed
     ```

5. **Set up the Socket server**
   - Inside the `Socket` directory, create a `.env` file and add the following:
     ```env
     PORT=3000  # Choose any port, but it should be different from the server port
     ```

---

## Running the Application

Follow these steps to start the application:

1. **Start the backend server**
   ```sh
   cd Server
   nodemon
   ```

2. **Start the frontend**
   ```sh
   cd Client
   npm run dev
   ```

3. **Start the Socket server**
   ```sh
   cd Socket
   node index.js
   ```

Now, the application is running! Open the frontend in your browser and start chatting in real-time.


## Features
- User authentication (Register/Login)
- Active user status
- Real-time messaging with Socket.io
- Support for emojis and text


App Preview->

https://github.com/shivam-singh-negi/Real-Time-Chat-App/assets/56045882/86150ac2-e633-4039-93fc-51b3c12091c3

