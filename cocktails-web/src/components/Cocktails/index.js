import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import AddRecipe from '../AddRecipe';
import RecipeList from '../RecipeList';
import RecipeDetails from '../RecipeDetails';
import { filterRecipes, buildFilterObject } from '../../common/filters';
import { hasKey } from '../../common/auth';
import { useRecipeContext } from '../../contextProviders/recipeContext';

const ContentWrapper = styled.div`
   padding: 0 16px;
   margin-top: 16px;
`;

const Cocktails = () => {
   const { recipes, addRecipe, deepLinkedRecipe } = useRecipeContext();
   const [filters, setFilters] = useState([]);
   const [filterValues, setFilterValues] = useState({});

   useEffect(() => {
      setFilterValues(buildFilterObject(recipes));
   }, [recipes]);

   const onRandomize = () => {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setFilters([recipes[randomIndex].name]);
   };

   return (
      <>
         <Header
            onFilter={setFilters}
            filterValues={filterValues}
            onRandomize={onRandomize}
         />
         <ContentWrapper>
            {hasKey() && <AddRecipe addRecipe={addRecipe} />}
            <RecipeList recipes={recipes.filter(filterRecipes(filters))} />
         </ContentWrapper>
         <RecipeDetails recipe={deepLinkedRecipe} />
      </>
   );
};

export default Cocktails;
