import React from 'react';
import styled from 'styled-components';
import CascadingGrid from '../CascadingGrid';
import RecipeCard from '../RecipeCard';

const RecipeListWrapper = styled.div`
   margin-top: 32px;
`;

const RecipeList = (props) => {
   return (
      <RecipeListWrapper>
         <CascadingGrid>
            {props.recipes.map((recipe, i) => (
               <RecipeCard key={i} recipeIndex={i} recipe={recipe} />
            ))}
         </CascadingGrid>
      </RecipeListWrapper>
   );
};

export default RecipeList;
