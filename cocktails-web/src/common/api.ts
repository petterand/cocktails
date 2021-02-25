import axios from 'axios';

const apiUrl = process.env.API_URL;

function getConfig() {
   const credentials = localStorage.getItem('api-credentials');
   const key = localStorage.getItem('api-key');

   const isValid = credentials && key;

   const headers = {
      'x-api-key': key,
      authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
   };

   return { credentials, key, headers, isValid };
}

async function getCocktails() {
   const res = await axios.get(`${apiUrl}/cocktails`);
   return res.data;
}

async function getKey(credentials: string) {
   const res = await axios.get(`${apiUrl}/cocktails/get-key`, {
      headers: {
         athorization: `Basic ${btoa(credentials)}`,
      },
   });
   return res.data;
}

async function addCocktail(cocktail: Recipe) {
   const { isValid, headers } = getConfig();
   if (isValid) {
      await axios.post(`${apiUrl}/cocktails`, cocktail, { headers });
   }
}

async function deleteCocktail(id: String) {
   const { isValid, headers } = getConfig();
   if (isValid) {
      await axios.delete(`${apiUrl}/cocktails/${id}`, { headers });
   }
}

async function updateCocktail(cocktail: Recipe) {
   const { isValid, headers } = getConfig();
   if (isValid) {
      await axios.put(`${apiUrl}/cocktails`, cocktail, { headers });
   }
}

export { getCocktails, getKey, addCocktail, deleteCocktail, updateCocktail };
