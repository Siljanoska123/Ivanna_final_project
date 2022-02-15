import React, { useState } from "react";
import { Nav, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { setUserStorage, getToken, removeUserStorage } from '../helper/StorageFunction'
import { api } from "../constants/api";
import { setLoggedIn } from '../redux/ducks/auth'
import { useDispatch, useSelector } from "react-redux";
import { setJWT } from "../redux/ducks/auth";
import logo from '../style/icons/logoHeader.svg'
import '../css/header.css'



export const NavBar = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const token = getToken()
    const authData = useSelector(state => state.auth);

    function logout() {
        const user = {
            email: email,

        }
        fetch(`${api.root}/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                alert(` ` + result.message)
                dispatch(setLoggedIn(true));
                // setUserStorage(result.token, result.user);
                removeUserStorage()
                dispatch(setJWT(result.token));
              
            }
            )
            .catch(err => alert(err))
    }


    return (
        <div className="container">

            <Nav.Link href="/" className="link-image" >
                <img src={logo} className="logo" />
            </Nav.Link>

            <Nav className="nav" as='ul'>
                <Nav.Item as="li" className="nav-category">
                    <Nav.Link href="/breakfast" className="link-category">breakfast</Nav.Link>
                </Nav.Item>

                <Nav.Item as="li" className="nav-category" >
                    <Nav.Link href="/brunch" className="link-category">Brunch</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" className="nav-category">
                    <Nav.Link href="/lunch" className="link-category">lunch</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" className="nav-category">
                    <Nav.Link href="/dinner" className="link-category">Dinner</Nav.Link>
                </Nav.Item>
            </Nav>

            {token ?
            // {authData.loggedIn && authData.jwt !== '' ?
                <Nav className="second-nav-items">
                    <Nav.Item as="li" className="nav-list-item-other">
                        <Nav.Link
                            href="/myRecipes"
                            className="link-myRecipe">
                            MY RECIPES
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-list-item-other">
                        <Nav.Link
                            href="/myProfile"
                            className="link-myProfile">
                            MY PROFILE
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-list-item-other">
                        <Nav.Link
                            onClick={logout}
                            className="link-logout">LOG OUT</Nav.Link>
                    </Nav.Item>
                </Nav>

                :

                <Nav className="first-nav-items">
                    <Nav.Item as="li">
                        <Nav.Link href="/login"  >
                            <button className="button-login">LOG IN</button>
                        </Nav.Link>
                    </Nav.Item>
                    <p id="or"> or </p>
                    <Nav.Item as="li">
                        <Nav.Link href="/createAcount" >
                            <button className="button-create-account">CREATE ACCOUNT</button>

                        </Nav.Link>
                    </Nav.Item>
                </Nav>


            }




        </div>

    )
}