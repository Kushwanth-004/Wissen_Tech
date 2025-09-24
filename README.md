# Vacation Holiday Tracker

A comprehensive holiday calendar application that helps you track holidays across multiple countries with an intuitive, visually appealing interface. Built with **React.js** frontend and **Node.js** backend, this application provides real-time holiday information with multiple viewing modes.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🌍 Multi-Country Support
- Support for multiple countries including US, UK, Canada, India, Australia, Germany, France, Japan, Brazil, and Mexico
- Real-time country selection with easy-to-read codes
- Automatic holiday data fetching based on selected country

### 📅 Multiple View Modes
- **Monthly View**: Detailed month-by-month holiday calendar
- **Quarterly View**: 3-month overview with consolidated holiday information
- **Custom Start Date**: Select any month to start the calendar

### 🎨 Visual Calendar Features
- **Color-coded Weeks**:
  - Light green → 1 holiday in a week
  - Dark green → 2+ holidays in a week
  - White → No holidays
- **Interactive Navigation**: Hover to see holiday details
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🔄 Smart Data Management
- **API Integration**: Connects to Calendarific API for real-time holiday data
- **Fallback System**: Works with mock data when API is unavailable
- **Error Handling**: User-friendly messages for failures
- **Loading States**: Smooth loading indicators during data fetching

---

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with hooks
- **Tailwind CSS** - Responsive and clean UI
- **Day.js** - Date manipulation and formatting
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - Server-side HTTP requests
- **CORS & dotenv** - Security and environment management

### External Services
- **Calendarific API** - Real-time holiday data provider
- **Mock Data** - Fallback for offline usage

---

## 📸 Screenshots

### Monthly View
<img width="911" height="565" alt="Screenshot" src="https://raw.githubusercontent.com/Kushwanth-004/Wissen_Tech/main/images/image1.png" />

*Detailed monthly calendar with color-coded weeks*

### Quarterly View
<img width="911" height="565" alt="Screenshot" src="https://raw.githubusercontent.com/Kushwanth-004/Wissen_Tech/main/images/image3.png" />

*Three-month overview with consolidated holiday information*

### Holiday Highlighting
<img width="911" height="565" alt="Screenshot" src="https://raw.githubusercontent.com/Kushwanth-004/Wissen_Tech/main/images/image2.png" />

*Light green for 1 holiday, dark green for 2+ holidays*

### Country Selection
<img width="911" height="565" alt="Screenshot" src="https://raw.githubusercontent.com/Kushwanth-004/Wissen_Tech/main/images/image6.png" />

*Dropdown menu for country selection*

### Tooltip on Hover
<img width="911" height="565" alt="Screenshot" src="https://raw.githubusercontent.com/Kushwanth-004/Wissen_Tech/main/images/image5.png" />

*Hovering over a holiday shows its name and details*

### Mobile View
<img width="911" height="565" alt="Screenshot" src="https://raw.githubusercontent.com/Kushwanth-004/Wissen_Tech/main/images/image6.png" />

*Responsive design adapts to mobile screens*

### Full Calendar View
<img width="911" height="565" alt="Screenshot" src="https://raw.githubusercontent.com/Kushwanth-004/Wissen_Tech/main/images/image4.png" />

*Complete overview showing all months and holidays*

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Clone the Repository

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Clone the Repository
```bash
git clone (https://github.com/Kushwanth-004/Wissen_Tech/edit/main)
cd Vacation-Holiday-Tracker
```

### Backend Setup
```bash
cd backend
npm install

# Copy environment file
cp .env.example .env

# Add your API key (optional)
# Edit .env file and add: CALENDARIFIC_API_KEY=your_key_here

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install

# Start the React development server
npm start
```

The frontend application will start on `http://localhost:3000`

## 💡 Usage

### Basic Usage
1. **Start the Application**: Follow the installation steps above
2. **Select Country**: Use the dropdown to choose your preferred country
3. **Choose View Mode**: Select between Monthly, Quarterly, or Yearly view
4. **Navigate Dates**: Use the navigation buttons to browse different time periods
5. **View Holidays**: Hover over colored weeks to see holiday details

### API Key Configuration (Optional)
1. Get a free API key from [Calendarific](https://calendarific.com/)
2. Add it to your `backend/.env` file:
   ```
   CALENDARIFIC_API_KEY=your_api_key_here
   ```
3. Restart the backend server

**Note**: The application works with mock data if no API key is provided.

## 🔌 API Reference



**Parameters:**
- `country` (required): Two-letter country code (e.g., 'US', 'IN')
- `year` (required): Four-digit year (e.g., 2024)
- `month` (optional): Month number 1-12



### Get Countries
```http
GET /api/countries
```

Returns list of supported countries with codes and names.

## 📁 Project Structure

```
Vacation-Holiday-Tracker/
├── client/
│   ├── components/         # React components
│   ├── services/           # API service functions
│   ├── App.js              # Main React entry
│   ├── index.js            # React DOM render
│   └── index.css           # Global styles
├── server/
│   ├── routes/             # API routes
│   ├── services/           # Backend service logic
│   ├── server.js           # Express server
│   └── .env.example        # Environment variables
├── images/                 # Output screenshots
└── README.md

```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env

```

### Supported Countries
All The Countries

## 🎯 Features in Detail

### Color-Coded Week System
The calendar uses an intelligent color-coding system:
- **White Background**: No holidays in the week
- **Light Green **: Exactly 1 holiday in the week
- **Dark Green **: 2 or more holidays in the week

### Responsive Design
The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

### Error Handling
Comprehensive error handling includes:
- Network connectivity issues
- Invalid date ranges
- Server downtime fallbacks

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch 
3. Commit your changes
4. Push to the branch 
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add appropriate comments for complex logic
- Test your changes thoroughly
- Update documentation as needed


## 🆘 Support

If you encounter any issues or have questions:

1. Create a new issue with detailed information
2. Include steps to reproduce the problem
3. Mention your operating system and browser version

---

**Made with ❤️ by the V KUSHWANTH KUMAR**

*Enjoy tracking holidays around the world! 🌍*
git clone <your-repo-link>
cd Vacation-Holiday-Tracker
