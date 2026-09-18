# Parental Legacy & Life Factors Calculator (MERN Stack)

This is a full-stack assessment task for a web application that takes a user's Date of Birth as input and automatically generates specific life factor values based on that date. 

The application is built using the **MERN Stack (MongoDB, Express, React, Node.js)** and features a modern, responsive Glassmorphism dashboard design inspired by Quantum Vedic aesthetics.

## Features
- **Dynamic Value Generation:** Automatically generates values for 7 life factors based on the exact day of the month (Odd vs. Even days bias).
- **Exact Sum Validation:** A custom algorithm guarantees that the Grand Total of all generated values equals exactly 100.
- **Full Stack Integration (MERN):** Features a custom Node.js/Express backend that saves the generated calculation results directly into a **MongoDB** database.
- **Data Visualization:** Includes a comprehensive data table and a responsive dashboard layout to visually compare Mother vs. Father influences.
- **Export Functionality:** Users can seamlessly export their results to PDF or CSV formats.
- **Premium UI/UX:** Designed using Vanilla CSS with deep dark mode aesthetics, glassmorphism elements, custom gradients, and responsive media queries.

## Technology Stack
**Frontend:**
- React.js, Vite
- Styling: Vanilla CSS3, CSS Variables (for theming)
- State Management: React Hooks (`useState`, `useEffect`)
- Exporting Tools: `html2canvas`, `jspdf`
- Icons: `lucide-react`

**Backend:**
- Node.js
- Express.js
- Database: MongoDB (via `mongoose`)
- Middlewares: `cors`, `dotenv`

## Setup Instructions
To run this full-stack project locally, you will need to run two separate servers (one for the backend and one for the frontend).

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed locally (or a MongoDB Atlas connection string).

### 1. Backend Setup
Open a terminal and navigate to the backend folder:
```bash
cd "backend"
npm install
node server.js
```
*The backend server will start on `http://localhost:5000` and connect to the local MongoDB instance.*

### 2. Frontend Setup
Open a second terminal and navigate to the root folder:
```bash
npm install
npm run dev
```
*Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).*

## Project Structure
```text
├── backend/
│   ├── models/
│   │   └── Result.js                   # Mongoose schema for saving calculations
│   ├── server.js                       # Express server and MongoDB connection
│   ├── package.json
├── src/
│   ├── components/
│   ├── utils/
│   │   └── calculator.js               # Core logic for Odd/Even generation
│   ├── App.jsx                         # Main dashboard & API integration
│   ├── main.jsx                        
│   └── index.css                       # Quantum Vedic global styling
├── package.json
└── vite.config.js
```

## Evaluation Criteria Addressed
- **Code Quality:** Modularized into reusable functional components and separated backend/frontend logic.
- **Functionality:** Core calculation constraints are perfectly met, plus added bonus features (PDF/CSV export, MongoDB integration).
- **UI/UX Design:** Fully responsive, modern dark-mode dashboard layout.

## License
This project is open-source and available under the MIT License.
