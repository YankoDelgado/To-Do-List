import AuthPage from "./components/Authpage"
import List from "./components/Lista"
import { AuthProvider, useAuth } from "./context/AuthContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

// Componenete que decide que mostrar basado en el estado de autenticación

const AppContent = () =>{
  const {currentUser} = useAuth()

  return <div className="App">{currentUser ? <List/> : <AuthPage/>}</div>
}

function App() {
  
  return (
    <AuthProvider>
      <AppContent/>
    </AuthProvider>
  )
}

export default App
