import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

import { api } from '../constants/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserStorage } from '../helper/StorageFunction';
import { setLoggedIn, setJWT } from '../redux/ducks/auth';
import '../css/login.css'


export function Login() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        const user = {
            email: email,
            password: password
        }
        fetch(`${api.root}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                alert(` ` + result.message)

                if (result.token) {
                    dispatch(setLoggedIn(true));
                    setUserStorage(result.token, result.user);
                    dispatch(setJWT(result.token));
                    navigate('/myProfile')

                } else{
                    navigate('/login')
                }
            })
            .catch(err => alert(err))
    }



    return (
        <div className="container-Login" >

            <div className="div-login">
                <h3 id="login-title">Log In</h3> <hr id="hr8" />
            </div>
            <div className="login-form">
                <div id="left-box-login">

                    <p className="welcome-title">
                        <span id="orange-letters-login">Welcome to</span>
                        <span id="black-letters-login">Baby's</span>
                    </p>

                    <p className="login-text-box">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus omnis eligendi repellat incidunt commodi similique nam adipisci eum inventore consectetur labore veniam, suscipit asperiores ipsa numquam atque accusantium quibusdam eaque. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>

                </div>

                <div className='right-box-login'>

                    <div className='login-form'>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="user@domain.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder="********"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button className='button' onClick={login}  >LOG IN </Button>
                        </Form>

                    </div>
                </div>

            </div>

        </div>
    )
}