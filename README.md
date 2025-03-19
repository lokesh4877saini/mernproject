# E-Commerce Project

## Overview
This project is an e-commerce web application built with React for the frontend, SCSS for styling, MongoDB as the database, and Node.js(Express) for the backend.
## Features
**Product Listing**: Browse through a variety of products with detailed descriptions. **User Authentication**: Secure signup and login functionality. **Shopping Cart**: Add products to cart and manage items before checkout. **Admin Panel**: Manage products, orders, and users (admin-only)
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/lokesh4877saini/mernproject.git
   cd repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define environment variables for MongoDB connection string, API keys, etc.

4. Start the development server:
   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

## Folder Structure
```
├── client/             # React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── store/
│       └── App.jsx
├── server/             # Node.js backend
│      ├───config
|      ├───controllers
|      |───middleware
|      |───models
|      ├───routes
|      ├───utils
|      └───views
└── README.md
```
## Status
This project is still a work in progress. More features and improvements are coming soon!
