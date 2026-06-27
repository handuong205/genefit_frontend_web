import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoute from './routes/Main.route.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <MainRoute />
  </GoogleOAuthProvider>
  
)
