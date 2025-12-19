import { Outlet, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import SignUp from './pages/SignUp.tsx'
import UserPageTest from './pages/UserPageTest.tsx'
import Home from './pages/Home.tsx'
import Quiz from './pages/Quiz.tsx'
import Notes from './pages/Notes.tsx'
import Users from './pages/Users.tsx'
import Explore from './pages/Explore.tsx'
import Settings from './pages/Settings.tsx'
import Results from './pages/ResultsForm.tsx'
import QuizCreate from './pages/quiz-page/QuizSettings.tsx'
import { DataProvider } from './context/DataProvider.tsx'

const router = createBrowserRouter([
  {
    element: (
      <DataProvider>
        <Outlet/>
      </DataProvider>
    ),
    children: [
      {path: '/', element: <App/>},
      {path: '/*', element: <NotFoundPage/>},
      {path: '/login', element: <Login/>},
      {path: '/signup', element: <SignUp/>},
      {path: '/test', element: <UserPageTest/>},
      {path: '/home', element: <Home/>},
      {path: '/quiz/:id', element: <Quiz/>},
      {path: '/quiz-settings/:id', element: <QuizCreate/>},
      {path: '/notes/:id', element: <Notes/>},
      {path: '/explore', element: <Explore/> },
      {path: '/user/:user', element: <Users/>},
      {path: '/settings', element: <Settings/>},
      {path: '/resultsform', element: <Results/>},

    ]
  }
])

export default router;