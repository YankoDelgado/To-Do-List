"use client"

import { useState } from "react"
import { Container, Form, Row, Col, Button, Alert} from "react-bootstrap"
import { useAuth } from "../context/AuthContext"

const Login = ({onToggleForm}) => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const{ login } = useAuth()
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
    
        try {
            setLoading(true)
            await login(email, password)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    
    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                            {loading ? "Iniciando...":"Iniciar Sesión"}
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
