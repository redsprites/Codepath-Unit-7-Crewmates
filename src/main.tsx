import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateCrewmate from './components/CreateCrewmate.tsx'
import CrewmateGallary from './components/CrewmateGallary.tsx'
import CrewmateEdit from './components/CrewmateEdit.tsx'
import CrewmateDetails from './components/CrewmateDetails.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreateCrewmate/>} />
          <Route path="/gallary" element={<CrewmateGallary/>} />
          <Route path="/crewmates/:id" element={<CrewmateDetails />} />
          <Route path="/crewmates/:id/edit" element={<CrewmateEdit />} />
          <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
