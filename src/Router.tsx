import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import SignUp from './pages/SignUp.tsx'
import UserPageTest from './pages/UserPageTest.tsx'
import Home from './pages/Home.tsx'
import Quiz from './pages/Quiz.tsx'
import Notes from './pages/Notes.tsx'
import GlobalRepository from './pages/GlobalRepository.tsx'
import NotesCard from './components/NotesCard.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/*', element: <NotFoundPage/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <SignUp/>},
  {path: '/test', element: <UserPageTest/>},
  {path: '/home', element: <Home/>},
  {path: '/quiz/:id', element: <Quiz/>},
  {path: '/notes/:id', element: <Notes/>},
  {path: '/globalrepository', element: <GlobalRepository/> },
])

export default router;