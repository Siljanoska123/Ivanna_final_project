import React, { useState, useEffect } from 'react';
import { Card, Modal, Container, Col, Row } from 'react-bootstrap';
import { api } from '../constants/api';
import { useParams } from "react-router-dom";

import '../css/recipesCard.css'
import icon_plate from '../style/icons/icon_plate.svg'
import icon_star from '../style/icons/icon_star.svg'
import icon_time from '../style/icons/icon_time.svg'
import icon_button_card from '../style/icons/icon_button_card.svg'
import x_close from '../style/icons/icon_close.svg';



export const RecipesCard = ({ recipes }) => {
    const [allRecipes, setAllRecipes] = useState(recipes);
    const [modalShow, setModalShow] = useState(false);
    const [popUpRecipe, setPopUpRecipe] = useState([]);
    const { id } = useParams();
    const [photo, setPhoto] = useState()


    const modalPopUp = (id) => {
        setModalShow(true);
        const popUpRecipe = recipes.filter(item => item._id === id)[0];
        setPopUpRecipe(popUpRecipe);
    };

    const view = (id) => {
        fetch(`${api.root}/recipes/stars/${id}`, {
            method: 'PUT',
        })
            .then(data => {
                let newRecipesStars = [...recipes];
                if (data) {
                    newRecipesStars.forEach(el => {
                        if (el._id === id) return el.visits++;
                    });
                    setAllRecipes(newRecipesStars);
                    // console.log(recipes);
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div className='container-recipes-card'>
            {recipes.map(recipe =>


                <Card className="recipe-card" key={recipe._id}>



                    <div className="div-card-image">
                        <div className="div-category">
                            <p className="category-text">{recipe.category}</p>
                        </div>
                        {/* <Card.Img className="cards-image" variant="top"
                            src={`${api.root}/${recipe.image}`} >
                        </Card.Img> */}

                        <Card.Img className="cards-image" variant="top"
                            src={photo ? photo : recipe.image === "https://drmasley.com/wp-content/uploads/2019/09/104579996-buddha-bowl-salads-background.jpeg" ? recipe.image :
                                `${api.root}/${recipe.image}`} alt="" className="cards-image" />

                    </div>


                    <div className="container">
                        <Card.Body>
                            <Card.Title className="card-recipe-title">{recipe.title}</Card.Title>
                            <Card.Text className="card-description">{recipe.description}</Card.Text>

                            <div className="div-icons-down">
                                <span > <img src={icon_time} alt="" /> <span className="prep-min">{recipe.time} min</span> </span>
                                <span id="span1"> <img src={icon_plate} alt="" /> <span className="num-people">{recipe.people} persons</span></span>
                                <span id="span1"> <img src={icon_star} alt="" className="icon-star" /> <span className="num-stars">{recipe.visits} </span> </span>
                            </div>

                            <div className="button-card">
                                <span onClick={() => modalPopUp(recipe._id)}> <img src={icon_button_card} alt="" className="arrows" /> </span>
                            </div>
                        </Card.Body>

                        <div className='modal'> 
                            <Modal show={modalShow} onHide={() => setModalShow(false)}
                                onClick={() => { view(popUpRecipe._id) }} ф
                                size='xl' >

                                <div className="div-popup">
                                    <div className="popup-first-box">
                                        <div >
                                            <h4 className="popup-title">{popUpRecipe.title} </h4>
                                           
                                            <span className="x-close" onClick={() => setModalShow(false)}> <img src={x_close} alt="" /> </span>
                                        </div>
                                        <div className="popup-image">
                                            <img   src={photo ? photo : popUpRecipe.image === "https://drmasley.com/wp-content/uploads/2019/09/104579996-buddha-bowl-salads-background.jpeg" ? popUpRecipe.image :
                            `${api.root}/${popUpRecipe.image}`} alt="" className="popup-image" />
                                        </div>
                                        <div className="popup-served-category">
                                            <div><p className="best-served">Best Served For</p></div>
                                            <div className="popup-div-category">
                                                <p className="popup-text-category">{popUpRecipe.category}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="popup-description">{popUpRecipe.description}</p>
                                        </div>
                                        <div className="div-icons-down">
                                            <span > <img src={icon_time} alt="" /> <span className="prep-min">{popUpRecipe.time} min</span> </span>
                                            <span id="span1"> <img src={icon_plate} alt="" /> <span className="num-people">{popUpRecipe.people} persons</span></span>
                                            <span id="span1"> <img src={icon_star} alt="" className="icon-star" /> <span className="num-stars">{popUpRecipe.visits}</span> </span>
                                        </div>
                                    </div>
                                    <div className="popup-second-box">
                                        <p className="recipe-details">Recipe Details</p>
                                        <p className="text-recipe">{popUpRecipe.text}</p>
                                    </div>
                                </div>

                            </Modal>
                        </div>
                    </div>
                </Card>
            )
            }
        </div >
    )
}