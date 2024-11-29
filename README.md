# DivarApp Project

## Overview
DivarApp is a full-stack web application that consists of both frontend and backend components. The project aims to provide a user-friendly platform, possibly similar to a marketplace or listing service, given its name. Below is a detailed description of the project structure and its components.

## Project Structure

### Frontend
The frontend is implemented using modern web technologies. Here are some notable files and tools used:
- **`index.html`**: The entry point for the frontend.
- **`package.json`**: Lists all dependencies for the frontend, which likely include frameworks such as React or Vue.js.
- **`.eslintrc.cjs`**: Configuration for ESLint, ensuring coding standards are maintained.
- **`tailwind.config.js`**: Tailwind CSS is used for styling, providing a modern, responsive UI.
- **`vite.config.js`**: Vite is used as the build tool, known for its fast builds and hot module replacement during development.

#### Dependencies
- The presence of `tailwind.config.js` and `vite.config.js` indicates the use of **Tailwind CSS** for styling and **Vite** for building.
- Additional dependencies are listed in `package.json`.

### Backend
The backend manages server-side logic and data persistence.
- **`main.js`**: The main entry point for the backend server.
- **`package.json`**: Lists backend dependencies, which likely include Node.js frameworks such as Express.
- **`.env`**: Environment configuration file for storing sensitive information like API keys or database credentials.
- **`uploads`**: A folder used to store user-uploaded files.

#### Dependencies
- Based on the structure, it is likely that **Express.js** is used as the backend framework.

## Setup Instructions

### Prerequisites
- **Node.js**: Install Node.js (>= 14.x recommended).
- **NPM or Yarn**: A package manager to handle dependencies.

### Installation
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/MohammadMehdiRahimi/divar.github.io
   cd divarApp
   ```

2. **Install Dependencies**:
   - Navigate to both `frontend` and `backend` directories and install the dependencies.
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

### Running the Application
1. **Frontend**:
   - Navigate to the `frontend` directory and run:
   ```sh
   npm run dev
   ```
   This will start a local development server, likely using Vite.

2. **Backend**:
   - Navigate to the `backend` directory and run:
   ```sh
   nodemon main.js
   ```
   This will start the backend server.

### Environment Configuration
- Update the `.env` file in the backend directory with the required configuration settings such as database credentials, API keys, etc.

## Key Features
- **Responsive UI**: The use of Tailwind CSS ensures the app has a mobile-friendly and responsive design.
- **Modern Build Tools**: Vite is used for efficient and faster development builds.
- **Backend API**: The backend server handles all business logic and integrates seamlessly with the database.

## Contribution
If you would like to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For any questions or feedback, feel free to reach out to [MohammadMehdiRahimi](https://github.com/MohammadMehdiRahimi).
