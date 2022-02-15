import React, { useState, useEffect } from 'react';
import { api } from './../constants/api'
import { Form, Row, Col, Button, Image, Container, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { getToken } from "../helper/StorageFunction";
import { useNavigate } from "react-router-dom";
import '../css/my-profile.css'
import axios from 'axios';
import { removeUserStorage } from '../helper/StorageFunction';

import AvatarImage from '../style/icons/profile.png';

export function MyProfile() {
    const [user, setUser] = useState({})
    const [photo, setPhoto] = useState('');
    const token = getToken();
    const [image, setImage] = useState(AvatarImage)
    let navigate = useNavigate();

    function myProfile() {
        fetch(`${api.root}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                    removeUserStorage()
                    navigate('/login')
                }
                else { setUser(data.user) }
            })
            .catch(err => alert(err))
    }
    useEffect(() => {
        myProfile();
    }, []);

    function editMyProfile() {

        fetch(`${api.root}/users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.status === 401) {
                    removeUserStorage()
                    navigate('/login')
                }
                return res.json();
            })
            .then(data => alert(data.message))
            .catch(err => alert(err))
    }

    function editImage() {
        let formData = new FormData()
        formData.append('image', image);

        axios({
            method: 'put',
            url: `${api.root}/users/myprofile/image`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleSave = (event) => {
        editMyProfile();
        editImage();

        event.preventDefault();
    }

    const saveFile = (e) => {
        setImage(e.target.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        let res = null;
        reader.onload = () => {
            res = reader.result;
            setPhoto(res);
        }
        reader.onerror = () => {
            res = null;
        }
    };


    return (
        <div className="container-myProfile">
            <div className="div-my-profile">
                <h3 id="myprofile-title"> My Profile </h3> <hr id="hr9" />
            </div>
            <Container key={user._id} >
                <div >
                    <Form onSubmit={handleSave} className="form-wrapper">
                        <div className="first-box-image">
                        <Image src={photo ? photo : user.image === AvatarImage ? user.image : `${api.root}/${user.image}`} alt="" className="photo" />


                            {/* {image ==  null ? <img src={user.image ? `${api.root}/${user.image}` : slika} alt="" className="photo" />
                                : <img src={photo} alt="" className="photo" />} */}
                                
                            <ButtonGroup className="button-group">
                                <ToggleButton
                                    className='button-image'
                                    id='toggle-check'
                                    type='file'
                                    variant='secondary'
                                    accept="image/*"
                                    onChange={saveFile} >
                                    CHANGE AVATAR
                                </ToggleButton>

                            </ButtonGroup>


                        </div>
                        <Col className="the-column">
                            <div className="form-boxes">
                                <div >
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label >First Name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={user.first_name}
                                                onChange={(e) => setUser({ ...user, first_name: e.target.value })}


                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"

                                                value={user.last_name}
                                                onChange={(e) => setUser({ ...user, last_name: e.target.value })}

                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                required
                                                value={user.email} type="email"
                                                onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Birthday</Form.Label>
                                            <Form.Control
                                                required
                                                type='date'
                                                name='birthday'
                                                value={user.birthday}
                                                onChange={(e) => setUser({ ...user, birthday: e.target.value })} />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                required
                                                type="password"

                                                value={user.password}
                                                onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Repeat password</Form.Label>
                                            <Form.Control
                                                required
                                                type="password"

                                                value={user.confirmPassword}
                                                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                    <Button className='button' type="submit" variant="success">SAVE</Button>
                                </div>
                            </div>
                        </Col>
                    </Form>
                </div>
            </Container>
        </div >
    )
}


