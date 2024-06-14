# GymBuddy Web Application

## Overview

GymBuddy is a web application designed to manage user profiles, track orders, view reports, and handle various integrations. The application is built using React, TypeScript, and Material-UI (MUI) for the UI components.

## Features

- **Navigation Drawer**: A left-side drawer with navigation links to Dashboard, Orders, Customers, Reports, and Integrations.
- **Header**: Includes navigation icons for Home, Profile, Settings, and Logout.
- **Home Page Layout**: Displays sections for Today, Recent Deposits, and Recent Orders with placeholder content.
- **User Profile Management**: View and edit user profile details, change password functionality, and avatar display.
- **Global Error Handling**: Centralized error handling using a global error context and Snackbar notifications.
- **API Integration**: Axios-based API calls for managing user data and other functionalities.
- **Password Encryption**: Encrypts passwords using JSEncrypt before sending them to the server.

## Project Structure

```
.
|-- README.md
|-- package-lock.json
|-- package.json
|-- public
|-- src
|   |-- api
|   |-- assets
|   |-- components
|   |   |-- Auth
|   |   |-- Error
|   |   |-- Layout
|   |   `-- Users
|   |-- context
|   |-- hooks
|   |-- pages
|   |-- routes
|   |-- services
|   |-- types
|   `-- utils
`-- tsconfig.json
```

## Key Components

### Navigation Drawer

- **Location**: `src/components/Layout/Drawer.tsx`
- **Description**: Contains links to Dashboard, Orders, Customers, Reports, and Integrations with icons. Uses `react-router-dom` for navigation.

### Header

- **Location**: `src/components/Layout/Header.tsx`
- **Description**: Includes navigation icons for Home, Profile, Settings, and Logout. Manages the state of the Drawer.

### Home Page

- **Location**: `src/pages/HomePage.tsx`
- **Description**: Displays sections for Today, Recent Deposits, and Recent Orders with placeholder content using MUI components.

### User Profile

- **Location**: `src/pages/UserProfilePage.tsx`
- **Description**: Allows viewing and editing of user details, changing passwords, and displaying avatars. Includes dialogs for editing user details and changing passwords.

### Global Error Handling

- **Error Context**: `src/context/ErrorContext.tsx`
- **Global Error Component**: `src/components/Error/GlobalError.tsx`
- **Description**: Centralized error handling mechanism using context and displays errors using a Snackbar.

### API Integration

- **Location**: `src/api/index.ts`
- **Description**: Manages API calls using Axios for updating user details, changing passwords, and fetching user data.

### Password Encryption

- **Location**: `src/services/encryption.ts`
- **Description**: Encrypts passwords using JSEncrypt before sending them to the server to ensure secure transmission of sensitive information.

## Backend Dependency

This web application requires the GymBuddy backend application to be running. The backend is built using Java Spring Boot and provides the necessary REST APIs for this web client.

- **Backend Repository**: [GymBuddy Spring Boot Application](https://github.com/SForce-Tech/gymbuddy)
- **API Documentation**: Available in the backend repository.

## Getting Started

### Prerequisites

- Node.js and npm installed
- React development environment setup
- Running instance of the GymBuddy backend application

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/gymbuddy-web.git
   ```
2. Navigate to the project directory:
   ```sh
   cd gymbuddy-web
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

1. Ensure the GymBuddy backend application is running.
2. Start the web application:
   ```sh
   npm start
   ```

### Building the Application

```sh
npm run build
```

## Usage

### Navigation Drawer

Provides links to various sections of the application, including:

- Dashboard
- Orders
- Customers
- Reports
- Integrations

### Home Page

Displays sections for:

- Today: Simple chart representation.
- Recent Deposits: Latest deposit amount.
- Recent Orders: Recent order details.

### User Profile

- View user profile details.
- Edit user profile details.
- Change password functionality.

## Error Handling

Uses a global error context to manage and display error messages with the `GlobalError` component.

## API Integration

Manages API calls using Axios, defined in `src/api/index.ts`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is private only meant to be used by the author.
