import express from "express"
import db from "../config/db.js"

const taskRoutes = express.Router()

taskRoutes.get("/", async (req, res) => {
    try {
        const [tasks] = await db.execute("SELECT * FROM tasks WHERE user_id = ?", [req.userId])
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas" })
    }
})

taskRoutes.post("/", async (req, res) => {
    try {
        const { text } = req.body
        const [result] = await db.execute("INSERT INTO tasks (user_id, text) VALUES (?, ?)", [req.userId, text])
        const [newTask] = await db.execute("SELECT * FROM tasks WHERE id = ?", [result.insertId])
        res.status(201).json(newTask[0])
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea" })
    }
})

taskRoutes.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { completed } = req.body
        await db.execute("UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?", [completed, id, req.userId])
        const [updatedTask] = await db.execute("SELECT * FROM tasks WHERE id = ?", [id])
        res.json(updatedTask[0])
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea" })
    }
})

taskRoutes.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        await db.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", [id, req.userId])
        res.json({ message: "Tarea eliminada exitosamente" })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea" })
    }
})

export default taskRoutes
