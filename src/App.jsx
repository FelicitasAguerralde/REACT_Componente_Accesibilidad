import { Outlet } from 'react-router-dom'
import './App.css'
import AccessibilityTool from './components/AccessibilityTool'

function App() {
  return (
    <>
      <AccessibilityTool />
      <main id="main-content">
        <Outlet />
      </main>
    </>
  )
}

export default App
