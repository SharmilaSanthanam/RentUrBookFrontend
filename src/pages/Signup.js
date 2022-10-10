import React, {useState} from 'react';
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Signup.css';
import { useSignupMutation } from "../services/appApi"

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();


    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (

        <Container>
            <Row>
                <Col md={6} className="signup_form_container">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup} >
                        <h1>Create your account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" value={name} required onChange={(e) => setName(e.target.value)} /><br></br>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} /><br></br>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Button className="signup_button" type="submit" disabled={isLoading}>
                                Register
                            </Button>
                        </Form.Group>
                        <p>Welcome !!!     <Link to="/login">Login</Link></p>
                    </Form>
                </Col>
                <Col md={6} className="signup_image_container"></Col>
            </Row>
        </Container>
    )
}

export default Signup