const isProduction = !window.location.hostname.includes('localhost');


const productionApiUrl = 'https://todolist-6uvv.onrender.com';
const developmentApiUrl = 'http://localhost:3000';

export const AppConfig = {
  apiUrl: isProduction ? productionApiUrl : developmentApiUrl
};