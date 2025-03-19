"use Client"

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const API_URL = "http://localhost:5000/api" //Ajustar URL segun corresponda

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            fetchUser()
        }else{
            setLoading(false)
        }
    },[])
    
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/user`)
            setCurrentUser(response.data)
        } catch (error){
            console.error("Error fetching user:", error)
        } finally {
            setLoading(false)
        }
    }

    const register = async (email, password, name) => {
        try {
            const response = await axios.post(`${API_URL}/register`, {email, password, name})
            const {token, user} = response.data
            localStorage.setItem("token",token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            setCurrentUser(user)
            return user
        } catch (error) {
            throw new Error(error.response.data.message || "Error en el registro")
        } 
    }

    const login = async (email, password) => {
        try{
            const response = await axios.post(`${API_URL}/login`, {email, password})
            const {token, user} = response.data
            localStorage.setItem("token",token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            setCurrentUser(user)
            return user
        } catch (error){
            throw new Error(error.response.data.message || "Error en el inicio de sesión")
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["Authorization"]
        setCurrentUser(null)
    }

    const value = {
        currentUser,
        register,
        login,
        logout,
        loading,
    }
}
