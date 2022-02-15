import React, { useEffect, useState } from "react";
import { RecipesCard } from "../RecipesCard";

import { Container } from "react-bootstrap";
import { api } from '../../constants/api'
import '../../css/menu.css'

export const Dinner = () => {

    // const [Dinner, setDinner] = useState([]);
    // function allRecipesByCategory() {
    //     fetch(`${api.root}/recipes/category`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setDinner(data.dinner)
    //         })
    //         .catch(err => alert(err));
    // }
    // useEffect(() => {
    //     allRecipesByCategory();
    // }, []);


    const [dinner, setDinner] = useState([]);
    function allRecipesByCategory() {
        fetch(`${api.root}/recipes/category`)
            .then(res => res.json())
            .then(data => {
                setDinner(data.dinner)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        allRecipesByCategory();
    }, []);


    return (
        <div className="container-menu">
      
        <div className="div-meny">
            <h3 id="title-menu"> Dinner </h3> <hr id="hr3" />
        </div>

        <div className="div-recipes-menu">
            <RecipesCard recipes={dinner} />
        </div>



    </div>

)
}