import React, { useEffect, useState } from "react";
import { RecipesCard } from "../RecipesCard";

import { Container } from "react-bootstrap";
import { api } from '../../constants/api'
import '../../css/menu.css'

export const Lunch = () => {
    const [Lunch, setLunch] = useState([]);
    function allRecipesByCategory() {
        fetch(`${api.root}/recipes/category`)
            .then(res => res.json())
            .then(data => {
                setLunch(data.lunch)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        allRecipesByCategory();
    }, []);

    return (


        <div className="container-menu">
         
            <div className="div-meny">
                <h3 id="title-menu"> Lunch </h3> <hr id="hr3" />
            </div>

            <div className="div-recipes-menu">
                <RecipesCard recipes={Lunch} />
            </div>



        </div>
    )
}