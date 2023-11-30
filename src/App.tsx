import Dashboard from './components/Dashboard'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Login from './components/auth/Login';
import useAuth from './hooks/useAuth';


function App() {
  const auth = useAuth()
  const {loggedIn, isLoading} = auth
  return (
    <div>
      {isLoading ?
        "Loading..."
        :
      loggedIn ?
      <Dashboard/>
      :
      <Login {...auth} />
      }
    </div>
  )
}

export default App
