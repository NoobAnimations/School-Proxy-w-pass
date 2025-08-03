# Password-Protected Proxy

This project is a password-protected web proxy that allows users to access specified URLs after entering the correct password. It is built using Node.js and Express, utilizing middleware for authentication and proxying requests.

## Features

- Password protection for accessing URLs.
- Proxying functionality to forward requests to the specified URL.
- Simple user interface for entering the URL and password.

## Project Structure

```
password-protected-proxy
├── src
│   ├── server.js          # Entry point of the application
│   ├── proxy
│   │   └── index.js       # Handles proxying of requests
│   ├── middleware
│   │   └── auth.js        # Middleware for password authentication
│   └── public
│       ├── index.html      # User interface
│       ├── styles.css      # CSS styles for the UI
│       └── script.js       # JavaScript for handling form submission
├── package.json            # npm configuration file
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd password-protected-proxy
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Open your web browser and go to `http://localhost:3000`.

3. Enter the desired URL and the password to access the proxied content.

## License

This project is licensed under the MIT License.