# Backend Codebase Documentation

This documentation provides an overview of the backend codebase for the application. It includes information about the structure of the codebase, the technologies used, and instructions for running the server.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

The backend codebase utilizes the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- Express OpenID Connect
- Express OAuth2 JWT Bearer

## Project Structure

The project structure is organized as follows:

- `server.js`: The main entry point of the application.
- `models/`: Contains the Mongoose models for the database schema.
- `db.config.js`: Configuration file for connecting to MongoDB.
- `README.md`: This documentation file.

## Installation

To install the necessary dependencies, run the following command:
```npm install```

## Running the Server

To start the server, use the following command:

```npm start```

The server will run on port 5000 by default. You can change the port by modifying the `app.listen` line in `server.js`.

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/report`: Creates a new report in the database.
- `GET /testing`: Retrieves user information from the authentication provider.
- `GET /api/report`: Retrieves reports from the database, with optional sorting.

Please refer to the codebase for detailed information on the request and response structures for each endpoint.

## Contributing

Contributions to the codebase are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
