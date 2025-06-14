const isProduction = !window.location.hostname.includes('localhost');

const productionApiUrl = 'https://todolist-6uvv.onrender.com';
const developmentApiUrl = '';

export const AppConfig = {
  apiUrl: isProduction ? productionApiUrl : developmentApiUrl
};