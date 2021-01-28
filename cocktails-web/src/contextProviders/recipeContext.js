import React, { useEffect, useState } from 'react';
import { getCocktails, addCocktail, deleteCocktail } from '../common/api';

const RecipeContext = React.createContext({});

export const useRecipeContext = () => React.useContext(RecipeContext);

const RecipeContextProvider = (props) => {
   const [recipes, setRecipes] = useState([]);

   const fetchCocktails = async () => {
      const cocktails = await getCocktails();
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

   useEffect(() => {
      fetchCocktails();
   }, []);

   return (
      <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe }}>
         {props.children}
      </RecipeContext.Provider>
   );
};

export default RecipeContextProvider;
