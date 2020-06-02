const API_HOST_URI        = 'https://api.routiin.ru/v1';
const AUTH_URI            = 'https://api.routiin.ru/oauth2/authorize';
const AUTH_REDIRECT_PARAM = 'redirect_uri=https://routiin.ru/auth';

export const environment = {
  production: true,
  api: {
    hostURI       :  API_HOST_URI,
    authFbURI     : `${AUTH_URI}/facebook?${AUTH_REDIRECT_PARAM}`,
    authGoogleURI : `${AUTH_URI}/google?${AUTH_REDIRECT_PARAM}`,
    getUserURI    : `${API_HOST_URI}/user/me`,
  },
};
