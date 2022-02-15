import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { api } from "../constants/api";

import '../css/createAccount.css'

import AvatarImage from '../style/icons/profile.png';

export function CreateAcount() {

    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(AvatarImage);



    function register() {
        let user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            birthday: birthday,
            password: password,
            confirmPassword: confirmPassword,
            image: image
        }
        fetch(`${api.root}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.err === false) {
                    alert(data.message)
                    const redirect = () => {
                        window.location = "/login"
                    }
                    redirect()
                } else {
                    alert(data.message)
                }
            })
            .catch(err => alert(err))
    }
    const handleSubmit = (event) => {
        register();
        event.preventDefault();
    }
    return (
        <div className="container-createAccount">
 

            <div className="div-create-Account">
                <h3 id="account-title">Create Account </h3> <hr id="hr7" />
            </div>


            <div className="create-acc-form">
                <div id="left-box">

                    <p>
                        <span id="orange-letters">Create your</span><br />
                        <span id="black-letters">account</span>
                    </p>

                    <p className="left-text-box">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus omnis eligendi repellat incidunt commodi similique nam adipisci eum inventore consectetur labore veniam, suscipit asperiores ipsa numquam atque accusantium quibusdam eaque. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>

                </div>
                <div className="right-box">
                    <div className="form-boxes">
                        <Form onSubmit={handleSubmit} >
                            <Row>
                                <Col>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        value={first_name}
                                        onChange={(e) => setFirst_name(e.target.value)}
                                        value={first_name}

                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        value={last_name}
                                        onChange={(e) => setLast_name(e.target.value)}

                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        placeholder="john@smith.com"
                                        value={email} type="email"
                                        onChange={(e) => setEmail(e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="*****"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Label>Repeat password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="*****"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Button className="button-save-account" type="submit" variant="success">Create Account</Button>
                        </Form>
                    </div>


                </div>
            </div>

        </div>
    )
}
