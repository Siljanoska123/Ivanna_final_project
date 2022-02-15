import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainPage } from "./MainPage";
import { Footer } from "./Footer";
import { Login } from "./Login";
import { CreateAcount } from "./CreateAcount";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Breakfast } from "./manu/Breakfast";
import { Brunch } from "./manu/Brunch";
import { Lunch } from "./manu/Lunch";
import { Dinner } from "./manu/Dinner";
import { MyProfile } from './MyProfile';
import { MyRecipes } from './MyRecipes'
import { CreateRecipe } from './CreateRecipe'
import { EditRecipe } from "./EditRecipe";

import '../css/form.css'
import '../css/app.css'
import { NavBar } from "./NavBar";
import PrivateRoute from "../helper/PrivateRoute";



export function App() {



  return (
    <div id='app-container'>
      <div className="upper-page">
        <div className="div-navbar">
          <NavBar />
        </div>
        <div className="div-routes">
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path='/createAcount' element={<CreateAcount />} />
            <Route path='/breakfast' element={<Breakfast />} />
            <Route path='/brunch' element={<Brunch />} />
            <Route path='/lunch' element={<Lunch />} />
            <Route path='/dinner' element={<Dinner />} />
          

            <Route path='/myProfile'
              element={<PrivateRoute redirectTo='/login'> <MyProfile /></PrivateRoute>} />


            <Route path='/myRecipes'
              element={<PrivateRoute redirectTo='/login' ><MyRecipes /></PrivateRoute>} />

            <Route path='/createRecipe'
              element={<PrivateRoute redirectTo='/login'><CreateRecipe /></PrivateRoute>} />

            <Route path='/editRecipe/:id'
              element={<PrivateRoute redirectTo='/login'><EditRecipe /></PrivateRoute>} />

          </Routes>
        </div>
      </div>
      <div className="div-footer">
        <Footer />
      </div>

    </div>
  )
}