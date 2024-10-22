# Authentication - API

## Overview 
This frontend application is built with React to provide a user-friendly interface for interacting with the backend authentication API. It supports user registration, email verification, login with JWT-based authentication, password reset, and token management.

## Table of Contents 

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [License](#license)
- [Author](#author)

## Features 

- User-friendly authentication forms (registration, login, password reset)
- JWT-based user session management
- Email verification workflow integration
- Error handling with form validation
- Responsive design for a better user experience on mobile and desktop
- Integration with the backend API for real-time updates

## Technologies

- **React.js**: Core framework for building the UI
- **React Router**: For managing routing and navigation within the app
- **Axios**: For HTTP requests and handling API calls
- **Tailwind CSS**: For responsive and utility-based styling
- **React Hot Toast**: For displaying user notifications and alerts
- **React redux**: For managing global state, such as user authentication status

## Project Structure 
```
auth-ui/
│
├── public/               # Static files
│   └── favicon.svg       # Main favicon file
│
├── src/                  
│   ├── components/       # Reusable components 
│   ├── helpers/          # Reusable components (e.g., formValidator)
│   ├── pages/            # Main pages (e.g., Login, Register, ResetPassword)
│   ├── services/         # API calls and business logic (e.g., AuthService.js)
│   ├── routes/           # Route files
│   ├── App.js            # Main App component
│   ├── index.js          # Entry point of the application
│   └── index.css         # Tailwind CSS styles
├── package.json          # NPM package file
├── .env.example          # Example environment variables file
└── .gitignore            # Git ignore file

```


## Installation 

### Prerequisites 
- **Node.Js** (v14 or higher)
- **Backend API** ( [API](https://www.github.com/Zaiidmo/Authentication-API))

### Steps
1. Clone the repository 
```bash 
git clone https://github.com/Zaiidmo/Authentication-UI
cd Authentication-UI
```
2. Install Dependencies
```bash
npm install 
```
3. Set Up environment variables
- Copy the `.env.example` file to create your own `.env`
```bash
cp .env.example .env
```
- Open the .env file and update the variables with your configurations
4. Start the app
```bash 
npm run dev
```


## License 

## Author 

#### Zaiid Moumnii
[Github](https://www.github.com/Zaiidmo) <br>
[portfolio](https://www.vlpha.tech)
