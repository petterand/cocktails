import React, { useEffect, useState } from 'react';
import { sendEvent } from '../common/analytics';
import {
   getCocktails,
   addCocktail,
   deleteCocktail,
   updateCocktail,
} from '../common/api';
import getUrlId from '../common/getUrlId';

const RecipeContext = React.createContext({});

export const useRecipeContext = () => React.useContext(RecipeContext);

const mapCocktails = (cocktails) =>
   cocktails.map((c) => ({
      ...c,
      urlId: getUrlId(c),
   }));

const RecipeContextProvider = (props) => {
   const [recipes, setRecipes] = useState([]);
   const [deepLinkedRecipe, setDeepLinkedRecipe] = useState(null);

   useEffect(() => {
      navigator.serviceWorker.onmessage = (event) => {
         const { data } = JSON.parse(event.data);
         const cocktails = mapCocktails(data);
         setRecipes(cocktails);
      };
   }, []);

   const fetchCocktails = async () => {
      let cocktails = await getCocktails();
      cocktails = mapCocktails(cocktails);
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

   const updateRecipe = async (recipe) => {
      try {
         await updateCocktail(recipe);
         fetchCocktails();
      } catch (e) {
         console.error('Failed to update cocktail', e);
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
         if (urlId === 'fredagscocktail') {
            const recipe = recipes
               .filter((r) => Boolean(r.seenAsFridayCocktail))
               .sort(
                  (a, b) => b.seenAsFridayCocktail - a.seenAsFridayCocktail
               )[0];
            setDeepLinkedRecipe(recipe);
            sendEvent('deeplinked', {
               event_category: 'fredagscocktail',
               event_label: recipe.name,
            });
         } else {
            const recipe = recipes.find((r) => r.urlId === urlId);
            if (recipe) {
               setDeepLinkedRecipe(recipe);
               sendEvent('deeplinked', { event_label: recipe.name });
            } else {
               setDeepLinkedRecipe(null);
            }
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
         value={{
            recipes,
            deepLinkedRecipe,
            addRecipe,
            removeRecipe,
            updateRecipe,
         }}
      >
         {props.children}
      </RecipeContext.Provider>
   );
};

export default RecipeContextProvider;
