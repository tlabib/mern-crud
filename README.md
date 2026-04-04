# MERN Task Manager CRUD Application

## Authentication Details:

User credentials 

email:
```tmlabib@gmail.com```
pass:  ```password```

Admin: ```admin@gmail.com```
pass: ```password```


## Project Overview

This project is a full-stack CRUD Task Management application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system allows users to register, login, manage tasks, and includes admin functionality with role-based access control. The project also demonstrates CI/CD practices and cloud deployment using AWS EC2.

---

## Features

### Backend Features
- User registration and login
- JWT authentication
- Password hashing using bcrypt
- Task CRUD operations
- Role-based authorization (Admin/User)
- Protected API routes
- MongoDB Atlas database integration

### Frontend Features
- User login and registration pages
- Task dashboard
- Profile management
- Admin dashboard
- Protected routes
- Responsive UI using React

### DevOps Features
- GitHub version control
- Branching strategy
- GitHub Actions CI pipeline
- AWS EC2 deployment
- PM2 process management

---

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS (if used)

### DevOps
- GitHub
- GitHub Actions
- AWS EC2
- PM2

---

## Project Structure
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
└── package.json

frontend/
│
├── src/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── App.js
│ └── axiosConfig.js
└── package.json


---

## Installation Guide

### Clone repository

``` git clone https://github.com/tlabib/mern-crud.git ```

``` cd mern-crud ```


---

```npm run install-all```

---

## Backend Setup

Go to backend folder:


```cd backend```

Create `.env` file:

gnxtdap.mongodb.net/taskmanager?appName=Cluster0
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZCA3Yx8mF3Bl0kch6HYtFs=
PORT=5001



Run backend:


npm run dev


Backend runs on:


http://localhost:5001


---

## Frontend Setup

Go to frontend folder:


cd frontend

```cd src```

frontend axios file  setup 
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5001', // local
  //baseURL: 'http://3.26.96.188:5001', // live
  baseURL: 'http://3.104.119.251:5001', // live my public ip
  headers: { 'Content-Type': 'application/json' },
});


Run frontend:


npm start


Frontend runs on:


http://localhost:3000


---

## Running Full Project Locally

From root folder:


npm run dev


This starts:
- Backend on port 5001
- Frontend on port 3000

---

## API Endpoints

### Authentication

Register:

POST /api/auth/register


Login:

POST /api/auth/login


Profile:

GET /api/auth/profile


---

### Tasks

Get tasks:

GET /api/tasks


Create task:

POST /api/tasks


Update task:

PUT /api/tasks/:id


Delete task:

DELETE /api/tasks/:id


---

### Admin

Admin dashboard:

GET /api/admin


(Admin access required)

---

## Deployment

Backend deployed on AWS EC2:


http://3.104.119.251:5001


Frontend:


http://3.104.119.251:3000


Process manager used:


pm2


Check status:


pm2 status


---

## CI/CD Pipeline

CI implemented using GitHub Actions.

Pipeline steps:

- Checkout repository
- Setup Node.js
- Install dependencies
- Run tests

CI triggers:

- Push to main
- Pull requests

Workflow file:


.github/workflows/ci.yml


---

## Security Features

- JWT authentication
- Password hashing
- Protected routes
- Admin role verification
- Environment variables

---

## Challenges Faced

- CORS errors during deployment
- EC2 port configuration
- MongoDB Atlas connection setup
- GitHub Actions YAML errors
- EC2 public IP changes

---

## Future Improvements

- Task priority filtering
- Email notifications
- Docker containerization
- Nginx reverse proxy
- Automated deployment pipeline

---

## Author

Name: *Your Name*  
Course: IFN636 Software Life Cycle Management  
Institution: QUT

---

## References

Node.js Documentation  
https://nodejs.org

React Documentation  
https://react.dev

MongoDB Documentation  
https://mongodb.com

AWS EC2 Documentation  
https://docs.aws.amazon.com/ec2/

GitHub Actions Documentation  
https://docs.github.com/actions

---

## License

This project is developed for academic purposes.