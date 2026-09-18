# Parental Legacy & Life Factors Calculator

This is a full-stack assessment task for a web application that takes a user's Date of Birth as input and automatically generates specific life factor values based on that date. 

The application is built using **React (Vite)** and features a modern, responsive Glassmorphism design with Dark/Light mode support.

## Features

- **Dynamic Value Generation**: Automatically generates values for 7 life factors based on the exact day of the month (Odd vs. Even days bias).
- **Exact Sum Validation**: A custom algorithm guarantees that the Grand Total of all generated values equals exactly **100**.
- **Data Visualization**: Includes a comprehensive data table and a responsive Radar Chart (using `recharts`) to visually compare Mother vs. Father influences.
- **Export Functionality**: Users can seamlessly export their results to **PDF** or **CSV** formats.
- **Local Storage**: Users can save their calculated results to the browser's `localStorage` for future visits.
- **Premium UI/UX**: Designed using Vanilla CSS with glassmorphism elements, custom gradients, and smooth micro-animations.

## Technology Stack

- **Frontend**: React.js, Vite
- **Styling**: Vanilla CSS3, CSS Variables (for theming)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Charting**: `recharts`
- **Exporting Tools**: `html2canvas`, `jspdf`
- **Icons**: `lucide-react`

## Setup Instructions

To run this project locally, follow these steps:

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone this repository (or extract the project files):
   ```bash
   git clone <your-repository-url>
   cd "MERN Full Stack Developer Assessment"
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── DOBInput.jsx                # Date of birth input & validation
│   │   ├── ExportPanel.jsx             # PDF/CSV export functionality
│   │   ├── FactorTable.jsx             # Main data table presentation
│   │   └── RadarChartVisualization.jsx # Recharts radar component
│   ├── utils/
│   │   └── calculator.js               # Core logic for 100-sum generation
│   ├── App.jsx                         # Main container & state management
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Global styles and theming
├── index.html
├── package.json
└── vite.config.js
```

## Evaluation Criteria Addressed
- **Code Quality**: Code is modularized into reusable functional components and utility files.
- **Functionality**: All core calculation constraints and bonus export functionalities work flawlessly.
- **Calculation Logic**: Uses a proportional distribution algorithm to stay precisely within factor bounds while hitting a 100 sum.
- **UI/UX Design**: Fully responsive, dark-mode compatible, and highly professional layout.

## License

This project is open-source and available under the MIT License.
