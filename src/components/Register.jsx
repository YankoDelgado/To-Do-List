"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"

const Register = ({onToggleForm}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const { register } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
    
        if (password !== confirmPassword) {
            return setError("Las contraseñas no coinciden")
        }
        
        try {
            setLoading(true)
            await register(email, password, name)
        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }

    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h2 className="text-center mb-4">Registro</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
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
                            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                                {loading ? "Registrando..." : "Registrarse"}
                            </Button>
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