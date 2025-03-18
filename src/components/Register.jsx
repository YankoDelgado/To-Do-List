"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"

const Register = ({onToggleForm}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    //Alertas

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h2 className="text-center mb-4">Registro</h2>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e)=> setName(e.target.value)} required></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">   
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <Form.Control type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required></Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mb-3">Registrarse</Button>
                        </Form>
                        <div className="text-center">
                            <p>
                                ¿Ya tienes una cuenta?{" "}
                                <Button variant="link" onClick={onToggleForm} className="p-0">
                                    Iniciar Sesión
                                </Button>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register