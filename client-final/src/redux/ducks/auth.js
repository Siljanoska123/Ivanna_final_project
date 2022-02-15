import { useNavigate } from "react-router-dom";
import {getToken, getUser, removeUserStorage} from '../../helper/StorageFunction'
let initialState = {
    token: getToken(),
    isAuthenticated:null,
    user: getUser()
};

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const SET_JWT = 'SET_JWT';
const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';


export const setLoggedIn = (user) => {
  
    return {
        type: LOGIN_SUCCESS,
        payload: user
    };
};

export const setJWT = () => async(dispatch) => {
    if(getToken){
        const tokenCheck = {jwt: getToken()};
        
        try {
            
            if(tokenCheck.token !== null){
                dispatch({
                    type:SET_JWT,
                    payload:tokenCheck
                
                })
            }
        } catch (err) {
            dispatch({
                type:AUTHENTICATION_FAILED
            })
        }
    }else{
        dispatch({
            type:AUTHENTICATION_FAILED
        })
    }
}

const authReducer = (state = initialState, action) => {
    const { payload} = action
    switch (action.type) {
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated:true,
                token:payload.jwt,
                user:payload.ru,

            }
        case SET_JWT:
                return{
                    ...state,
                    isAuthenticated:true,
                    token:payload.jwt,
                    user:payload.ru,
                }
            case AUTHENTICATION_FAILED:
                removeUserStorage()
                // window.location = '/login'
             
                return{
                    ...state,
                    isAuthenticated:false,
                    token:null
                    }
            default:
                return state;
    }
};

export default authReducer;