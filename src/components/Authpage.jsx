"use Client"

import { useState } from "react"
import Login from "./login"
import Register from "./Register"

const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true)

    const toggleForm = () =>{
        setShowLogin(!showLogin)
    }

    return <>{showLogin ? <Login onToggleForm={toggleForm}/> : <Register onToggleForm={toggleForm}/>}</>
}

export default AuthPage