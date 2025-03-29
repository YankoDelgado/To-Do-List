import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../config/db.js"

const authRoutes = express.Router()

// Registro de usuario
authRoutes.post("/register", async (req, res) => {
    
    try{
        console.log("Datos recibidos en el backend:", req.body); // Para depuración
        
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const [result] = await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",[name, email, hashedPassword])

        const token = jwt.sign({id: result.insertId}, process.env.JWT_SECRET,{expiresIn: "30m"})

        res.status(201).json({
            token,
            user: {id: result.insertId, name, email}
        })
    }catch (error){
        console.error("Error en el registro:", error);
        res.status(500).json({message: "Error en el registro"})
    }
})

// Inicio de sesión
authRoutes.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email])

        if(users.length === 0){
            return res.status(401).json({message: "Credenciales inválidas"})
        }

        const user = users[0]
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){
            return res.status(401).json({message: "Credenciales inválidas"})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn:"30m"})

        res.json({
            token,
            user: {id: user.id, name: user.name, email:user.email},
        })
    }catch{
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error en el inicio de sesión" })
    }
    
})

// Obtener usuario autenticado
authRoutes.get("/user", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
    
        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const [users] = await db.execute("SELECT id, name, email FROM users WHERE id = ?", [decoded.id])
    
        if (users.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
    
        res.json(users[0])
        } catch (error) {
            console.error("Error en la autenticación:", error);
            res.status(401).json({ message: "Unauthorized" })
    }
})

export default authRoutes