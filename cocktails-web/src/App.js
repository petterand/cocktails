import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '@components/Header';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';

import { getCocktails } from './common/api';
import { filterRecipes, buildFilterObject } from './common/filters';
import AutoCompleteTextBox from './components/AutoCompleteTextBox';
import CascadingGrid from './components/CascadingGrid';

const ContentWrapper = styled.div`
   padding: 0 16px;
`;

const GridItem = styled.div`
   border: 1px solid #e0e0e0;
   border-left: 3px solid var(--aero-blue);
   padding: 16px;
   margin-bottom: 16px;
`;

const App = () => {
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

   const addRecipe = (recipe) => setRecipes((state) => [...state, recipe]);

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

export default App;
