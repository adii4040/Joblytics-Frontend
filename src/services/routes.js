/*-----Auth Routes-----*/

const registerUserRoute = '/api/v1/user/register';
const loginUserRoute = '/api/v1/user/login';
const logoutUserRoute = '/api/v1/user/logout';
const getCurrentUserRoute = '/api/v1/user/current-user';
const verifyEmailRoute = (id, emailVerificationToken) => `/api/v1/user/${id}/verify-email/${emailVerificationToken}`;



/*-----Applications Routes-----*/
const uploadApplicationRoute = '/api/v1/application/upload';
const getApplicationsRoute = '/api/v1/application/get';
const getApplicationByIdRoute = (id) => `/api/v1/application/get/${id}`;
const updateApplicationRoute = (id) => `/api/v1/application/update/${id}`;
const deleteApplicationRoute = (id) => `/api/v1/application/delete/${id}`;
const deleteAllApplicationsRoute = '/api/v1/application//delete-all';


/*-----Analytics Routes-----*/
const getAnalyticsOverviewRoute = (range) => `/api/v1/analytics/overview?range=${range}`;


export {
    registerUserRoute,
    loginUserRoute,
    logoutUserRoute,
    getCurrentUserRoute,
    verifyEmailRoute,
    uploadApplicationRoute,
    getApplicationsRoute,
    getApplicationByIdRoute,
    updateApplicationRoute,
    deleteApplicationRoute,
    deleteAllApplicationsRoute,
    getAnalyticsOverviewRoute
}