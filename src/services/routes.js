import { API_BASE_URL } from '../config/apiBase.js'

/*-----Auth Routes-----*/

const registerUserRoute = `${API_BASE_URL}/api/v1/user/register`;
const loginUserRoute = `${API_BASE_URL}/api/v1/user/login`;
const logoutUserRoute = `${API_BASE_URL}/api/v1/user/logout`;
const getCurrentUserRoute = `${API_BASE_URL}/api/v1/user/current-user`;
const verifyEmailRoute = (id, emailVerificationToken) => `${API_BASE_URL}/api/v1/user/${id}/verify-email/${emailVerificationToken}`;


/*-----Applications Routes-----*/
const uploadApplicationRoute = `${API_BASE_URL}/api/v1/application/upload`;
const getApplicationsRoute = `${API_BASE_URL}/api/v1/application/get`;
const getApplicationByIdRoute = (id) => `${API_BASE_URL}/api/v1/application/get/${id}`;
const updateApplicationRoute = (id) => `${API_BASE_URL}/api/v1/application/update/${id}`;
const deleteApplicationRoute = (id) => `${API_BASE_URL}/api/v1/application/delete/${id}`;
const deleteAllApplicationsRoute = `${API_BASE_URL}/api/v1/application//delete-all`;


/*-----Analytics Routes-----*/
const getAnalyticsOverviewRoute = (range) => `${API_BASE_URL}/api/v1/analytics/overview?range=${range}`;

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