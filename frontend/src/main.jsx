import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";


// Global axios config - send cookies with every request
axios.defaults.withCredentials = true;

// Suppress specific warnings in production
if (process.env.NODE_ENV === 'production') {
  console.warn = () => {};
  console.error = () => {};
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#374151',
            color: '#fff',
          },
        }}
      />
    </Provider>
  </StrictMode>,
)

