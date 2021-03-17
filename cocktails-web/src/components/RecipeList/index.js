import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';

const RecipeListWrapper = styled.div`
   margin: 16px auto 0;
   max-width: 780px;
`;

const RecipeGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(var(--list-columns), 1fr);
   row-gap: 16px;
   column-gap: 16px;
`;

const RecipeCard = lazy(() => import('../RecipeCard'));

const RecipeList = (props) => {
   const sortRecipes = (a, b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (a < b) {
         return -1;
      } else if (a > b) {
         return 1;
      } else {
         return 0;
      }
   };

   const sorted = props.recipes.sort(sortRecipes);

   return (
      <RecipeListWrapper>
         <Suspense fallback={<Loading />}>
            <RecipeGrid>
               {sorted.map((recipe, i) => (
                  <RecipeCard key={recipe.id} recipeIndex={i} recipe={recipe} />
               ))}
            </RecipeGrid>
         </Suspense>
      </RecipeListWrapper>
   );
};

export default RecipeList;
