import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import Header from '../Header';
import AddRecipe from '../AddRecipe';
import RecipeList from '../RecipeList';
import RecipeDetails from '../RecipeDetails';
import { filterRecipes, buildFilterObject } from '../../common/filters';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import ConditionalRender from '../ConditionalRender';
import { useUserContext } from '../../contextProviders/userContext';
import Button from '../Button';

const ContentWrapper = styled.div`
   padding: 0 16px 16px;
   margin-top: 16px;
`;

const ResetFiltersWrapper = styled.div`
   display: flex;
   justify-content: center;
`;

function formatForFuse(recipes) {
   const mapIngredients = (i) => ({ value: i });
   return recipes.map((r) => ({
      ...r,
      ingredients: r.ingredients.map(mapIngredients),
   }));
}

function revertFuseObject(recipes) {
   const mapIngredients = (i) => i.value;

   return recipes.map((r) => ({
      ...r.item,
      ingredients: r.item?.ingredients?.map(mapIngredients),
   }));
}

const Cocktails = () => {
   const { recipes, deepLinkedRecipe } = useRecipeContext();
   const { isSignedIn } = useUserContext();
   const [filters, setFilters] = useState([]);
   const [filterValues, setFilterValues] = useState({});
   const [shouldReset, setShouldReset] = useState(false);
   const [searchResult, setSearchResult] = useState([]);
   const fuseOptions = {
      keys: ['name', 'ingredients.value'],
      includeMatches: true,
      useExtendedSearch: true,
   };
   const fuse = new Fuse(formatForFuse(recipes), fuseOptions);

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

   const resetFilters = () => {
      setSearchResult([]);
      setShouldReset(true);
   };

   const onSearch = (str) => {
      const result = fuse.search(`'${str}`);

      setSearchResult(revertFuseObject(result));
   };

   const onFilter = (arr) => {
      setSearchResult([]);
      setFilters(arr);
   };

   const getFilteredRecipes = () => {
      if (filters.length > 0) {
         return recipes.filter(filterRecipes(filters));
      } else if (searchResult.length > 0) {
         return searchResult;
      }
      return recipes;
   };

   const filteredRecipes = getFilteredRecipes();

   return (
      <>
         <Header
            onFilter={onFilter}
            onSearch={onSearch}
            filterValues={filterValues}
            onRandomize={onRandomize}
            resetFilters={resetFilters}
            shouldReset={shouldReset}
         />
         <ContentWrapper>
            {isSignedIn && <AddRecipe />}
            <RecipeList recipes={filteredRecipes} />
            <ConditionalRender
               predicate={filteredRecipes.length !== recipes.length}
            >
               <ResetFiltersWrapper>
                  <Button variant="link" onClick={resetFilters}>
                     Visa alla
                  </Button>
               </ResetFiltersWrapper>
            </ConditionalRender>
         </ContentWrapper>
         <RecipeDetails recipe={deepLinkedRecipe} />
      </>
   );
};

export default Cocktails;
