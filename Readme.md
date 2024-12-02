# MrPrep Backend

Welcome to the backend repository for **MrPrep**, an SSC preparation app. This backend provides RESTful APIs for user authentication, question management, and other core functionalities.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

---

## About

The backend for **MrPrep** manages APIs for SSC exam preparation, user authentication, profile management, and more. This service is designed with scalability and performance in mind and uses MongoDB for data persistence.

---

## Features

- User registration and login with email verification.
- JWT-based authentication for secure sessions.
- CRUD operations for categories, topics, and questions.
- MongoDB for temporary and persistent storage.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 22 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd mrprep
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server:
   ```
   npm run start
   ```

### Tech Stack

- Node.js: Backend runtime
- Express.js: Web framework
- MongoDB: Database for persistent and temporary data storage
- JWT: For authentication
- nodemailer(npm package) -> to send mail
