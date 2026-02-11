# smart-task-manager

---

# Smart Task Manager

Smart Task Manager is a full-stack task management application built with Node.js, Express, and MongoDB.  
The system demonstrates secure authentication, role-based access control, RESTful API design, and production-ready architecture.

---

## Table of Contents

- Overview
- Features
- Technology Stack
- Architecture
- Installation
- Environment Variables
- API Endpoints
- Security
- Deployment

---

## Overview

This application allows users to create and manage tasks while enforcing strict access control rules.

The project demonstrates:

- REST API design principles
- JWT-based stateless authentication
- Password hashing with bcrypt
- Role-Based Access Control (RBAC)
- Owner-based data protection
- Pagination, filtering, and sorting
- Secure backend architecture

---

## Features

- User registration and login
- JWT authentication
- Role system (User / Admin)
- Task CRUD operations
- Pagination
- Search and filtering
- Smart overdue detection
- Admin management endpoints
- Server-side validation
- Rate limiting
- Environment-based configuration

---

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

### Frontend
- HTML
- Vanilla JavaScript (Fetch API)

### Deployment
- Render
- MongoDB Atlas

---

## Architecture

The project follows an MVC-inspired structure:

```

src/
├── config/        # Database configuration
├── controllers/   # Business logic
├── middleware/    # Authentication and authorization
├── models/        # Mongoose schemas
├── routes/        # API endpoints
└── app.js         # Application entry point

````

The application uses:

- Stateless authentication via JWT
- Middleware-based request processing
- Role-based access control
- Owner-based data enforcement at query level

---

## Installation

### 1. Clone repository

```bash
git clone <repository-url>
cd smart-task-manager
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the project root:

```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/smart_task_manager
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 4. Run development server

```bash
npm run dev
```

Application will be available at:

```
http://localhost:4000/login.html
```

---

## Environment Variables

| Variable       | Description                |
| -------------- | -------------------------- |
| PORT           | Server port                |
| MONGO_URI      | MongoDB connection string  |
| JWT_SECRET     | Secret key for JWT signing |
| JWT_EXPIRES_IN | Token expiration time      |

---

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
POST   /api/tasks/smart/overdue
```

Supports query parameters:

* page
* limit
* status
* priority
* q (search)
* sort

### Admin

```
GET    /api/admin/users
GET    /api/admin/tasks
DELETE /api/admin/users/:id
```

Admin routes require role authorization middleware.

---

## Security

The application implements the following security measures:

* Server-side validation
* Password hashing with bcrypt and salt
* JWT verification middleware
* Role-based access control
* Owner-level data protection
* Rate limiting
* Environment variable configuration
* Stateless authentication architecture

---

## HTTP Status Codes Used

| Code | Meaning          |
| ---- | ---------------- |
| 200  | Success          |
| 201  | Resource created |
| 400  | Bad request      |
| 401  | Unauthorized     |
| 403  | Forbidden        |
| 404  | Not found        |
| 500  | Server error     |

---

## Deployment

The backend can be deployed on:

* Render

Database hosted on:

* MongoDB Atlas

Environment variables must be configured in the hosting platform before deployment.

---

## Author

Final Project
Web Backend Development
Smart Task Manager

```

---

Если хочешь — могу сделать версию уровня “университетский проект с архитектурным обоснованием”, чтобы преподаватель вообще не к чему не придрался.
```

