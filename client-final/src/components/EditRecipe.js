import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, ButtonGroup, ToggleButton, Image } from 'react-bootstrap'
import { api } from "../constants/api";
import { useNavigate, useParams } from "react-router-dom";
import { getToken, removeUserStorage } from "../helper/StorageFunction";
import back from '../style/icons/icon_back.svg'
import axios from "axios";


export function EditRecipe() {
    const { id } = useParams();
    let navigate = useNavigate();
    const token = getToken();
    const [recipe, setRecipe] = useState({})
    const [image, setImage] = useState(null)
    const [photo, setPhoto] = useState('');



    function getRecipeByID() {
        fetch(`${api.root}/recipes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },

        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                    removeUserStorage()
                    navigate('/login')
                }
                else { setRecipe(data.recipe) }
            })
            .catch(err => alert(err))
    }
    useEffect(() => {
        getRecipeByID();
    }, []);


    function updateRecipe() {

        fetch(`${api.root}/recipes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(recipe)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                navigate('/myRecipes')
            })
            // .then(data => alert(data.message))
            .catch(err => alert(err))
    }

    function updateRecipeImage() {
        let formData = new FormData()
        const imageUpload = document.querySelector('input[type="file"]');
        formData.append('image', imageUpload.files[0]);
        if (imageUpload) {
            axios({
                method: 'put',
                url: `${api.root}/recipes/${id}/image`,
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
    }


    const handleUpdate = (event) => {
        event.preventDefault();
        updateRecipe();
        updateRecipeImage()
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

        <div className="container-create-recipe" >

            <div className="div-create-recipe">
                <h3 id="create-Recipe-title">My recipes </h3> <hr id="hr5" />
                <Button className='back-button' variant="warning" href='/myRecipes'> <img src={back} alt="" className="icon-back" /></Button>
            </div>

            <Row className="new-recipe-form">
                <Form onSubmit={handleUpdate} className="new-recipe-form" key={recipe.id}>
                    <Col xs={4} md={2}>
                        <Col>
                            <h4 className="image-title">Recipe Image</h4>
                        </Col>
                        <Col>

                            <Image src={photo ? photo : recipe.image === "https://drmasley.com/wp-content/uploads/2019/09/104579996-buddha-bowl-salads-background.jpeg" ? recipe.image : `${api.root}/${recipe.image}`} alt="" className="image-info" />

                            {/* {image === null ? <Image src={recipe.image ? `${api.root}/${recipe.image}` : "https://drmasley.com/wp-content/uploads/2019/09/104579996-buddha-bowl-salads-background.jpeg"} alt="" className="image-info" />
                                : <Image src={photo} alt="" className="image-info" />} */}
                            <Button
                                className="image-button"
                                id="toggle-check"
                                variant="secondary"
                                onClick={() => document.getElementById("inputFieldFile").click()}>UPLOAD IMAGE</Button>
                            <Form.Control style={{ display: "none" }} id="inputFieldFile" type="file" accept="image/*" onChange={saveFile} />

                        </Col>
                    </Col>



                    <Col xs={8} md={6} className="other-information">

                        <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="recipe-title-label">Recipe Title</Form.Label>
                                <input
                                    className="recipe-title-input"
                                    type="RecipeTitle"
                                    // placeholder="Recipe Title"
                                    value={recipe.title}
                                    onChange={e => setRecipe({ ...recipe, title: e.target.value })}
                                />
                            </Form.Group>

                            <Row className="second-part">

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label className="category-label">Category</Form.Label>
                                    <Form.Select
                                        className="category-select"
                                        defaultValue="Choose..."
                                        value={recipe.category}
                                        onChange={e => setRecipe({ ...recipe, category: e.target.value })}
                                    >
                                        <option >Select category</option>
                                        <option>Breakfast</option>
                                        <option>Brunch</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity" className="div-select-time">
                                    <Form.Label className="prep-time-label">Preparation Time</Form.Label>
                                    <input
                                        className="prep-time-input"
                                        type="number"
                                        value={recipe.time}
                                        onChange={e => setRecipe({ ...recipe, time: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip" className="div-select-noPeople">
                                    <Form.Label className="no-pepole-label">No. People</Form.Label>
                                    <input
                                        className="no-people-input"
                                        type="number"
                                        value={recipe.people}
                                        onChange={e => setRecipe({ ...recipe, people: e.target.value })} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="third-part" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className="short-description-label">Short Description</Form.Label>
                                <textarea cols={50} rows={4} maxlength="330"
                                    className="short-description-label-input"
                                    value={recipe.description}
                                    onChange={e => setRecipe({ ...recipe, description: e.target.value })} />
                            </Form.Group>
                            <Button className="recipe-save-button" variant="success" type='submit'>SAVE</Button>
                        </div>

                    </Col>
                    <Col xs={6} md={4}>
                        <Form.Group className="recipe-information" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="main-recipe-label">Recipe</Form.Label>
                            <textarea rows='10' cols='50' maxlength="1200"
                                className="main-recipe-label-input"
                                value={recipe.text}
                                onChange={e => setRecipe({ ...recipe, text: e.target.value })} />

                        </Form.Group>
                    </Col>
                </Form>
            </Row>


        </div>
    )
}