# Dutify - End-to-End Event and Task Management System

## Introduction

"Dutify" is a powerful end-to-end event and task management system designed to streamline and simplify the planning, organization, and execution of events within organizations. It is built with flexibility in mind, allowing users to define dynamic roles with varying levels of authority to suit their organizational structure.

## Features

- **Dynamic Roles:**

  - Define and customize roles with varying levels of authority based on organizational needs.

- **User Experience:**
  - Utilizes Vite for fast and efficient development.
  - Built with TypeScript for enhanced type checking and developer productivity.
  - React with Material-UI (MUI) for a seamless and engaging user experience.
  - TailwindCss is incorporated for enhanced customization options.
- **Form Handling:**

  - Form validation is implemented using Yup.
  - Formik for handling forms efficiently.

- **HTTP Requests:**

  - axios for handling HTTP requests efficiently.

- **Date and Time Handling:**

  - dayjs for simplified date and time manipulation.

- **Authentication and Database:**

  - Firebase is used for authentication and as a backend database.

- **Routing:**

  - react-router-dom for client-side routing.

- **Styling:**

  - Sass for styling components.

- **State Management:**

  - Contexts for efficient state management.

- **Live Comments:**

  - Real-time comments on tasks facilitate collaboration and communication.

- **REST-API:**

  - Provides a RESTful API, enabling integration with other applications.

- **Error Handling:**
  - Comprehensive error handling for meaningful error messages.

## Technologies Used

### Client

- Vite
- React
- MUI (Material-UI)
- TypeScript
- Yup
- axios
- dayjs
- Firebase
- Formik
- react-router-dom
- Sass

### Server

- cors
- Firebase (Authentication, Firestore, Functions)
- Yup
- Express
- morgan

## Setup

```
# Clone the repository
git clone https://github.com/anmoljhamb/dutify

# Navigate to the project directory
cd dutify

# Install dependencies for the client
cd client
yarn

# Navigate to the server directory
cd ../server

# Install dependencies for the server
yarn

# Firebase Setup:
# 1. Create a Firebase project: https://console.firebase.google.com/
# 2. Enable authentication with email/password login.
# 3. Build a Firestore database.
#   3.1 Add a collection named "roles" with documents specifying dynamic roles (accessLevel and roleName).
#       - Higher accessLevel grants more authority; Admins should have the highest accessLevel.
#   3.2 Refer to the provided image for reference (exclude remaining collections for now).
# 4. Go to Project Settings and generate a private key for your admin account.
# 5. Save the key as "credentials.json" in the server directory.
# 6. Create a new app in Firebase and copy the config.
# 7. Replace Firebase config in the server/src/utils/firebase.ts file.
# 8. Do the same for the client in the client/src/firebase.tsx file.

# Run the application
# For the client
cd ../client
yarn run dev

# For the server
cd ../server
yarn run dev
```

## Usage

- Plan and manage events using the dedicated Event Management page.
- Assign tasks and collaborate with live comments.

## Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request.
