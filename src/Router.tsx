import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/*', element: <NotFoundPage/>},
  {path: '/Login', element: <Login/>},
])

export default router;