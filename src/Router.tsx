import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import SignUp from './pages/SignUp.tsx'
import UserPageTest from './pages/UserPageTest.tsx'
const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/*', element: <NotFoundPage/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <SignUp/>},
  {path: '/test', element: <UserPageTest/>},
])

export default router;