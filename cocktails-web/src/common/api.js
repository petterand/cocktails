import axios from 'axios';

const apiUrl = process.env.API_URL;

async function getCocktails() {
   const res = await axios.get(`${apiUrl}/cocktails`);
   return res.data;
}

export { getCocktails };
