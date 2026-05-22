import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { CourseProvider } from './context/CourseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <StudentProvider>
          <CourseProvider>
            <App />
          </CourseProvider>
        </StudentProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
