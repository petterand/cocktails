import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import AddRecipe from '../AddRecipe';
import RecipeList from '../RecipeList';
import SignInModalBody from '../SignInModal';

import { addCocktail, getCocktails } from '../../common/api';
import { hasKey } from '../../common/auth';
import { filterRecipes, buildFilterObject } from '../../common/filters';
import { useModalContext } from '../../contextProviders/modalContext';

const ContentWrapper = styled.div`
   padding: 0 16px;
`;

const Cocktails = (props) => {
   const [recipes, setRecipes] = useState([]);
   const [filters, setFilters] = useState([]);
   const [filterValues, setFilterValues] = useState({});
   const { openModal } = useModalContext();

   useEffect(() => {
      if (!hasKey()) {
         //openModal({ body: <SignInModalBody /> });
      }
   }, []);

   useEffect(() => {
      const fetchCocktails = async () => {
         const cocktails = await getCocktails();
         setRecipes(cocktails);
      };
      fetchCocktails();
   }, []);

   useEffect(() => {
      setFilterValues(buildFilterObject(recipes));
   }, [recipes]);

   const addRecipe = (recipe) => {
      addCocktail(recipe);
      setRecipes((state) => [...state, recipe]);
   };
   return (
      <div>
         <Header onFilter={setFilters} filterValues={filterValues} />
         <ContentWrapper>
            <AddRecipe addRecipe={addRecipe} />
            <RecipeList recipes={recipes.filter(filterRecipes(filters))} />
         </ContentWrapper>
      </div>
   );
};

export default Cocktails;
