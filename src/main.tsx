import { createRoot } from 'react-dom/client'

// styles
import '@progress/kendo-theme-default/dist/default-main-dark.css';
import './App.css';
import './index.css'
// React Router
import { BrowserRouter, Routes, Route } from 'react-router'
// Components
import { Chat } from './components/Chat.tsx'
import { Project } from './components/Project.tsx'
import { Projects } from './components/Projects.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/planner" element={<Chat />} />
      <Route path="/projects" element={<Projects />} /> 
      <Route path="/projects/:id" element={<Project />} />
    </Routes>
  </BrowserRouter>
)
