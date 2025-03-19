"use client"
import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button, ListGroup, Navbar } from "react-bootstrap"

const List = () => {
    //const [task, setTask] = useState([])
    const [newTask, setNewTask] = useState("")



    return (
        <>
            <Navbar bg="primary" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Lista de tareas</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="me-3">Hola Usuario</Navbar.Text>
                        <Button variant="outline-light" >Cerrar Sesión</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3 d-flex">
                                <Form.Control type="text" placeholder="Agregar nueva tarea" value={newTask} onChange={(e) => setNewTask(e.target.value)}></Form.Control>
                                <Button variant="success" type="submit" className="ms-2">Agregar</Button>
                            </Form.Group>
                        </Form>
                        <div className="text-center p-4 bg-white rounded shadow-sm">
                            <p className="text-muted mb-0">No tienes tareas pendientes</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
        )
}

export default List