import Dashboard from './components/Dashboard'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Login from './components/auth/Login';
import useAuth from './hooks/useAuth';
import { RotateLoader } from 'react-spinners';


function App() {
  const auth = useAuth()
  const {loggedIn, firstLoading} = auth


  if(firstLoading) {
    return <div className="flex w-[100vw] h-[100vh]  justify-center items-center">
      <RotateLoader color='var(--clr-primary)'/>
    </div>      
  }

  if(!loggedIn) {      
      return  <Login {...auth} />
  }

  return (
    <div> 
      <Dashboard/>
    </div>
  )
}

export default App
