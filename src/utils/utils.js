export const setSessionData = ({ idInstance, apiTokenInstance }) => {
    sessionStorage.setItem('idInstance', idInstance);
    sessionStorage.setItem('apiTokenInstance', apiTokenInstance);
};

export const getSessionData = () => {
    try {
        const idInstance = sessionStorage.getItem('idInstance');
        const apiTokenInstance = sessionStorage.getItem('apiTokenInstance');
        return { idInstance, apiTokenInstance };
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

export const clearSessionData = () => {
    sessionStorage.removeItem('idInstance');
    sessionStorage.removeItem('apiTokenInstance');
};

export const isAuthorize = () => {
    const idInstance = sessionStorage.getItem('idInstance');
    const apiTokenInstance = sessionStorage.getItem('apiTokenInstance');

    return idInstance && apiTokenInstance;
};
