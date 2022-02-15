import React from 'react';
import {Navigate } from 'react-router-dom';

import {getToken} from '../helper/StorageFunction'




function PrivateRoute({ children, redirectTo }) {
    let token = getToken();
    return token ? children : <Navigate to={redirectTo} />;
  }
  export default PrivateRoute
 


//   import React from 'react';
// import {Navigate, Route, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';



// const PrivateRoute = ({ children }) => {
//     let location = useLocation();
  
//     const { isAuthenticated, loading } = useSelector(state => state.auth);
  
//     if (loading) {
//       return <p>Checking authenticaton..</p>;
//     }
  
//     if (!isAuthenticated) {
//       return <Navigate to="/login" state={{ from: location }} />;
//     }
  
//     return children;
//   };
  
//   export default PrivateRoute;