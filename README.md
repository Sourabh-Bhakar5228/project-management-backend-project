# Multi-Role Project Management System API

A robust REST API for a Project Management System where companies can manage users, projects, and tasks, with strict role-based access and multi-tenancy.

## Tech Stack

- Node.js with Express.js
- MongoDB (Mongoose ODM)
- JWT (with refresh token support)
- dotenv for environment config

## Features

- Multi-tenancy: Users can only access data from their own company
- Authentication: JWT-based login + refresh token
- Authorization:
  - Admin: Full access to all company data
  - Manager: Can manage projects & tasks, but not users
  - Member: Can view and update assigned tasks only
- CRUD Operations for Companies, Users, Projects, and Tasks
- Pagination on listing endpoints
- Search/Filter: Tasks by status and assignee
- Validation using Joi
- Rate Limiting per IP
- Centralized Error Handling middleware

## Getting Started

### Prerequisites

- Node.js (>= 14)
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb+srv://golubhakar5228:JAAT5228@cluster0.n1zz5cn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   JWT_SECRET=secret_jwt_key_for_project_management_app
   JWT_REFRESH_SECRET=refresh_secret_jwt_key_for_project_management_app
   JWT_EXPIRES_IN=1h
   JWT_REFRESH_EXPIRES_IN=7d
   NODE_ENV=development
   ```
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user (requires authentication)
- `GET /api/auth/me` - Get current user profile (requires authentication)

### Companies

- `POST /api/companies/register` - Register a new company and admin user
- `GET /api/companies` - Get all companies (SuperAdmin only)
- `GET /api/companies/:companyId` - Get company by ID (Admin only)
- `PUT /api/companies/:companyId` - Update company by ID (Admin only)
- `DELETE /api/companies/:companyId` - Delete company by ID (Admin only)

### Users

- `POST /api/users` - Create a new user (Admin only)
- `GET /api/users` - Get all users in company (Admin only)
- `GET /api/users/:userId` - Get user by ID (Admin only)
- `PUT /api/users/:userId` - Update user by ID (Admin only)
- `DELETE /api/users/:userId` - Delete user by ID (Admin only)

### Projects

- `POST /api/projects` - Create a new project (Admin/Manager)
- `GET /api/projects` - Get all projects (All roles)
- `GET /api/projects/:projectId` - Get project by ID (All roles)
- `PUT /api/projects/:projectId` - Update project by ID (Admin/Manager)
- `DELETE /api/projects/:projectId` - Delete project by ID (Admin/Manager)

### Tasks

- `POST /api/tasks` - Create a new task (Admin/Manager)
- `GET /api/tasks` - Get all tasks with filters (All roles, Members only see assigned tasks)
- `GET /api/tasks/:taskId` - Get task by ID (All roles, Members only see assigned tasks)
- `PUT /api/tasks/:taskId` - Update task by ID (Admin/Manager/Member, but Members can only update status)
- `DELETE /api/tasks/:taskId` - Delete task by ID (Admin/Manager)

## Filtering Tasks

Tasks can be filtered by:

- Status: `?status=To Do` or `?status=In Progress` or `?status=Done`
- Assignee: `?assignedTo=userId` (Admin/Manager only)
- Project: `?projectId=projectId`

## Pagination

All listing endpoints support pagination with:

- `?page=1` - Page number (default: 1)
- `?limit=10` - Items per page (default: 10)

## Running Tests

```
npm test
``` 

## Access Api end point (if rund at localhost)
http://localhost:3000/api-docs