/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { isAuthorize } from '../../utils/utils';
//import { AccessCheck } from '../../services/storage';

const ProtectedRoute = ({ children, redirectPath = '/entry' }) => {
    //const isAllowed = AccessCheck();
    let isAllowed = isAuthorize();

    /* if (localStorage.getItem('apiTokenInstance') !== '') {
        isAllowed = true;
    }*/

    if (!isAllowed) {
        return <Navigate to={redirectPath} replase={true} />;
    }
    return children;
};

export default ProtectedRoute;
