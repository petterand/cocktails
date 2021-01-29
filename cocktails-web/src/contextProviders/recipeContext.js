import React, { useEffect, useState } from 'react';
import { getCocktails, addCocktail, deleteCocktail } from '../common/api';
import getUrlId from '../common/getUrlId';

const RecipeContext = React.createContext({});

export const useRecipeContext = () => React.useContext(RecipeContext);

const RecipeContextProvider = (props) => {
   const [recipes, setRecipes] = useState([]);
   const [deepLinkedRecipe, setDeepLinkedRecipe] = useState(null);

   const fetchCocktails = async () => {
      let cocktails = await getCocktails();
      cocktails = cocktails.map((c) => ({
         ...c,
         urlId: getUrlId(c),
      }));
      setRecipes(cocktails);
   };

   const addRecipe = async (recipe) => {
      try {
         await addCocktail(recipe);
         fetchCocktails();
      } catch (e) {
         console.error('Failed to add cocktail', e);
      }
   };

   const removeRecipe = async (id) => {
      try {
         await deleteCocktail(id);
         fetchCocktails();
      } catch (e) {
         console.error('Failed to remove cocktail', e);
      }
   };

   const getRecipeFromUrl = () => {
      const hash = window.location.hash;
      const urlId = hash.split('#')[1];
      if (recipes && urlId) {
         const recipe = recipes.find((r) => r.urlId === urlId);
         if (recipe) {
            setDeepLinkedRecipe(recipe);
         } else {
            setDeepLinkedRecipe(null);
         }
      } else {
         setDeepLinkedRecipe(null);
      }
   };

   useEffect(() => {
      fetchCocktails();
   }, []);

   useEffect(() => {
      getRecipeFromUrl();
      window.addEventListener('hashchange', getRecipeFromUrl);

      return () => window.removeEventListener('hashchange', getRecipeFromUrl);
   }, [recipes]);

   return (
      <RecipeContext.Provider
         value={{ recipes, deepLinkedRecipe, addRecipe, removeRecipe }}
      >
         {props.children}
      </RecipeContext.Provider>
   );
};

export default RecipeContextProvider;
