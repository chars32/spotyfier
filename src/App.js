import app from "./utils/Firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth'


function App() {

  const auth = getAuth(app)
  onAuthStateChanged(auth, currentUser => {
    currentUser ? console.log("si") : console.log("no")
  })

  return (
    <div className="App">
      <h1>App Electron + React !!! </h1>
    </div>
  );
}

export default App;
