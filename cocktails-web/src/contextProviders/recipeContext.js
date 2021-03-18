import React, { useEffect, useState } from 'react';
import { sendEvent } from '../common/analytics';
import {
   getCocktails,
   addCocktail,
   deleteCocktail,
   updateCocktail,
} from '../common/api';
import getUrlId from '../common/getUrlId';
import navigate from '../common/navigate';

const RecipeContext = React.createContext({});

export const useRecipeContext = () => React.useContext(RecipeContext);

const mapCocktails = (cocktails) =>
   cocktails.map((c) => ({
      ...c,
      urlId: getUrlId(c),
   }));

function getLatestFridayCocktail(recipes) {
   return recipes
      .filter((r) => Boolean(r.seenAsFridayCocktail))
      .sort((a, b) => b.seenAsFridayCocktail - a.seenAsFridayCocktail)[0];
}

const RecipeContextProvider = (props) => {
   const [recipes, setRecipes] = useState([]);
   const [deepLinkedRecipe, setDeepLinkedRecipe] = useState(null);

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

   const setRecipeFromUrl = () => {
      if (recipes?.length > 0) {
         const paths = location.pathname.split('/').filter(Boolean);
         const urlId = paths[0];
         let recipe = null;
         let event_category = null;

         if (urlId === 'fredagscocktail') {
            recipe = getLatestFridayCocktail(recipes);
            event_category = 'fredagscocktail';
         } else if (urlId) {
            recipe = recipes.find((r) => r.urlId === urlId);
            if (!recipe) {
               navigate('/');
            }
            event_category = 'direct';
         } else {
            window.dispatchEvent(new Event('collapseall'));
         }
         if (recipe) {
            sendEvent('deeplinked', {
               event_category,
               event_label: recipe.name,
            });
         }
         setDeepLinkedRecipe(recipe);
      }
   };

   useEffect(() => {
      fetchCocktails();
   }, []);

   useEffect(() => {
      navigator.serviceWorker.onmessage = (event) => {
         const { data } = JSON.parse(event.data);
         const cocktails = mapCocktails(data);
         setRecipes(cocktails);
      };
   }, []);

   useEffect(() => {
      setRecipeFromUrl();

      function onPopState(e) {
         if (e.state) {
            setDeepLinkedRecipe(e.state);
         } else {
            setRecipeFromUrl();
         }
      }

      window.addEventListener('popstate', onPopState);
      window.addEventListener('recipechanged', setRecipeFromUrl);

      return () => {
         window.removeEventListener('popstate', onPopState);
         window.removeEventListener('recipechanged', setRecipeFromUrl);
      };
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
