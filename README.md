# Message Queue Manager

Welcome to the **Message Queue Manager**! This project lets you manage message queues through a simple web interface. You’ll have two parts to work with:

1. A **server** built with **Node.js** and **Express**, providing the backend API for managing queues and messages.
2. A **client** built with **React**, which talks to the server and lets you interact with the queues.

## What You’ll Need

Before you begin, make sure you have the following installed on your computer:

- [Node.js](https://nodejs.org/) (which comes with npm)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) for managing packages

## Getting Started with the Backend

1. **Clone the repo**:
   Open your terminal and run:
   ```bash
   git clone https://github.com/your-username/message-queue-manager.git
   cd message-queue-manager/server

2.Install the dependencies: Inside the server folder, run:
   ```bash
    npm install
```
3.Start the server: To get the backend server running, run:
   ```bash
    npm start
```
The backend will now be available at http://localhost:3000.

# Server Endpoints
### **POST /api/{queue_name}**
Adds a new message to the specified queue.

### **GET /api/{queue_name}**
Retrieve the next message from the queue

### **GET /api/queues**
Get a list of all available queues with their message counts.

# Client Setup 
1.Navigate to the client directory:
   ```bash
   cd ../client
```
2.Install dependencies:
   ```bash
  npm install
```
3.Run the Client
   ```bash
 npm start
```
This will start the React development server on http://localhost:5173




