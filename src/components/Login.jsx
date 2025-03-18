"use client"

import { useState } from "react"
import { Container, Form, Row, Col, Button, Alert} from "react-bootstrap"

const Login = ({onToggleForm}) => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                <div className="bg-white p-4 rounded shadow-sm">
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-3">
                        Iniciar Sesión
                    </Button>
                    </Form>
                    <div className="text-center">
                    <p>
                        ¿No tienes una cuenta?{" "}
                        <Button variant="link" onClick={onToggleForm} className="p-0">
                        Regístrate
                        </Button>
                    </p>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
