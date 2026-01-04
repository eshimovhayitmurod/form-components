import axios from 'axios';
export const api = ({ method = 'GET', url = '', signal }) => {
   const token = localStorage.getItem('token') || '';
   const language = localStorage.getItem('i18nextLng') || '';
   const api = axios({
      baseURL: 'https://api-dev.cfo.uz',
      method,
      signal,
      url,
      headers: {
         'Accept-Language': language,
         Authorization: `Token ${token}`,
      },
   });
   return api;
};
