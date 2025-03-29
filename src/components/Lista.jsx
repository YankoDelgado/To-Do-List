"use client"
import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button, ListGroup, Navbar } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const API_URL = "http://localhost:5000/api" 

const List = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")
    const { currentUser, logout } = useAuth()

    useEffect(() => {
        fetchTasks()
    }, [])
    
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks`)
            setTasks(response.data)
        } catch (error) {
            console.error("Error fetching tasks:", error)
        }
    }
    
    const addTask = async (e) => {
        e.preventDefault()
        if (newTask.trim()) {
            try {
                const response = await axios.post(`${API_URL}/tasks`, { text: newTask })
                setTasks([...tasks, response.data])
                setNewTask("")
            } catch (error) {
                console.error("Error adding task:", error)
            }
        }
    }
    
    const toggleTask = async (id) => {
        try {
            const taskToToggle = tasks.find((task) => task.id === id)
            const response = await axios.put(`${API_URL}/tasks/${id}`, {
            completed: !taskToToggle.completed,
        })
        setTasks(tasks.map((task) => (task.id === id ? response.data : task)))
        } catch (error) {
            console.error("Error toggling task:", error)
        }
    }
    
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`)
            setTasks(tasks.filter((task) => task.id !== id))
        } catch (error) {
            console.error("Error deleting task:", error)
        }
    }
    


    return (
        <>
            <Navbar bg="primary" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Lista de tareas</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="me-3">Hola, {currentUser.name}</Navbar.Text>
                        <Button variant="outline-light" onClick={logout}>Cerrar Sesión</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form onSubmit={addTask}>
                            <Form.Group className="mb-3 d-flex">
                                <Form.Control type="text" placeholder="Agregar nueva tarea" value={newTask} onChange={(e) => setNewTask(e.target.value)}></Form.Control>
                                <Button variant="success" type="submit" className="ms-2">Agregar</Button>
                            </Form.Group>
                        </Form>
                        {tasks.length === 0 ? (
                            <div className="text-center p-4 bg-white rounded shadow-sm">
                                <p className="text-muted mb-0">No tienes tareas pendientes</p>
                            </div>
                        ) : (
                        <ListGroup>
                            {tasks.map((task) => (
                            <ListGroup.Item
                                key={task.id}
                                className="d-flex justify-content-between align-items-center shadow-sm mb-2 rounded"
                            >
                                <div className="d-flex align-items-center">
                                <Form.Check
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    label={task.text}
                                    className={task.completed ? "text-muted text-decoration-line-through" : ""}
                                />
                                </div>
                                <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>
                                Eliminar
                                </Button>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
        )
}

export default List