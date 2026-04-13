import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Router from './Router.tsx'
import { ContentProvider } from './context/ContentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContentProvider>
      <Router />
    </ContentProvider>
  </StrictMode>,
)
