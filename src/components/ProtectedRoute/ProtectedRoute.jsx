/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
//import { AccessCheck } from '../../services/storage';

const ProtectedRoute = ({ children, redirectPath = '/entry' }) => {
    //const isAllowed = AccessCheck();
    let isAllowed = false;

    if (localStorage.getItem('apiTokenInstance') !== '') {
        isAllowed = true;
    }

    if (isAllowed === false) {
        return <Navigate to={redirectPath} replase={true} />;
    }
    return children;
};

export default ProtectedRoute;
