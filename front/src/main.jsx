import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store/store'
import { Provider } from 'react-redux'
import { positions, transitions, Provider as AlterProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options  = {
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transitions:transitions.FADE
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AlterProvider template={AlertTemplate} {...options}>
        <App />
      </AlterProvider>
    </Provider>
  </StrictMode>,
)
