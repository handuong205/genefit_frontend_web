import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoute from './routes/Main.route.tsx'

createRoot(document.getElementById('root')!).render(
  <MainRoute />
)
