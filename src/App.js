import app from "./utils/Firebase";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useState } from "react";

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

  return (
    !user ? <Auth /> : <UserLogged />
  );
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
