import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import AddRecipe from '../AddRecipe';
import RecipeList from '../RecipeList';
import RecipeDetails from '../RecipeDetails';
import { filterRecipes, buildFilterObject } from '../../common/filters';
import { hasKey } from '../../common/auth';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import ConditionalRender from '../ConditionalRender';

const ContentWrapper = styled.div`
   padding: 0 16px;
   margin-top: 16px;
`;

const ResetFiltersWrapper = styled.div`
   display: flex;
   justify-content: center;
   > button {
      border: none;
      background: none;
      text-decoration: underline;
      cursor: pointer;
   }
`;

const Cocktails = () => {
   const { recipes, addRecipe, deepLinkedRecipe } = useRecipeContext();
   const [filters, setFilters] = useState([]);
   const [filterValues, setFilterValues] = useState({});
   const [shouldReset, setShouldReset] = useState(false);

   useEffect(() => {
      setFilterValues(buildFilterObject(recipes));
   }, [recipes]);

   useEffect(() => {
      if (filters.length > 0) {
         setShouldReset(false);
      }
   }, [filters]);

   const onRandomize = () => {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setFilters([recipes[randomIndex].name]);
   };

   const resetFilters = () => setShouldReset(true);

   return (
      <>
         <Header
            onFilter={setFilters}
            filterValues={filterValues}
            onRandomize={onRandomize}
            resetFilters={resetFilters}
            shouldReset={shouldReset}
         />
         <ContentWrapper>
            {hasKey() && <AddRecipe addRecipe={addRecipe} />}
            <RecipeList recipes={recipes.filter(filterRecipes(filters))} />
            <ConditionalRender predicate={filters.length > 0}>
               <ResetFiltersWrapper>
                  <button onClick={resetFilters}>Visa alla</button>
               </ResetFiltersWrapper>
            </ConditionalRender>
         </ContentWrapper>
         <RecipeDetails recipe={deepLinkedRecipe} />
      </>
   );
};

export default Cocktails;
