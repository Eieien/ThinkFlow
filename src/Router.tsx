import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import SignUp from './pages/SignUp.tsx'
import UserPageTest from './pages/UserPageTest.tsx'
import Home from './pages/Home.tsx'
import Quiz from './pages/Quiz.tsx'
import Notes from './pages/Notes.tsx'
import Users from './pages/Users.tsx'
import UsersSelf from './pages/UsersSelf.tsx'
import Explore from './pages/Explore.tsx'
import Settings from './pages/Settings.tsx'
import Results from './pages/ResultsForm.tsx'
import Create from './pages/QuizCreate.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/*', element: <NotFoundPage/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <SignUp/>},
  {path: '/test', element: <UserPageTest/>},
  {path: '/home', element: <Home/>},
  {path: '/quiz', element: <Quiz/>},
  {path: '/notes/:id', element: <Notes/>},
  {path: '/explore', element: <Explore/> },
  {path: '/user', element: <Users/>},
  {path: '/userself', element: <UsersSelf/>},
  {path: '/settings', element: <Settings/>},
  {path: '/resultsform', element: <Results/>},
  {path: '/createquiz', element: <Create/>},
])

export default router;