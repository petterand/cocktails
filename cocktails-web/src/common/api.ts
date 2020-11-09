import axios from 'axios';

const apiUrl = process.env.API_URL;

async function getCocktails() {
   const res = await axios.get(`${apiUrl}/cocktails`);
   return res.data;
}

async function getKey(credentials: string) {
   const res = await axios.get(`${apiUrl}/cocktails/get-key`, {
      headers: {
         Authorization: `Basic ${btoa(credentials)}`,
      },
   });
   return res.data;
}

async function addCocktail(cocktail: Recipe) {
   const credentials = localStorage.getItem('api-credentials');
   const key = localStorage.getItem('api-key');
   if (credentials && key) {
      const headers = {
         'x-api-key': key,
         Authorization: `Basic ${credentials}`,
         'Content-Type': 'application/json',
      };
      console.log(cocktail, headers);
      await axios.post(`${apiUrl}/cocktails`, cocktail, { headers });
   }
}

export { getCocktails, getKey, addCocktail };
