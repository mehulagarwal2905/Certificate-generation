# Certificate Generator

A MERN stack application for generating professional certificates with customizable templates and email functionality.

![Certificate Generator Preview](https://via.placeholder.com/800x400?text=Certificate+Generator+Preview)

## ✨ Features

- Create beautiful, customizable certificates
- Three modern certificate templates (Classic, Modern, Minimalistic)
- Generate and download certificates as PDF
- Email certificates directly to recipients
- Responsive design that works on all devices
- Real-time preview of certificate templates

## 🚀 Tech Stack

- **Frontend**: React.js, React Router, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Templating**: HTML5, CSS3
- **PDF Generation**: html2pdf.js
- **Email Service**: Nodemailer
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns

## 🛠️ Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or Yarn
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/certificate-generator.git
cd certificate-generator
```

### 2. Set Up Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

> **Note**: If using Gmail, you'll need to generate an App Password if you have 2FA enabled, or enable "Less secure app access" in your Google Account settings.

### 3. Set Up Frontend

```bash
cd ../frontend
npm install
```

### 4. Run the Application

#### Start Backend Server

```bash
cd backend
npm start
```

#### Start Frontend Development Server

```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
certificate-generator/
├── backend/               # Backend server code
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── server.js         # Express server setup
│   └── package.json      # Backend dependencies
├── frontend/             # Frontend React application
│   ├── public/           # Static files
│   ├── src/              # React components and logic
│   │   ├── components/   # Reusable components
│   │   ├── templates/    # Certificate templates
│   │   ├── App.js       # Main App component
│   │   └── index.js     # Entry point
│   └── package.json      # Frontend dependencies
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
```

### Email Setup

To enable email functionality:

1. **For Gmail**:
   - Go to your Google Account settings
   - Enable "Less secure app access" or
   - If you have 2FA enabled, generate an App Password
   - Use the App Password in the `EMAIL_PASSWORD` field

2. **For other email providers**:
   - Update the SMTP settings in the `sendCertificateEmail` function in `certificateController.js`

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Bootstrap](https://getbootstrap.com/) - The most popular CSS Framework
- [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) - Client-side HTML to PDF generation
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React projects

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/yourusername/certificate-generator](https://github.com/yourusername/certificate-generator)
