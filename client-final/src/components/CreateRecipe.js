import React, { useState } from "react";
import { Form, Row, Col, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { api } from "../constants/api";
import { getToken } from '../helper/StorageFunction'
import '../css/create-recipe.css'
import back from '../style/icons/icon_back.svg'
import slika from '../style/icons/profile.png'
import { removeUserStorage } from '../helper/StorageFunction';


export function CreateRecipe() {
    const token = getToken();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [time, setTime] = useState("");
    const [people, setPeople] = useState("");
    const [description, setDescription] = useState("");
    const [text, setText] = useState("");
    const [photo, setPhoto] = useState('');
    const [image, setImage] = useState(null)
    let navigate = useNavigate();

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
    function createRecipe(e) {

        e.preventDefault();
        const formData = new FormData();
        const imageUpload = document.querySelector('input[type="file"]');
        formData.append("image", imageUpload.files[0]);
        formData.append('title', title);
        formData.append('text', text);
        formData.append('category', category);
        formData.append('time', time);
        formData.append('people', people);
        formData.append('description', description);

        fetch(`${api.root}/recipes/createRecipe`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(res => res.json()
            )
            .then(data => {
                if (data.error ) {
                    alert(data.message)
                    removeUserStorage()
                    navigate('/login')
                    
                  
                } else {
                    navigate('/myRecipes')
                    alert(data.message)
                }
            })
            .catch(err => { if (err) { console.log(err) } })
    }


    return (

        <div className="container-create-recipe">

            <div className="div-create-recipe">
                <h3 id="create-Recipe-title">My recipes </h3> <hr id="hr5" />
                <Button className='back-button' variant="warning" href='/myRecipes'> <img src={back} alt="" className="icon-back" /></Button>
            </div>

            <Row className="new-recipe-form">
                <Form onSubmit={createRecipe} className="new-recipe-form">
                    <Col xs={4} md={2}>
                        <Col>
                            <h4 className="image-title">Recipe Image</h4>
                        </Col>
                        <Col>
                            {/* <Image src="https://www.pinclipart.com/picdir/big/133-1331433_free-user-avatar-icons-happy-flat-design-png.png" roundedCircle
                                    style={{ width: '171px' }, { height: '180px' }}
                                /> */}
                            {image === null ? <img src={image ? `${api.root}/${image}` : "https://drmasley.com/wp-content/uploads/2019/09/104579996-buddha-bowl-salads-background.jpeg"} alt="" className="image-info" />
                                : <img src={photo} alt="" className="image-info" />}
                        </Col>

                        <Col>
                            <ButtonGroup className="image-buttonGroup">
                                <ToggleButton

                                    className="image-button"
                                    id="toggle-check"
                                    type="file"
                                    variant="secondary"
                                    onChange={saveFile}
                                >
                                    UPLOAD IMAGE
                                </ToggleButton>
                            </ButtonGroup>

                        </Col>
                    </Col>


                    {/* <Col>
                            <Form.Label className="category-label">Recipe Image</Form.Label>
                            <Image src={image} alt="" className="image-info" />
                            
                                <Button
                                    className="image-button"
                                    id="toggle-check"
                                    variant="secondary"
                                    onClick={() => document.getElementById("inputFieldFile").click()}
                                >UPLOAD IMAGE</Button>
                            <Form.Control style={{ display: "none" }} id="inputFieldFile" type="file" accept="image/*" onChange={saveFile} />
                        </Col> */}



                    <Col xs={8} md={6} className="other-information">

                        <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="recipe-title-label">Recipe Title</Form.Label>
                                <input
                                    required
                                    className="recipe-title-input"
                                    type="RecipeTitle"
                                    placeholder="Recipe Title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Row className="second-part">

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label className="category-label">Category</Form.Label>
                                    <Form.Select
                                        required
                                        className="category-select"
                                        defaultValue="Choose..."
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
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
                                        required
                                        className="prep-time-input"
                                        type="number"
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip" className="div-select-noPeople">
                                    <Form.Label className="no-pepole-label">No. People</Form.Label>
                                    <input
                                        required
                                        className="no-people-input"
                                        type="number"
                                        value={people}
                                        onChange={e => setPeople(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="third-part" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className="short-description-label">Short Description</Form.Label>
                                <textarea cols={50} rows={4} maxlength="330"
                                    required
                                    className="short-description-label-input"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="recipe-save-button" variant="success" type='submit'>SAVE</Button>
                        </div>

                    </Col>
                    <Col xs={6} md={4}>
                        <Form.Group className="recipe-information" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="main-recipe-label">Recipe</Form.Label>
                            <textarea rows='10' cols='50' maxlength="1200"
                                required
                                className="main-recipe-label-input"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Form>
            </Row>


        </div>
    )
}