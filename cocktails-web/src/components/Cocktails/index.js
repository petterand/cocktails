import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import AddRecipe from '../AddRecipe';
import RecipeList from '../RecipeList';
import { addCocktail, getCocktails } from '../../common/api';
import { filterRecipes, buildFilterObject } from '../../common/filters';
import { hasKey } from '../../common/auth';

const ContentWrapper = styled.div`
   padding: 0 16px;
`;

const Cocktails = (props) => {
   const [recipes, setRecipes] = useState([]);
   const [filters, setFilters] = useState([]);
   const [filterValues, setFilterValues] = useState({});

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
      <>
         <Header onFilter={setFilters} filterValues={filterValues} />
         <ContentWrapper>
            {hasKey() && <AddRecipe addRecipe={addRecipe} />}
            <RecipeList recipes={recipes.filter(filterRecipes(filters))} />
         </ContentWrapper>
      </>
   );
};

export default Cocktails;
