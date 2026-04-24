import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Router from './Router.tsx'
import { ContentProvider } from './context/ContentContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ContentProvider>
        <Router />
      </ContentProvider>
    </Provider>
  </StrictMode>,
)
