import React, { useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap'
import { api } from '../constants/api';
import { useNavigate } from 'react-router-dom';
import { getToken, removeUserStorage } from '../helper/StorageFunction'
import { useDispatch } from "react-redux";
import { setJWT } from "../redux/ducks/auth";
import '../css/my-recipes.css'


export function MyRecipes() {

    const [recipes, setRecipes] = useState([]);
    const token = getToken();
    let navigate = useNavigate();
    let dispatch = useDispatch();



    function allRecipes() {
        fetch(`${api.root}/recipes/all/myRecipes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                    removeUserStorage()
                    navigate('/login')
                }
                else { setRecipes(data.recipes) }
            })
            .catch(err => alert(err))
    }

    function deleteResipe(id) {
        fetch(`${api.root}/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => {
                let newRecipes = recipes.filter(el => el._id !== id);
                setRecipes(newRecipes);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editRedirect = (id) => {
        navigate(`/editRecipe/${id}`);
    }

    useEffect(() => {
        allRecipes();

    }, []);

    return (
        <div className='container-myRecipe'>

            <div className="div-myRecipe">
                <h3 id="myRecipe-title">My recipes </h3> <hr id="hr10" />
                <Button className='plus-button' variant="warning" href='/createRecipe' ><i class="bi bi-plus"></i></Button>
            </div>




            <Row>


                <table responsive="sm" className="recipes-table">
                    <thead>
                        <tr className="thead-tr-th">
                            <th className="recipe-name">Recipe Name</th>
                            <th className="category">Category</th>
                            <th className="created-on" colSpan='3'>Created On</th>
                            <th className="delete" style={{ textAlign: "right" }}>Delete</th>
                        </tr>
                    </thead>
                    <br />
                    {recipes.map(recipe => {
                        return (<tbody key={recipe._id}>

                            <tr className="tbody-tr-td">

                                <td className="body-title" onClick={() => editRedirect(recipe._id)}>{recipe.title} </td>
                                <td className="body-category" onClick={() => editRedirect(recipe._id)}>{recipe.category}</td>
                                <td className="body-created-on" onClick={() => editRedirect(recipe._id)} colSpan='3'>{new Date(recipe.createdAt).toLocaleDateString('en-GB')}</td>
                                <td className="body-delete-bin" style={{ textAlign: "right" }} ><Button onClick={() => deleteResipe(recipe._id)} variant='link'><i class="bi bi-trash" ></i></Button></td>
                            </tr>

                        </tbody>

                        )
                    }


                    )}
                </table>


            </Row>

        </div>
    )
}



