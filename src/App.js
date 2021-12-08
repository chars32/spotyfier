import app from "./utils/Firebase";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useState } from "react";
import { ToastContainer } from 'react-toastify'

import Auth from "./pages/Auth/Auth";

const auth = getAuth(app)

function App() {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  onAuthStateChanged(auth, currentUser => {
    if (!currentUser) {
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setIsLoading(false)

  })

  if (isLoading) {
    return null
  }

  // return (
  //   !user ? <Auth /> : <UserLogged />
  // );

  return (
    <>
      {!user ? <Auth /> : <UserLogged />}
      < ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  )
}

const UserLogged = () => {

  const logout = () => {
    signOut(auth)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh'
    }}>
      <h1>Usuario Logeado</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  )
}

export default App;
