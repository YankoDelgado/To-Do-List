import {config} from "dotenv"
config()
import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"
import verifyToken from "./middleware/auth.js"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api",authRoutes)
app.use("/api/tasks", verifyToken, taskRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
