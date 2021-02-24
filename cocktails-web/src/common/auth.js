import { getKey } from './api';

export const hasKey = () => {
   return Boolean(localStorage.getItem('api-key'));
};

export const getAndSetKey = async (credentials) => {
   const { key } = await getKey(credentials);

   if (key) {
      localStorage.setItem('api-key', key);
      localStorage.setItem('api-credentials', btoa(credentials));
      return true;
   }
   return false;
};
