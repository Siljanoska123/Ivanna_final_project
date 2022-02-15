import React, { useEffect, useState } from "react";

import { RecipesCard } from "./RecipesCard";
import { Container } from 'react-bootstrap'
import { api } from '../constants/api'
import '../css/mainPage.css'


export const MainPage = () => {
    const [FreshAndNewRecipes, setFreshNew] = useState([]);
    const [MostPopularRecipes, setMostPopular] = useState([]);

    function homePage() {
        fetch(api.root)
            .then(res => res.json())
            .then(data => {
                setFreshNew(data.FreshAndNewRecipes)
                setMostPopular(data.MostPopularRecipes)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        homePage();
    }, []);


    return (
        <div className='div-main-page'>


            <div className="div-cards">
                <h3 id="topic">Fresh  &amp; New</h3> <hr id="hr" />
            </div>

            <div className="div-recipes-card">
                <RecipesCard recipes={FreshAndNewRecipes} />
            </div>

            <div className="div-cards">
                <h3 id="topic">Most Popular Recipes</h3> <hr id="hr" />
            </div>

            <div className="div-recipes-card">
                <RecipesCard recipes={MostPopularRecipes} />
            </div>

        </div>
    )
}