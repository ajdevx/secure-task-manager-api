# Secure Task Manager API

A secure backend API for managing tasks, built with Node.js, Express, MongoDB, and JWT-based authentication.

## Overview

**Secure Task Manager API** provides the backend for a task management application with authentication, secure sessions, and task-related workflows. The project is organized under the `backend/` directory and is implemented as a Node.js application using Express and Mongoose. It also includes support for security- and workflow-related packages such as bcrypt, cookie handling, file uploads, email notifications, and SMS integrations.

## Features

* User authentication with JSON Web Tokens (JWT)
* Password hashing with bcrypt
* Cookie-based session support
* Task management API endpoints
* MongoDB integration through Mongoose
* File upload support with Multer
* Email notifications with Nodemailer
* SMS support with Twilio
* Development workflow powered by Nodemon

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** JWT, bcrypt
* **Middleware:** cors, cookie-parser, dotenv
* **Utilities:** multer, nodemailer, twilio, nanoid
* **Dev Tooling:** nodemon

## Project Structure

```bash
secure-task-manager-api/
└── backend/
    ├── src/
    ├── package.json
    ├── package-lock.json
    └── .gitignore
```

## Getting Started

### Prerequisites

* Node.js
* npm
* MongoDB database

### Installation

```bash
git clone https://github.com/ajdevx/secure-task-manager-api.git
cd secure-task-manager-api/backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory and add the variables required by your application, such as:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any additional variables your app uses for email, SMS, uploads, or other services.

### Run the Application

```bash
npm start
```

This starts the app using Nodemon with:

```bash
node src/index.js
```

## Usage

Once the server is running, connect your frontend or API client to the available endpoints in the backend application. Protected routes should include the required JWT token in the request headers or cookies, depending on how authentication is implemented in `src/`.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Security Notes

* Store secrets in environment variables only.
* Never commit `.env` files.
* Use HTTPS in production.
* Validate all incoming requests.
* Protect sensitive routes with authentication and authorization middleware.

## Contributing

Contributions are welcome. Feel free to open issues or submit pull requests with improvements, bug fixes, or additional documentation.

## License

This project is licensed under the ISC License.

## Author

**Anurag Jha**
